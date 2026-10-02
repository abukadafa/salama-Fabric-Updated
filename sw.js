/**
 * SALAMA Fabrics & Bedding - Progressive Web App Service Worker
 * Provides offline resilience, instant repeat visits, and asset caching
 */

const CACHE_NAME = 'salama-cache-v1.0.4';

const STATIC_ASSETS = [
  './',
  './index.html',
  './shop.html',
  './admin.html',
  './css/style.css',
  './js/products.js',
  './js/app.js',
  './js/chatbot.js',
  './assets/logo.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './manifest.json'
];

// Install Event: Pre-cache static shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches & claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate for local files; Network-First for images & external requests
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // If local static resource: Stale-While-Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cachedResponse) => {
        const fetchPromise = fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkResponse;
        }).catch(() => {
          // If offline and request is HTML navigation, fallback to index.html
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // If external asset (e.g. Unsplash images, Google Fonts): Network first with cache fallback
  event.respondWith(
    fetch(req).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(req);
    })
  );
});
