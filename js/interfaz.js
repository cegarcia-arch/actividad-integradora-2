// Este módulo se encarga de los elementos visibles y los eventos del formulario.
export function mostrarMensaje(texto, esError = false) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.classList.toggle('error', esError);
  mensaje.hidden = false;
}

export function validarTitulo(titulo) {
  return titulo.trim().length > 0;
}

export function mostrarErrorTitulo() {
  const campo = document.getElementById('titulo');
  document.getElementById('error-titulo').textContent = 'Escribe un título que no contenga solo espacios.';
  campo.setAttribute('aria-invalid', 'true');
  campo.focus();
}

export function limpiarErrorTitulo() {
  document.getElementById('error-titulo').textContent = '';
  document.getElementById('titulo').removeAttribute('aria-invalid');
}

export function prepararFormulario(tarea = null) {
  document.getElementById('formulario-tarea').reset();
  limpiarErrorTitulo();
  document.getElementById('titulo-formulario').textContent = tarea ? 'Editar tarea' : 'Nueva tarea';
  document.getElementById('guardar').textContent = tarea ? 'Guardar cambios' : 'Agregar tarea';
  document.getElementById('cancelar').hidden = !tarea;
  if (tarea) {
    document.getElementById('titulo').value = tarea.titulo;
    document.getElementById('prioridad').value = tarea.prioridad;
    document.getElementById('titulo').focus();
  }
}

export function mostrarTareas(tareas, alCompletar, alEditar, alEliminar) {
  const lista = document.getElementById('lista-tareas');
  lista.replaceChildren();
  document.getElementById('lista-vacia').hidden = tareas.length > 0;
  document.getElementById('cantidad-visible').textContent = `${tareas.length} tareas visibles`;

  for (const tarea of tareas) {
    const fila = document.createElement('li');
    fila.className = tarea.completada ? 'tarea terminada' : 'tarea';

    const casilla = document.createElement('input');
    casilla.type = 'checkbox';
    casilla.checked = tarea.completada;
    casilla.id = `casilla-${tarea.id}`;
    casilla.addEventListener('change', () => alCompletar(tarea.id));

    const contenido = document.createElement('div');
    contenido.className = 'tarea-contenido';
    const titulo = document.createElement('label');
    titulo.className = 'tarea-titulo';
    titulo.htmlFor = casilla.id;
    // textContent muestra el título como texto, aunque contenga etiquetas HTML.
    titulo.textContent = tarea.titulo;

    const detalles = document.createElement('div');
    detalles.className = 'tarea-detalles';
    const prioridad = document.createElement('span');
    prioridad.className = `prioridad ${tarea.prioridad}`;
    prioridad.textContent = `Prioridad ${tarea.prioridad}`;
    const fecha = document.createElement('span');
    const fechaFormateada = new Date(tarea.fechaCreacion).toLocaleString('es-EC', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    fecha.textContent = `${tarea.origen === 'api' ? 'Importada' : 'Creada'}: ${fechaFormateada}`;
    detalles.append(prioridad, fecha);
    contenido.append(titulo, detalles);

    const acciones = document.createElement('div');
    acciones.className = 'acciones';
    const editar = document.createElement('button');
    editar.type = 'button';
    editar.textContent = 'Editar';
    editar.setAttribute('aria-label', `Editar: ${tarea.titulo}`);
    editar.addEventListener('click', () => alEditar(tarea.id));
    const eliminar = document.createElement('button');
    eliminar.type = 'button';
    eliminar.textContent = 'Eliminar';
    eliminar.className = 'eliminar';
    eliminar.setAttribute('aria-label', `Eliminar: ${tarea.titulo}`);
    eliminar.addEventListener('click', () => alEliminar(tarea.id));
    acciones.append(editar, eliminar);
    fila.append(casilla, contenido, acciones);
    lista.append(fila);
  }
}
