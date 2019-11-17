const cacheName = 'v2';

// call install event
self.addEventListener('install', (e) => {
    console.log('sw: installed');
});

// call activate event
self.addEventListener('activate', (e) => {
    console.log('sw: activated');
    // removed unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('sw clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// call fetch event
self.addEventListener('fetch', e => {
    console.log('sw fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // make copy/clone of response
                const resClone = res.clone();
                // open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // add response to cache
                        cache.put(e.request, resClone);
                    });
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    );
});