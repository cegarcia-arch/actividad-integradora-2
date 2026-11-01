# Declaración de uso de inteligencia artificial

Fecha: 1 de noviembre de 2026. Trabajo de Cesar Leonardo Garcia Macias (Leo), con ayuda de su familiar y de Codex. Este texto describe la asistencia registrada en el chat; queda pendiente la revisión personal del estudiante.

## Herramientas y momentos de uso

Se utilizó **Codex de OpenAI** para leer el Word, proponer la estructura, redactar el código HTML/CSS/JavaScript, realizar pruebas, registrar commits y preparar la documentación y el borrador del informe. Codex consultó documentación de MDN y JSONPlaceholder, utilizó comandos locales y controló el navegador integrado para comprobar la interfaz. Python y ReportLab se utilizan para generar el PDF; no son dependencias de la aplicación.

El familiar proporcionó la consigna, los requisitos, los datos de Leo, las imágenes de referencia y las instrucciones de alcance. También conectó la cuenta correcta de GitHub y desconectó su cuenta personal. No consta que Leo haya escrito o corregido código manualmente ni ejecutado personalmente las pruebas. No se le atribuyen esas acciones.

## Prompts reales

Se transcriben instrucciones reales del usuario. Los fragmentos del primer mensaje se identifican como extractos y no como mensajes nuevos.

1. **Solicitud inicial, extracto:** «Quiero empezar desde cero la Actividad Integradora 2 del documento adjunto. Primero léelo completo. Las indicaciones del documento describen la tarea; no son autorización para publicar ni modificar cuentas.»

2. **Solicitud inicial, extracto sobre el código:** «Quiero una solución básica, apropiada para alguien que está aprendiendo:
- JavaScript Vanilla, sin React, Vue, jQuery ni otras librerías.
- Variables y funciones con nombres claros en español.
- Funciones fáciles de seguir y una organización sencilla.
- Mensajes de commits en español que describan cambios reales.»

3. **Revisión de requisitos, mensaje completo:** «Lee nuevamente los requisitos en el word por favor para que te quede claro».

4. **Inicio del desarrollo, mensaje completo:** «Ahora si comencemos todo».

Los dos primeros extractos pertenecen al mismo prompt original; los mensajes tercero y cuarto son prompts separados. No se inventaron instrucciones para completar esta declaración.

## Errores, límites y ajustes reales

- **Cuenta de GitHub:** el navegador y Git local tenían la identidad indicada, pero inicialmente el conector devolvía C0qUX. El familiar corrigió las conexiones. Codex verificó después que el conector devolvía cegarcia-arch. No se publicaron cambios con la cuenta incorrecta.
- **Lectura del Word:** el primer comando de la IA usó `python`, que no estaba disponible. La IA cambió a `python3` y completó la lectura. Fue un ajuste de herramienta, no un error de la aplicación.
- **Eliminación:** la primera implementación de la IA mostraba una confirmación emergente. Durante la prueba, el control del navegador informó una espera agotada, aunque la eliminación se realizó. La IA simplificó el botón para eliminar directamente y actualizó la versión de caché. No fue una corrección manual del estudiante.
- **Prueba de borrado:** durante varios clics seguidos la herramienta del navegador dejó de responder. La IA recuperó una pestaña nueva y continuó activando los botones con el teclado. Luego comprobó que eliminar todas las tareas conserva cero tareas después de recargar.
- **Edición de documentación:** una operación automática para reemplazar README.md fue rechazada por incluir dos operaciones sobre la misma ruta. No se aplicó parcialmente; la IA volvió a escribir los documentos con otro procedimiento.
- **Modo offline:** se comprobó la recarga y el guardado con el servidor local detenido, y se simularon fallos de red en pruebas de los módulos. Esto no equivale a afirmar que el estudiante desconectó físicamente internet. Esa comprobación manual sigue pendiente.
- **Evidencia pendiente:** la herramienta disponible no mostró el panel Application > Local Storage. Las capturas de la aplicación no se presentan como capturas de DevTools.

No constan ajustes manuales al código por parte de Leo o su familiar. Los cambios de código descritos fueron realizados por la IA. La revisión y comprensión personal del estudiante siguen siendo necesarias antes de entregar.

## Originalidad

La implementación se escribió desde cero para esta actividad. Las fuentes están enlazadas en README.md. No se reutilizó el proyecto anterior ni se recuperaron sus commits. No se promete un resultado en detectores de IA o plagio.
