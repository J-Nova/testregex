// @ts-nocheck
import {version} from '$service-worker';

const CACHE_NAME = `cache-${version}`;

// listen for fetch events in page navigation and return anything that has been cached
self.addEventListener("fetch",event => {
        event.respondWith(fetchWorker(event.request));
    }
);

async function fetchWorker(request) {
    try {
        let res = await fetch(request);
        let cache = await caches.open(CACHE_NAME);
        cache.put(request, res.clone());
        return res;
    } catch (err) {
        let res = await caches.match(request);
        return res;
    }
}