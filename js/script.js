/* =========================================================
   Quipu Skills - Lógica de la página
   1. Conmutador de modo cliente / administrador (recordado con localStorage)
   2. Curso elegido desde las tarjetas -> formulario y WhatsApp
   Importante: aquí NO hay contraseñas ni llaves. El acceso a HubSpot,
   Moodle y Zoom lo controla cada herramienta con su propio login.
   ========================================================= */

'use strict';

// ---------- Configuración ----------
const CLAVE_MODO = 'quipu-modo';             // nombre con el que se guarda el modo en localStorage
const NUMERO_WHATSAPP = '593962759717';      // número en formato internacional, sin "+"
const MENSAJE_GENERAL = 'Hola, quiero información de un curso';

// Nombre interno del campo de HubSpot donde se guardaría el curso (ver README)
const CAMPO_HUBSPOT_CURSO = 'curso_de_interes';

// ---------- Referencias a elementos del HTML ----------
const conmutador = document.getElementById('conmutador-modo');
const vistaCliente = document.getElementById('vista-cliente');
const vistaAdmin = document.getElementById('vista-admin');
const elementosSoloCliente = document.querySelectorAll('[data-vista="cliente"]');

const avisoCurso = document.getElementById('curso-elegido');
const nombreCurso = document.getElementById('curso-elegido-nombre');
const enlacesWhatsapp = [
  document.getElementById('enlace-whatsapp'),
  document.getElementById('enlace-whatsapp-texto')
];
const contenedorHubspot = document.getElementById('formulario-hubspot');

/* =========================================================
   1. MODO CLIENTE / ADMINISTRADOR
   ========================================================= */

// localStorage puede fallar (modo privado, cookies bloqueadas),
// por eso cada acceso va dentro de try/catch: si falla, la página sigue funcionando.
function leerModoGuardado() {
  try {
    return localStorage.getItem(CLAVE_MODO);
  } catch (error) {
    return null;
  }
}

function guardarModo(modo) {
  try {
    localStorage.setItem(CLAVE_MODO, modo);
  } catch (error) {
    // Sin almacenamiento: el modo simplemente no se recordará.
  }
}

// Muestra la vista correspondiente al modo ('cliente' o 'admin')
function aplicarModo(modo) {
  const esAdmin = modo === 'admin';

  vistaCliente.hidden = esAdmin;
  vistaAdmin.hidden = !esAdmin;

  // Navegación, botón "Aula virtual" y WhatsApp solo tienen sentido para clientes
  elementosSoloCliente.forEach(function (elemento) {
    elemento.hidden = esAdmin;
  });

  // aria-checked informa el estado a lectores de pantalla y lo usa el CSS para el dibujo del switch
  conmutador.setAttribute('aria-checked', String(esAdmin));
}

conmutador.addEventListener('click', function () {
  const nuevoModo = conmutador.getAttribute('aria-checked') === 'true' ? 'cliente' : 'admin';
  aplicarModo(nuevoModo);
  guardarModo(nuevoModo);
  window.scrollTo(0, 0); // al cambiar de vista, empezar desde arriba
});

// Al cargar: usar el modo guardado o, si no hay, el modo cliente por defecto
aplicarModo(leerModoGuardado() === 'admin' ? 'admin' : 'cliente');

/* =========================================================
   2. CURSO ELEGIDO DESDE LAS TARJETAS
   ========================================================= */

// Arma el enlace de WhatsApp. encodeURIComponent convierte espacios,
// tildes y comas en un formato válido para una URL (ej. "ó" -> "%C3%B3").
function crearEnlaceWhatsapp(mensaje) {
  return 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(mensaje);
}

function actualizarWhatsapp(curso) {
  const mensaje = curso
    ? 'Hola, quiero información del curso ' + curso
    : MENSAJE_GENERAL;

  enlacesWhatsapp.forEach(function (enlace) {
    if (enlace) {
      enlace.href = crearEnlaceWhatsapp(mensaje);
    }
  });
}

// Intenta rellenar el campo del curso dentro del formulario de HubSpot.
// Solo funciona si HubSpot dibuja el formulario directamente en la página
// y existe un campo con el nombre interno CAMPO_HUBSPOT_CURSO.
// Si HubSpot lo carga dentro de un iframe, el navegador no permite tocarlo
// (seguridad entre dominios); en ese caso la persona elige el curso a mano.
function preseleccionarEnHubspot(curso) {
  const campo = contenedorHubspot.querySelector('[name="' + CAMPO_HUBSPOT_CURSO + '"]');
  if (!campo) {
    return;
  }
  campo.value = curso;
  // Avisamos al formulario del cambio, como si la persona lo hubiera escrito
  campo.dispatchEvent(new Event('input', { bubbles: true }));
  campo.dispatchEvent(new Event('change', { bubbles: true }));
}

function elegirCurso(curso) {
  nombreCurso.textContent = curso;
  avisoCurso.hidden = false;
  actualizarWhatsapp(curso);
  preseleccionarEnHubspot(curso);
}

// Cada botón "Quiero información" de las tarjetas trae el curso en data-curso.
// No se cancela el clic: el enlace #contacto sigue llevando al formulario.
document.querySelectorAll('.js-elegir-curso').forEach(function (boton) {
  boton.addEventListener('click', function () {
    elegirCurso(boton.dataset.curso);
  });
});
