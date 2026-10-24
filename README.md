# Quipu Skills

Landing page de demostración de **Quipu Skills**, una empresa ficticia de educación continua.
Se hizo para una prueba técnica de selección, donde se evalúa el flujo del cliente y la página.

> Proyecto de demostración. Empresa y cursos ficticios.

## Qué incluye

- **Modo cliente** (por defecto): hero, tres cursos, sección "Cómo funciona", formulario de contacto de HubSpot, botón flotante de WhatsApp y botón "Aula virtual" (Moodle).
- **Modo administrador** (conmutador en la esquina superior): accesos directos a HubSpot, a la administración de Moodle y a Zoom. No tiene login propio: **cada herramienta pide su propio usuario y contraseña**, y esta página no guarda credenciales.
- El modo elegido se recuerda en el navegador con `localStorage`.

## Flujo del cliente

1. La persona ve los cursos y pulsa **"Quiero información"** en uno de ellos.
2. La página baja al formulario y muestra el curso elegido. El mensaje de WhatsApp también cambia a ese curso.
3. Al enviar el formulario, el contacto llega a **HubSpot** (Contactos → embudo de deals).
4. Después de la matrícula, la persona recibe sus clases en **Moodle** (aula virtual) y **Zoom** (clases en vivo).

## Tecnología

HTML, CSS y JavaScript puro. Sin frameworks, sin dependencias y sin paso de compilación. Se publica en GitHub Pages.

```
index.html        Estructura de la página (modo cliente y modo admin)
css/style.css     Estilos mobile first con la paleta de marca en variables
js/script.js      Conmutador de modo y curso elegido -> formulario / WhatsApp
assets/logo.png   Logo de la marca
REGISTRO_IA.md    Qué hizo la IA y qué decidí yo
```

## Ver en local

Abre la carpeta en VS Code, instala la extensión **Live Server**, haz clic derecho en `index.html` y elige **"Open with Live Server"**.
También funciona abriendo `index.html` con doble clic.

## Formulario de HubSpot

En `index.html`, dentro de `<div id="formulario-hubspot">`, está el comentario
`<!-- AQUÍ VA EL CÓDIGO DE INSERCIÓN DEL FORMULARIO DE HUBSPOT -->`.
Pega ahí el código de inserción del formulario y borra el párrafo de marcador.

**Curso preseleccionado (opcional):** si el formulario tiene un campo con el nombre interno `curso_de_interes`, `script.js` intenta rellenarlo con el curso elegido. Esto solo funciona si HubSpot dibuja el formulario directamente en la página. Si el formulario se carga dentro de un iframe, el navegador no deja que la página lo modifique y la persona elige el curso a mano. En los dos casos, el curso elegido se ve junto al formulario y va en el mensaje de WhatsApp.

## Seguridad

- No hay llaves de API, contraseñas ni secretos en el código.
- El modo administrador solo muestra enlaces. El control de acceso lo hace cada herramienta.
- Los enlaces externos usan `target="_blank"` y `rel="noopener noreferrer"`.
