// public/serviceWorker.js

const CACHE_NAME = 'cgstreamlist-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/static/css/main.chunk.css',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js'
];

// Install event - Cache app shell resources
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[ServiceWorker] Cache failed:', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Fetch event - Implement cache-first strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then((response) => {
              // Don't cache if not a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // If fetch fails (offline), try to return cached home page for navigation requests
              if (event.request.mode === 'navigate') {
                return caches.match('/');
              }
              
              // Return a custom offline page or asset
              return caches.match('/offline.html');
            });
        })
    );
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const title = 'CGStreamList Update';
  const options = {
    body: event.data ? event.data.text() : 'New content available!',
    icon: '/logo192.png',
    badge: '/logo192.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

// Function to sync favorites when back online
function syncFavorites() {
  // Implementation would depend on your app's data structure
  return fetch('/api/sync-favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: localStorage.getItem('offlineFavorites')
  })
  .then(() => {
    localStorage.removeItem('offlineFavorites');
  });
}
