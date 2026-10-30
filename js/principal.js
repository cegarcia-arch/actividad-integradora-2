import {
  mostrarMensaje, validarTitulo, mostrarErrorTitulo, limpiarErrorTitulo,
  prepararFormulario, mostrarTareas
} from './interfaz.js';

let tareas = [];
let idEnEdicion = null;

function actualizarPantalla() {
  mostrarTareas(tareas, cambiarEstado, editarTarea, eliminarTarea);
}

function aplicarCambios(nuevasTareas, mensaje) {
  tareas = nuevasTareas;
  actualizarPantalla();
  mostrarMensaje(mensaje);
  return true;
}

function guardarFormulario(evento) {
  evento.preventDefault();
  const titulo = document.getElementById('titulo').value.trim();
  const prioridad = document.getElementById('prioridad').value;
  if (!validarTitulo(titulo)) {
    mostrarErrorTitulo();
    return;
  }

  let nuevasTareas;
  if (idEnEdicion !== null) {
    nuevasTareas = tareas.map(tarea => tarea.id === idEnEdicion ? { ...tarea, titulo, prioridad } : tarea);
  } else {
    const nuevaTarea = {
      id: `local-${crypto.randomUUID()}`,
      titulo,
      prioridad,
      completada: false,
      fechaCreacion: new Date().toISOString(),
      origen: 'local'
    };
    nuevasTareas = [...tareas, nuevaTarea];
  }

  const mensaje = idEnEdicion !== null ? 'Cambios guardados.' : 'Tarea agregada.';
  if (aplicarCambios(nuevasTareas, mensaje)) {
    idEnEdicion = null;
    prepararFormulario();
  }
}

function editarTarea(id) {
  const tarea = tareas.find(tarea => tarea.id === id);
  idEnEdicion = id;
  prepararFormulario(tarea);
}

function eliminarTarea(id) {
  if (!window.confirm('¿Eliminar esta tarea?')) return;
  if (aplicarCambios(tareas.filter(tarea => tarea.id !== id), 'Tarea eliminada.')) {
    if (idEnEdicion === id) {
      idEnEdicion = null;
      prepararFormulario();
    }
  }
}

function cambiarEstado(id) {
  const nuevasTareas = tareas.map(tarea => tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea);
  aplicarCambios(nuevasTareas, 'Estado de la tarea actualizado.');
}

document.getElementById('formulario-tarea').addEventListener('submit', guardarFormulario);
document.getElementById('titulo').addEventListener('input', limpiarErrorTitulo);
document.getElementById('cancelar').addEventListener('click', () => {
  idEnEdicion = null;
  prepararFormulario();
});

actualizarPantalla();
