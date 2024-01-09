const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".well-known/pki-validation/A4B8F08804DF20E1C86589C5EDA5EF91.txt","global.css","images/site_icon.ico","images/site_icon.png","manifest.json","robots.txt","workers/classes.js","workers/javaWorker.js","workers/jsWorker.js","workers/libs/javalib.js","workers/libs/pcrelib16.js","workers/pcreWorker.js","service-worker.js"]),
	mimeTypes: {".txt":"text/plain",".css":"text/css",".png":"image/png",".json":"application/json",".js":"text/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.ZJ9sNWwH.js","app":"_app/immutable/entry/app.sE-mi3Rk.js","imports":["_app/immutable/entry/start.ZJ9sNWwH.js","_app/immutable/chunks/entry.y2QgKIlI.js","_app/immutable/chunks/scheduler.ODeSHzXk.js","_app/immutable/chunks/index.ID0k71k8.js","_app/immutable/entry/app.sE-mi3Rk.js","_app/immutable/chunks/scheduler.ODeSHzXk.js","_app/immutable/chunks/index.ssg_r2_O.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-SLtEKSE4.js')),
			__memo(() => import('./chunks/1-llourPKH.js')),
			__memo(() => import('./chunks/2-3YVJDIyM.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
