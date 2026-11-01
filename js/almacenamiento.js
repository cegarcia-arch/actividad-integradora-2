const CLAVE_TAREAS = 'actividad2_leo_tareas';

export function recuperarTareas() {
  const textoGuardado = localStorage.getItem(CLAVE_TAREAS);
  // null significa que nunca se guardó una lista; [] es una lista vacía válida.
  if (textoGuardado === null) return null;
  const tareas = JSON.parse(textoGuardado);
  if (!Array.isArray(tareas)) throw new Error('La lista guardada no tiene un formato válido.');
  const identificadores = new Set();
  for (const tarea of tareas) {
    if (!tarea || typeof tarea.id !== 'string' || identificadores.has(tarea.id)
      || typeof tarea.titulo !== 'string' || !tarea.titulo.trim()
      || typeof tarea.completada !== 'boolean'
      || !['alta', 'media', 'baja'].includes(tarea.prioridad)
      || typeof tarea.fechaCreacion !== 'string' || !Number.isFinite(Date.parse(tarea.fechaCreacion))
      || !['local', 'api'].includes(tarea.origen)) {
      throw new Error('Hay una tarea dañada o repetida en la lista guardada.');
    }
    identificadores.add(tarea.id);
  }
  return tareas;
}

export function guardarTareas(tareas) {
  localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
}
