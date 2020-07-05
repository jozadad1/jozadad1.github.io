const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'style.css',
  'images/64px-Octicons-mark-github.svg.png',
  'images/Firefly_MattFree.png',
  'images/linkedin-icon-png--1600.png',
  'images/mail-24px.svg',
  'images/phone_android-24px.svg'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});
