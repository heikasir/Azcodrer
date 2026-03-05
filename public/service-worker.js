// The version of the cache storage
const CACHE_NAME = 'my-site-cache-v1';
// Resources to cache
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Background sync
self.addEventListener('sync', event => {
    if (event.tag === 'sync-posts') {
        event.waitUntil(
            // Perform background tasks here
            console.log('Background sync triggered!')
        );
    }
});