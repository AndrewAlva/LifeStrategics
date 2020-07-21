console.log("sw.js");

var cacheName = 'hello-pwa';
var filesToCache = [
	'/',
	'/index.html',
	'/creditos.html',
	'/eventos.html',
	'/css/app.css',
	'/cms/blog-data.json',
	'/cms/events-data.json',
	'/cms/events-images',
	'/js/app.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});


/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});