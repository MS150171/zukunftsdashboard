const CACHE_NAME = 'mbzd-cache-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icon.svg',
  './apple-touch-icon.png',
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
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (event.request.mode === 'navigate') {
      try {
        const fresh = await fetch(event.request, { cache: 'no-store' });
        if (new URL(event.request.url).origin === self.location.origin) {
          cache.put('./index.html', fresh.clone());
        }
        return fresh;
      } catch (e) {
        const cached = await cache.match('./index.html');
        return cached || Response.error();
      }
    }

    const cached = await cache.match(event.request);
    if (cached) return cached;

    try {
      const fresh = await fetch(event.request);
      if (new URL(event.request.url).origin === self.location.origin) {
        cache.put(event.request, fresh.clone());
      }
      return fresh;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
