//var socket = io();

//inicializa la instalacion de la app
funciones.instalationHandlers('btnInstalarApp');

function InicializarServiceWorkerNotif(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
   navigator.serviceWorker.register('./sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
  };

  requestPermission();
}

if ('Notification' in window) {};

function requestPermission() {
  if (!('Notification' in window)) {
    //alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    //$status.innerText = result;
  });
}

InicializarServiceWorkerNotif();

// LISTENER DE LOS BOTONES DEL MENU
let btnMenuInicioSalir = document.getElementById('btnMenuInicioSalir');
btnMenuInicioSalir.addEventListener('click',()=>{
    classNavegar.login();
});

// LISTENER DEL BOTON PARA CERRAR EL MODAL DEL MENU LATERAL
let btnCerrarModalMenuLateral = document.getElementById('btnCerrarModalMenuLateral');
btnCerrarModalMenuLateral.addEventListener('click',()=>{
  $('#modalMenu').modal('hide');
})


function setLog(msg,idcontainer){

  document.getElementById(idcontainer).innerHTML = msg;

};


classNavegar.login();

if (navigator.onLine){
  document.getElementById('btnListaP').classList.remove('btn-danger');
  document.getElementById('btnListaP').classList.add('btn-info')
}else{
  document.getElementById('btnListaP').classList.add('btn-danger')
  document.getElementById('btnListaP').classList.remove('btn-info')
};


window.onpopstate = function(event) {
  
    
    let url =''// 'http://localhost:4400/';
 
    //alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
    switch (document.location.pathname.toString()) {
      case url + '/login':
        classNavegar.login();
        break;
      case url + '/clientes':
        classNavegar.inicioVendedorListado();
          break;
      case url + '/facturacion':
        classNavegar.ventas();
          break;
      case url + '/facturacion':
          classNavegar.ventas();
              break;
      case url + '/mapaclientes':
          classNavegar.ventasMapaClientes();
          break;
      case url + '/logro':
          classNavegar.pedidos();    
          break;
      case url + '/logromes':
          classNavegar.logrovendedor();    
            break;
      default:
        classNavegar.login();  
        break;
    }
}

window.onhashchange = function() { 
  console.log('direccion cambiada...')
  console.log(document.location.pathname.toString())
}