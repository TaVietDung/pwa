self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then((cache) => cache.addAll([
      '/pwa-examples/a2hs/',
      '/pwa-examples/a2hs/index.html',
      '/pwa-examples/a2hs/index.js',
      '/pwa-examples/a2hs/style.css',
      '/pwa-examples/a2hs/images/fox1.jpg',
      '/pwa-examples/a2hs/images/fox2.jpg',
      '/pwa-examples/a2hs/images/fox3.jpg',
      '/pwa-examples/a2hs/images/fox4.jpg',
    ])),
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName.startsWith("v") && cacheName !== "v1";
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
