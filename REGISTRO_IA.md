# Registro de uso de IA

Este archivo documenta qué partes del proyecto generó la IA (asistente de código) y qué revisé, corregí o decidí yo.
Los commits de la IA llevan el prefijo `IA: ` y los míos el prefijo `Yo: `.

| # | Pieza | Qué hizo la IA | Qué corregí o decidí yo |
|---|-------|----------------|-------------------------|
| 1 | Estructura base | Inicializó git en la rama `main`, creó las carpetas `assets/`, `css/` y `js/`, movió `logo.png` a `assets/` y creó este registro y un README inicial. | |
| 2 | HTML (`index.html`) | Escribió la estructura semántica: encabezado con conmutador de modo y botón "Aula virtual", hero, tres tarjetas de cursos, "Cómo funciona", contenedor vacío para el formulario de HubSpot con su comentario y marcador, panel de administración con la nota de seguridad, pie con el aviso de demostración y botón flotante de WhatsApp. Todos los enlaces externos llevan `target="_blank"` y `rel="noopener noreferrer"`. Las descripciones de los cursos las redactó la IA. | |
| 3 | Estilos (`css/style.css`) | Definió la paleta como variables CSS y escribió los estilos mobile first (1 columna en celular, 2 en tablet, 3 en escritorio), foco visible y respeto a "reducir movimiento". Decidió usar los colores de acento solo como franjas porque el naranja con texto blanco no alcanza el contraste mínimo de 4.5:1. | |
| 4 | JavaScript (`js/script.js`) | Programó el conmutador cliente/admin (guarda el modo en `localStorage` dentro de `try/catch`, sin contraseñas), el aviso del curso elegido, el mensaje de WhatsApp por curso con `encodeURIComponent` y un intento de rellenar el campo `curso_de_interes` del formulario de HubSpot (solo funciona si el formulario no va dentro de un iframe). | |
