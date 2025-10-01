// Service Worker for caching and performance
const CACHE_NAME = 'bravoo-v1';
const urlsToCache = [
  '/',
  '/logo/brlogo.png',
  '/founder/founder.png',
  '/landing-mi.png',
  '/_next/static/css/',
  '/_next/static/chunks/framework',
  '/_next/static/chunks/main'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
