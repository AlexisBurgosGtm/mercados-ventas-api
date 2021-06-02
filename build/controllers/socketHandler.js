socket.on('productos precio', function(msg,form){
    funciones.NotificacionPersistent(msg,"Cambio Precios");
});

socket.on('productos bloqueado', function(msg,form){
    funciones.NotificacionPersistent(msg,"Productos Bloqueado");
});

socket.on('ventas nueva', async function(msg,form){
    //console.log('se emitió el socket')
    if(GlobalSelectedForm=='SUPERVISORDASHBOARD'){
        if(GlobalCodSucursal==msg){
            try {
                await cargarDatos(document.getElementById('cmbTipoDatos').value)
                await api.supervisorStatusGpsVentas('rootUbicaciones');
            } catch (error) {
                console.log('error al recargar dashboard ..  ' +  error)
            }
        }
    }
});

socket.on('noticias nueva', (msg,user)=>{
    funciones.NotificacionPersistent(msg,'Noticias !!')
})

socket.on('clientes ultimaventa',(msg,user)=>{
    
})

socket.on('reparto pedidomarcado', (msg,status,vendedor)=>{
    console.log('status: ' + status);
    console.log('vendedor: ' + vendedor)
    if(GlobalCodUsuario==vendedor){
        switch (status) {
            case 'ENTREGADO':
                funciones.showToast('Pedido ENTREGADO');
                break;
            case 'RECHAZADO':
                funciones.showToast(`RECHAZO, cliente: ${msg}`);
                funciones.NotificacionPersistent('PEDIDO RECHAZADO',msg);
                break;
            case 'PARCIAL':
                funciones.showToast(`PARCIAL, cliente: ${msg}`);
                funciones.NotificacionPersistent('DEVOLUCION PARCIAL',msg);
                break;
        };
    };

})

