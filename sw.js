
// Name of the cache
const CACHE_NAME = "beauty-v1";

// Files to cache (add your files here)
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles/style.css",
  "./scripts/script.js",
  "./favicons/android-icon-192x192.png",
  "./favicons/android-icon-512x512.png",
  "./favicons/manifest.json"
];

// Install event (cache files)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event (clean old caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event (serve cached files when offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
