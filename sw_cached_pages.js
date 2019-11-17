const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    './js/main.js'
];

// call install event
self.addEventListener('install', (e) => {
    console.log('sw: installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('sw: caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
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
        fetch(e.request).catch(() => caches.match(e.request))
    )
});