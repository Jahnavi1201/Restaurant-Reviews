let cacheName = "myCache"; //A cache name is declared.
let files_to_be_load = [ //Files to be stored in the cache are stored in an array.
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
];
//The following code is for "install" event.
self.addEventListener('install', (i) => {
  i.waitUntil(
    caches.open(cacheName)
    .then((cacheAdd) => {
      cacheAdd.addAll(files_to_be_load)
    })
  )
})
//The following code is for "fetch" event.
self.addEventListener('fetch', (f) => {
  f.respondWith(
    caches.open(cacheName)
    .then((cacheFetch) => {
      return cacheFetch.match(f.request)
        .then((result) => {
          return result || fetch(f.request)
            .then((result) => {
              cacheFetch.put(f.request, result.clone())
              return result
            })
        })
    })
  )
})
//The following code is for "active" event.
self.addEventListener('activate', function(event) {
  var cacheList = ['myCache'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
