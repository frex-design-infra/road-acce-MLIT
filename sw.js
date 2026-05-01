// 附属物点検管理システム — Service Worker v1
const CACHE = 'futtendo-v3-3';
const ASSETS = [
  '/',
  '/index.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Supabase・国土地理院・CDNへのリクエストはキャッシュしない（常にネットワーク優先）
  const url = e.request.url;
  if (
    url.includes('supabase.co') ||
    url.includes('gsi.go.jp') ||
    url.includes('unpkg.com') ||
    url.includes('cdnjs') ||
    e.request.method !== 'GET'
  ) {
    return;
  }

  // アプリシェル（index.html）はキャッシュ優先 → ネットワークでアップデート
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
