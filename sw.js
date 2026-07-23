const CACHE = "battle-lens-camera-v10";
const ASSETS = [
  "./", "index.html", "styles.css?v=9", "app.js?v=9", "config.js?v=9", "manifest.webmanifest", "icon.svg",
  "assets/recognition/manifest.json", "assets/recognition/species.js?v=9", "assets/recognition/manifest.js?v=9",
  "assets/samples/team-koko.jpg", "assets/samples/team-gs-ces.jpg", "assets/samples/team-yusk.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("index.html"))));
});
