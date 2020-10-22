'use strict';

const CACHE_NAME = 'pwa-test-v1';
const CACHE_FILES = [
	'sheep.mp4',
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
	console.log('[sw] fetch:', e);
	e.respondWith(
		caches.match(e.request)
			.then(res => {
				if(res) return res;
				else return fetch(e.request);
			})
		);
});