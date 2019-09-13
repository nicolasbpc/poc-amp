self.addEventListener('install', event => {
  event.waitUntil( 
    caches.open('bpcCache').then(function(cache) {
      return cache.addAll([
        '/assets/images/background-home.jpg',
        '/assets/images/Logo_horizontal.png'
      ]);
    })
  );
}); 

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('bpcCache').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});