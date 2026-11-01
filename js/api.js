const URL_TAREAS = 'https://jsonplaceholder.typicode.com/todos';

export async function consultarTareas() {
  const respuesta = await fetch(URL_TAREAS);
  // fetch no lanza un error automáticamente ante respuestas como 404 o 500.
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió con el código ${respuesta.status}.`);
  }
  const datos = await respuesta.json();
  if (!Array.isArray(datos)) throw new Error('La API no devolvió una lista de tareas.');

  const identificadores = new Set();
  const fechaImportacion = new Date().toISOString();
  const tareas = [];
  for (const dato of datos) {
    if (!Number.isInteger(dato.id) || typeof dato.title !== 'string'
      || !dato.title.trim() || typeof dato.completed !== 'boolean') {
      throw new Error('La API devolvió una tarea con datos incompletos.');
    }
    if (identificadores.has(dato.id)) continue;
    identificadores.add(dato.id);
    tareas.push({
      id: `api-${dato.id}`,
      titulo: dato.title,
      completada: dato.completed,
      prioridad: 'media',
      // La API no proporciona fecha ni prioridad. Esta fecha es de incorporación.
      fechaCreacion: fechaImportacion,
      origen: 'api'
    });
  }
  return tareas;
}
