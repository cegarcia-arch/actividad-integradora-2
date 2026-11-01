# Registro de verificación

Fecha: 1 de noviembre de 2026. Pruebas realizadas por Codex durante el desarrollo local, no atribuidas a Leo.

## Comprobado en el navegador integrado

| Caso | Resultado observado |
| --- | --- |
| Carga inicial real | 200 tareas, 110 pendientes y 90 completadas. |
| Crear con espacios | Se muestra el error; no se agrega la tarea. |
| Crear con título y prioridad | El total pasa a 201 y las pendientes a 111. |
| Editar con espacios | Se rechaza el cambio. |
| Editar título y prioridad | Se guarda el nuevo título y la prioridad baja. |
| Completar y recargar | Se conservan 201 tareas, 110 pendientes y 91 completadas. |
| Buscar con mayúsculas y filtrar | La tarea completada no aparece en pendientes y sí en completadas. |
| Eliminar y recargar | El total vuelve a 200; la tarea eliminada no reaparece. |
| Eliminar todas y recargar | Total, pendientes y completadas permanecen en cero. No se importan ejemplos. |
| Tres prioridades | Las tres tareas de prueba se muestran en orden alta, media y baja. |
| Fecha más reciente | Después de recargar, las tres tareas aparecen en orden inverso a su creación. |
| Servidor local detenido | La página recarga; una nueva tarea se conserva tras recargar y puede eliminarse. |

El borrado de todas las tareas se hizo únicamente sobre los ejemplos de esta aplicación nueva. Después se crearon tres tareas de demostración mediante el formulario; sus títulos no afirman actividades realizadas personalmente por Leo.

## Prueba manual en Firefox realizada por el familiar

El 1 de noviembre de 2026, el familiar compartió capturas reales de Firefox con la opción **Offline** activada. La primera muestra «Prueba sin conexión», 201 tareas en total (111 pendientes y 90 completadas) y el aviso «Tareas recuperadas del almacenamiento local». La segunda, después de editar y completar la tarea, muestra «Prueba sin conexión - completada», la casilla marcada, 110 pendientes, 91 completadas y el mismo aviso de recuperación. Son evidencias de recarga y persistencia durante la simulación sin red en DevTools. Se conservan como `prueba-offline-firefox.png` y `prueba-offline-editada-firefox.png`. Esta prueba no se atribuye a Leo ni demuestra una desconexión física del equipo.

## Pruebas de integración con dependencias simuladas

Se ejecutaron los módulos reales con Node.js, sustituyendo red, almacenamiento y elementos DOM por objetos de prueba. Los 16 escenarios pasaron:

1. Importación y contadores.
2. Lista vacía sin reimportación.
3. Títulos vacíos y espacios al crear.
4. Recorte de espacios y guardado.
5. Validación al editar y conservación de fecha.
6. Completar y recuperar contadores.
7. Eliminar todas y recuperar la lista vacía.
8. Combinar búsqueda y estado.
9. Orden por prioridad y fecha sin alterar el arreglo original.
10. Identificadores duplicados de API.
11. Error de red con mensaje y posibilidad de crear tareas.
12. HTTP 503 con aviso.
13. Respuesta de API inválida.
14. Datos locales dañados sin sobrescritura.
15. Error de escritura sin falso mensaje de éxito.
16. Lista guardada y creación con conexión simulada como ausente.

El script auxiliar se conserva fuera de la aplicación, en la carpeta de trabajo del chat. No añade librerías a la aplicación. Estos resultados no se presentan como pruebas manuales en DevTools.

## Capturas reales disponibles

- `lista-vacia-tras-recargar.jpg`: aplicación con cero tareas después del borrado y la recarga.
- `aplicacion.jpg`: lista de demostración ordenada por prioridad.
- `recarga-sin-servidor.jpg`: vista completa después de recargar y guardar con el servidor local detenido.
- `prueba-offline-firefox.png`: tarea recuperada en Firefox con la opción Offline visible.
- `prueba-offline-editada-firefox.png`: tarea editada y completada, recuperada con Offline visible.
- `almacenamiento-local-firefox.png`: panel de almacenamiento local de Firefox con el JSON; el panel «Valor interpretado» muestra `actividad2_leo_tareas: Array`.
- `almacenamiento-local-tarea-completada-firefox.png`: el panel «Valor interpretado» muestra el objeto de la tarea de prueba con título editado, prioridad alta y `completada: true`, junto a la tarea en la página.

## Publicación comprobada

El repositorio público [cegarcia-arch/actividad-integradora-2](https://github.com/cegarcia-arch/actividad-integradora-2) contiene nueve commits en `main`. GitHub Pages informó una construcción correcta desde la raíz de esa rama. La dirección [de la aplicación](https://cegarcia-arch.github.io/actividad-integradora-2/) y los archivos HTML, CSS, JavaScript y `sw.js` respondieron con HTTP 200. La herramienta disponible no permitió hacer una prueba interactiva en el navegador sobre esa dirección pública.

## Pendiente

- El Word nombra literalmente «Application > Local Storage». Firefox usa el panel equivalente «Almacenamiento > Almacenamiento local». Si se exige esa interfaz exacta, falta una captura adicional en Chrome o Edge.
- Revisión personal de Leo.
- Comprobar manualmente las funciones en la dirección pública con el navegador de Leo.
