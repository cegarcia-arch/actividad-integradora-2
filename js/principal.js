import {
  mostrarMensaje, validarTitulo, mostrarErrorTitulo, limpiarErrorTitulo,
  prepararFormulario, mostrarTareas, obtenerTareasVisibles, mostrarContadores
} from './interfaz.js';
import { consultarTareas } from './api.js';
import { recuperarTareas, guardarTareas } from './almacenamiento.js';

let tareas = [];
let idEnEdicion = null;

function actualizarPantalla() {
  const busqueda = document.getElementById('busqueda').value;
  const estado = document.getElementById('estado').value;
  const orden = document.getElementById('orden').value;
  const visibles = obtenerTareasVisibles(tareas, busqueda, estado, orden);
  mostrarTareas(visibles, cambiarEstado, editarTarea, eliminarTarea);
  mostrarContadores(tareas);
  document.getElementById('lista-vacia').textContent = tareas.length === 0
    ? 'Todavía no hay tareas. Agrega la primera.'
    : 'No hay tareas que coincidan con la búsqueda y el filtro.';
}

function aplicarCambios(nuevasTareas, mensaje) {
  try {
    guardarTareas(nuevasTareas);
    tareas = nuevasTareas;
    actualizarPantalla();
    mostrarMensaje(mensaje);
    return true;
  } catch (error) {
    actualizarPantalla();
    mostrarMensaje('No se pudo guardar el cambio. Revisa que el navegador permita almacenar datos y tenga espacio disponible.', true);
    return false;
  }
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
document.getElementById('busqueda').addEventListener('input', actualizarPantalla);
document.getElementById('estado').addEventListener('change', actualizarPantalla);
document.getElementById('orden').addEventListener('change', actualizarPantalla);
document.getElementById('cancelar').addEventListener('click', () => {
  idEnEdicion = null;
  prepararFormulario();
});

function habilitarFormulario(habilitado) {
  for (const control of document.getElementById('formulario-tarea').elements) {
    control.disabled = !habilitado;
  }
}

async function iniciarAplicacion() {
  habilitarFormulario(false);
  let tareasGuardadas;
  try {
    tareasGuardadas = recuperarTareas();
  } catch (error) {
    mostrarMensaje('No se pudo leer la lista guardada. No se reemplazaron tus datos. Revisa el almacenamiento del navegador antes de continuar.', true);
    return;
  }

  if (tareasGuardadas !== null) {
    tareas = tareasGuardadas;
    mostrarMensaje('Tareas recuperadas del almacenamiento local.');
  } else {
    mostrarMensaje('Consultando las tareas de ejemplo…');
    try {
      const importadas = await consultarTareas();
      aplicarCambios(importadas, `${importadas.length} tareas de ejemplo importadas. Prioridad media y fecha de incorporación asignadas por la aplicación.`);
    } catch (error) {
      mostrarMensaje(`No se pudieron importar las tareas de ejemplo. Revisa tu conexión o inténtalo recargando más tarde. Puedes crear tus propias tareas. ${error.message}`, true);
    }
  }
  actualizarPantalla();
  habilitarFormulario(true);
}

iniciarAplicacion();

function mostrarEstadoConexion() {
  const aviso = document.getElementById('aviso-conexion');
  aviso.hidden = navigator.onLine;
  aviso.textContent = 'Sin conexión. Puedes trabajar con las tareas guardadas en este navegador.';
}

async function prepararModoSinInternet() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (error) {
    const aviso = document.getElementById('aviso-conexion');
    aviso.hidden = false;
    aviso.textContent = 'No se pudieron preparar los archivos para abrir la página sin internet. Las tareas siguen guardándose en este navegador.';
  }
}

window.addEventListener('online', mostrarEstadoConexion);
window.addEventListener('offline', mostrarEstadoConexion);
mostrarEstadoConexion();
prepararModoSinInternet();
