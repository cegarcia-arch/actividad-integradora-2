// Guarda los archivos de la aplicación. Las tareas siguen en localStorage.
const PREFIJO_CACHE = `tareas-leo-${self.registration.scope}`;
const NOMBRE_CACHE = `${PREFIJO_CACHE}-v1`;
const ARCHIVOS = [
  './', './index.html', './css/estilos.css', './js/principal.js',
  './js/interfaz.js', './js/api.js', './js/almacenamiento.js'
];

self.addEventListener('install', evento => {
  evento.waitUntil(caches.open(NOMBRE_CACHE).then(cache => cache.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', evento => {
  evento.waitUntil((async () => {
    const nombres = await caches.keys();
    for (const nombre of nombres) {
      if (nombre.startsWith(PREFIJO_CACHE) && nombre !== NOMBRE_CACHE) {
        await caches.delete(nombre);
      }
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', evento => {
  const solicitud = evento.request;
  const url = new URL(solicitud.url);
  // No se guarda la API: su resultado se conserva en localStorage.
  if (solicitud.method !== 'GET' || url.origin !== self.location.origin) return;
  if (!url.href.startsWith(self.registration.scope)) return;
  evento.respondWith((async () => {
    const cache = await caches.open(NOMBRE_CACHE);
    const guardada = await cache.match(solicitud);
    if (guardada) return guardada;
    return fetch(solicitud);
  })());
});
