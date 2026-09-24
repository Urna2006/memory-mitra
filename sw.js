const CACHE_NAME = "memory-mitra-v1";
const BASE_PATH = "/memory-mitra/";

const APP_SHELL = [
    BASE_PATH,
    BASE_PATH + "index.html",
    BASE_PATH + "style.css",
    BASE_PATH + "script.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(APP_SHELL);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {

            if (cached) {
                return cached;
            }

            return fetch(event.request)
                .then(response => {

                    const copy = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, copy);
                    });

                    return response;
                })
                .catch(() => {

                    if (event.request.mode === "navigate") {
                        return caches.match(
                            BASE_PATH + "index.html"
                        );
                    }

                });
        })
    );
});