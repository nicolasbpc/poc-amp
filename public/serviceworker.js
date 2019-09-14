self.addEventListener('fetch', function (event) {
  console.log(event);
  event.respondWith(
    caches.open('bpcCache').then(function (cache) {
      console.log(cache);
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});