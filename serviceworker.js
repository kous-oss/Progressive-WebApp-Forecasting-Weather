const CACHE_NAME = 'Cache_worker';

const urlsToCache = ['index.html','offline.html'];


const self = this;

// Install A Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((res) => {
        console.log('Opened');
        return res.addAll(urlsToCache);
      })
    );
    
})


// Fetch 
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((res) => {
        return fetch(event.request).catch((result) => {
            caches.match('offline.html');
        });
      })
    );
})


// Activate Service Worker

self.addEventListener('activate', (event) => {

    const whitelist = [];
    whitelist.push(CACHE_NAME);

    event.waitUntil(
      caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.map((cachename) => {
            if (!whitelist.includes(cachename)) {
              return caches.delete(cachename);
            }
          })
        );
      })
    );
})