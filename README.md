# Mis tareas

Gestor de tareas de la Actividad Integradora 2 de Programación de Sistemas Web. Permite organizar tareas y conservar los cambios en el navegador. Está construido con HTML, CSS y JavaScript Vanilla, sin librerías ni compilación.

## Ejecutar

Desde esta carpeta, ejecutar `python3 -m http.server 8000` y abrir `http://localhost:8000/`.
Los módulos ES6 requieren un servidor HTTP; no abrir el HTML con doble clic. Para publicar se necesita HTTPS (por ejemplo, GitHub Pages). No se ha publicado todavía.

## Funciones

- Crear, editar, eliminar y completar tareas. Eliminar actúa directamente.
- Validar títulos vacíos y espacios, tanto al crear como al editar.
- Buscar por título sin distinguir mayúsculas; combinar búsqueda y filtro de estado.
- Ordenar por fecha más reciente o prioridad alta, media y baja. En empates de prioridad se usa la fecha.
- Mostrar total, pendientes y completadas de toda la lista, independientemente del filtro visible.
- Importar JSONPlaceholder una sola vez, si no existe una lista guardada.
- Guardar cada cambio, incluyendo completar tareas, en localStorage.

## Organización y opción A

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Estructura del formulario, contadores y lista. |
| `css/estilos.css` | Apariencia de escritorio. |
| `js/principal.js` | Coordinar los eventos, el estado y los otros módulos. |
| `js/interfaz.js` | Mostrar tareas, validar el título, filtrar, ordenar y actualizar contadores. |
| `js/api.js` | Consultar la API con fetch y async/await y transformar la respuesta. |
| `js/almacenamiento.js` | Leer y guardar la lista con JSON.parse y JSON.stringify. |
| `sw.js` | Guardar los archivos de la página para poder abrirla sin conexión. |

`export` permite compartir funciones e `import` permite usarlas desde otro archivo. Por ejemplo, `principal.js` importa `consultarTareas` desde `api.js`. El HTML carga el archivo principal con `type="module"`.

## Datos de la API

La fuente es https://jsonplaceholder.typicode.com/todos. En la consulta real del 1 de noviembre de 2026 devolvió 200 tareas: 110 pendientes y 90 completadas. Los títulos son ejemplos ficticios proporcionados por la API; no son tareas personales del estudiante.

La API aporta `userId`, `id`, `title` y `completed`. Se utilizan el identificador, el título y el estado. No se crea una función de usuarios. La aplicación asigna **prioridad media** inicialmente y guarda como `fechaCreacion` la fecha de incorporación a esta lista. En la interfaz esa fecha aparece como **Importada** para distinguirla de una fecha original, que la API no proporciona. Las tareas locales muestran **Creada**. Editar conserva la fecha.

Los identificadores importados empiezan por `api-` y los locales por `local-`. Se descartan identificadores repetidos de la API, pero se permiten títulos iguales en tareas distintas.

## Guardado y errores

La clave es `actividad2_leo_tareas`. Si `getItem` devuelve `null`, se intenta la importación. Si contiene `[]`, se conserva la lista vacía sin importar ejemplos. Un error de lectura no borra ni reemplaza los datos existentes. Un error de escritura muestra un aviso y no anuncia un guardado exitoso.

Se verifica `respuesta.ok`, porque fetch puede devolver una respuesta HTTP 500 sin lanzar una excepción. Los fallos de red, de servidor y del formato recibido llegan al `try/catch` que muestra un mensaje. Si falla la importación, se pueden crear tareas locales; al guardarlas, esa lista será la que se recupere después.

## Condiciones del modo sin internet

1. Visitar la aplicación con conexión y esperar a que el service worker guarde todos los archivos. El registro exige HTTPS o localhost.
2. Conservar los datos del sitio y volver a la misma dirección con el mismo navegador y perfil. Cambiar puerto o dominio cambia el almacenamiento.
3. Una primera visita sin conexión no puede descargar el sitio ni consultar la API.
4. localStorage guarda las tareas; la caché del service worker guarda HTML, CSS y JavaScript. Son funciones diferentes.
5. No se requiere conexión para modificar una lista guardada. Borrar los datos del navegador elimina esa persistencia. En modo privado puede perderse al cerrar la sesión.

Al cambiar los archivos del sitio se debe aumentar la versión de caché en `sw.js`. Después de activarse la nueva versión, una recarga permite usar los archivos actualizados.

## Fuentes consultadas

- [JSONPlaceholder: tareas](https://jsonplaceholder.typicode.com/todos).
- [MDN: módulos JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- [MDN: uso de fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- [MDN: uso de Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

