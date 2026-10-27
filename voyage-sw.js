var C = 'vdn-v1', PAGE = 'voyage-de-noces.html';
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(function (c) { return c.add(PAGE); }).catch(function () {}));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  var isPage = u.origin === location.origin && u.pathname.slice(-PAGE.length) === PAGE;
  var isFont = u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';
  if (!isPage && !isFont) return;
  if (isPage) {
    e.respondWith(fetch(r).then(function (res) {
      if (res && res.ok) { var cp = res.clone(); caches.open(C).then(function (c) { c.put(PAGE, cp); }); }
      return res;
    }).catch(function () { return caches.match(PAGE); }));
  } else {
    e.respondWith(caches.match(r).then(function (hit) {
      return hit || fetch(r).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) { var cp = res.clone(); caches.open(C).then(function (c) { c.put(r, cp); }); }
        return res;
      });
    }));
  }
});
