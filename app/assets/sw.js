var cacheName = 'hello-pwa';
var filesToCache = [
	'/',
	'/index.html',
	'/creditos.html',
	'/eventos.html',
	'/css/app.css',
	'/cms/blog-data.json',
	'/cms/events-data.json',
	'/js/app.js',
	'/img/lifestrategics_logo.svg',
	'/img/lifestrategics_iso_opt.svg',
	'/img/projects/ccc-logo.png',
	'/img/projects/ford-logo.png',
	'/img/projects/iri-logo.png',
	'/img/projects/jtc-logo.png',
	'/img/projects/justicia-logo.png',
	'/img/projects/marcap-logo.png',
	'/img/projects/mexico-evalua-logo.png',
	'/img/projects/mexico-sos-logo.png',
	'/img/projects/ruths-logo.png',
	'/img/projects/spoiler-logo.png',
	'/img/projects/startup-barrio-logo.png',
	'/img/projects/startupweek-logo.png',
	'/img/projects/theroom-logo.png',
	'/img/projects/uma-logo.png',
	'/img/projects/usaid-logo.png',
	'/img/projects/wimt-logo.png',
	'/fonts/FreightNeo_Book.eot',
	'/fonts/FreightNeo_Book.svg',
	'/fonts/FreightNeo_Book.ttf',
	'/fonts/FreightNeo_Book.woff',
	'/fonts/FreightNeo_Book.woff2',
	'/fonts/FreightNeo_Medium.eot',
	'/fonts/FreightNeo_Medium.svg',
	'/fonts/FreightNeo_Medium.ttf',
	'/fonts/FreightNeo_Medium.woff',
	'/fonts/FreightNeo_Medium.woff2'
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