'use strict';

const CACHE_NAME = 'cache-test-v1';
const CACHE_FILES = [
	'/',
	'/index.html',
	'/offline.html',
	'/img/icon/icon.rev.nobg.png',
	'/css/bootstrap.min.css',
	'/js/jquery-3.5.1.slim.min.js',
	'/mural.json',
];

self.addEventListener('install', e => {
	console.log('[sw] install');
	caches.open(CACHE_NAME)
		.then(cache => {
			cache.addAll(CACHE_FILES);
		});
	self.skipWaiting();
});

self.addEventListener('activate', e => {
	console.log('[sw] activate');
	e.waitUntil(
		caches.keys()
			.then((keyList) => {
				return Promise.all(keyList.map((key) => {
					if (key !== CACHE_NAME) {
						return caches.delete(key);
					}
				}));
			})
	);
	self.clients.claim();
});

self.addEventListener('fetch', e => {
	console.log('[sw] fetch:', e.request.url);
	e.respondWith(
		caches.match(e.request.url)
			.then(res => {
				if(res) return res;
				else return fetch(e.request);
			})
			.catch(err => {
				if(e.request.url.includes('ar.html')){
					return caches.match('/offline.html');
				}
			})
	);
});