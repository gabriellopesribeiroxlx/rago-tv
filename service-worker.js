const CACHE_NAME = "meu-pwa-cache-v1";
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

// Instala o service worker e adiciona os arquivos ao cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Intercepta as requisições e serve os arquivos em cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Remove caches antigos ao atualizar o service worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cache) => cache !== CACHE_NAME)
                    .map((cache) => caches.delete(cache))
            );
        })
    );
});