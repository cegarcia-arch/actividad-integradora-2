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

## Pendiente

- Captura real de Application > Local Storage mostrando `actividad2_leo_tareas` y el JSON.
- Comprobación de recarga y edición con internet completamente desconectado, tras la primera carga y la instalación de la caché.
- Revisión personal de Leo.
- Autorización y publicación del repositorio y del sitio; comprobación en las direcciones definitivas.
- Sustituir los pendientes del informe por enlaces y evidencias verificados.
