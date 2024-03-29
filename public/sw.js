if ('serviceWorker' in navigator && navigator.userAgent !== 'ReactSnap') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache').then(cache => {
      return cache.addAll(['./']);
    })
  );
});

self.addEventListener('fetch', function (event) {
  const url = event.request.url;
  const urls = ['cdn.jsdelivr.net', '.css', '.js'];
  if (!urls.some(target => url.includes(target))) return;

  event.respondWith(
    (async function () {
      try {
        const response = await fetch(event.request);
        const type = response.headers.get('content-type');
        const cacheType = ['text/html', 'font/woff', 'text/css', 'application/javascript'];
        const isCacheType = type && cacheType.some(value => type.includes(value));

        if (response.status === 200 && isCacheType) {
          const cache = await caches.open('cache');
          cache.put(event.request.url, response.clone());
        }

        return response;
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});
