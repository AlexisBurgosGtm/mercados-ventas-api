
var CACHE = 'mercadosefectivosoffline';
const staticAssets = [  
  './css/vendors.bundle.css',
  './css/app.bundle.css',
  './css/.../styles.css',
  '././css/btn.css',
  './libs/leaflet/leaflet.css',
  './libs/noty/noty.min.css',
  './manifest.json',
  './js/vendors.bundle.js',
  './js/app.bundle.js',
  './js/../script.js',
  './libs/noty/noty.min.js',
  './libs/chartjs.min.js',
  './libs/sweetalert.min.js',
  './libs/axios.min.js',
  './libs/leaflet/leaflet.js',
  './libs/jsstore/jsstore.min.js',
  './libs/jsstore/jsstore.worker.min.js',
  './libs/funciones.js',
  './controllers/classNavegar.js',
  './controllers/GlobalVars.js',
  './controllers/classDb.js',
  './controllers/dbcalls.js',
  './models/classEmpleados.js',
  './models/classTipoDocumentos.js',
  './controllers/apicalls.js',
  './index.js',
  './favicon.png',
  './index.html',
   './sw.js',
   './views/vendedor/facturacion.js',
   './views/vendedor/vendedor.js',
   './views/login/index.js'
];

self.addEventListener('install', function(evt) {
  console.log('Service worker instalado');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
  
	
});

self.addEventListener('fetch', async evt => {

  var req = evt.request.clone();
  if (navigator.onLine){
    if (req.clone().method == "GET") {
      //evt.respondWith(fromCache(evt.request));
      evt.waitUntil(update(evt.request));
    }
  }else{
    if (req.clone().method == "GET") {
      evt.respondWith(fromCache(evt.request));
      //evt.waitUntil(update(evt.request));
    }
  }
  
  /**
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
   */
  
//carga caché y lo actualiza.. hay que evitar las solicitudes del socket.io
/*
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
*/
  
  /* 
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );

  await event.waitUntil(update(event.request));
*/
});

/*
self.addEventListener('fetch', function(evt) {
  let requestURL = new URL(evt.request.url);
  //console.log('host request: '+ requestURL.hostname);
  var req = evt.request.clone();
  if(req.method=='GET'){
    if(req.destination==''){}else{

          evt.waitUntil(update(evt.request));
          evt.respondWith(fromCache(evt.request));

    }
  }*/

  /*
  var req = evt.request.clone();
  if (navigator.onLine){
    if (req.clone().method == "GET") {
      //evt.respondWith(fromCache(evt.request));
      evt.waitUntil(update(evt.request));
    }
  }else{
    if (req.clone().method == "GET") {
      evt.respondWith(fromCache(evt.request));
      //evt.waitUntil(update(evt.request));
    }
  }
  
});
  */


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

async function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request)
        .then(function (response) {
          return cache.put(request, response.clone())
                      .then(function () {
                        //console.log('Cache actualizado');
          return response;
      });
    });
  });
}
    

