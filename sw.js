const CACHE_NAME = 'mbzd-cache-v1';
const ASSETS = [
  './Marco-und-Beatrice-Zukunftsdashboard-App.html',
  './manifest.json',
  './icon.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if(cached) return cached;
    try{
      const fresh = await fetch(req);
      // cache same-origin only
      if(new URL(req.url).origin === location.origin){
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch(e){
      return cached || Response.error();
    }
  })());
});
