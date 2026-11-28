const CACHE = 'lw-fr-v7';
const ASSETS = ['/', '/index.html', '/style.css', '/app.js', '/data.js', '/auth.js', '/translator.js', '/manifest.json'];
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('unsplash.com') || url.includes('images.')) {
    e.respondWith(
      caches.open(CACHE).then(c => c.match(e.request).then(r => r ||
        fetch(e.request).then(res => { c.put(e.request, res.clone()); return res; }).catch(() => r)
      ))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
