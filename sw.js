const CACHE_NAME = 'jimpitan-bali-v2';
const ASSETS = [
  '/jimpitan-bali/',
  '/jimpitan-bali/index.html',
  '/jimpitan-bali/css/app.css',
  '/jimpitan-bali/js/app.js',
  '/jimpitan-bali/manifest.json',
  '/jimpitan-bali/assets/icon-192.png',
  '/jimpitan-bali/assets/icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - Cache First
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
