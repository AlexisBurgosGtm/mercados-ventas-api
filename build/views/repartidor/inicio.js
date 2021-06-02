function getView(){
    let view = {
        encabezado : ()=>{
            return `
            <h3 id="txtTotalPicking">Q 0.00</h3>
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <select id="cmbPicking" class="form-control">
                        
                    </select>
                </div>
                <br>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <select id="cmbTipoListado" class="form-control">
                        <option value="PEDIDOS">PEDIDOS</option>
                        <option value="MAPA">MAPA</option>
                    </select>
                </div>
            </div>
            `
        },
        listado : ()=>{
            return `
            <div class="row">
                <div class="table-responsive" id="containerRepartidor">
                    
                </div>
            </div>
            `
        },
        modalDetallePedido : ()=>{
            return `    
        <div class="card">
            <br>
            <div class="row">
                <div class="col-1"></div>
              

                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <button class="btn btn-md btn-danger" id="btnPedidoRechazado">
                        <i class="fal fa-globe"></i>
                        RECHAZADO
                    </button>
                    
                    <button class="btn btn-md btn-warning" id="btnPedidoParcial">
                        <i class="fal fa-bell"></i>
                        PARCIAL
                    </button>

                    <button class="btn btn-md btn-success" id="btnPedidoEntregado">
                        <i class="fal fa-check"></i>
                        ENTREGADO
                    </button>
                </div>

            </div>
            <br>
            <div class="table-responsive">
                <table class="table table-responsive table-hover table-striped table-bordered">
                    <thead class="bg-trans-gradient text-white">
                        <tr>
                            <td>Producto</td>
                            <td>Medida</td>
                            <td>Cant</td>
                            <td>Precio</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody id="tblDetallePedido"></tbody>
                    
                </table>
            </div>
            <br>
            <div class="">
                <div class="col-1"></div>
                <div class="col-5">
                    <label>Total Pedido : </label>
                    <h2 class="text-danger" id="lbTotalDetallePedido"></h2>
                </div>
                
            </div>
        </div>
            `
        }
    };

    root.innerHTML = view.encabezado() + view.listado();
    rootMenuLateral.innerHTML = view.modalDetallePedido();
};

async function addListeners(){

    let cmbPicking = document.getElementById('cmbPicking');
    cmbPicking.addEventListener('change',async ()=>{
        GlobalSelectedCodEmbarque = cmbPicking.value;
        await api.repartidorPicking(cmbPicking.value,'containerRepartidor','txtTotalPicking')
    })

    api.repartidorComboEmbarquesRep('cmbPicking')
    
    let cmbTipoListado = document.getElementById('cmbTipoListado')
    cmbTipoListado.addEventListener('change',()=>{

        fcnCargarGrid();
        
    })

    let btnPedidoRechazado = document.getElementById('btnPedidoRechazado');
    btnPedidoRechazado.addEventListener('click',()=>{
        funciones.Confirmacion('Marcar este pedido como RECHAZADO, ¿desea continuar?')
        .then(()=>{
            api.repartidorMarcarPedido('R',GlobalSelectedCoddoc,GlobalSelectedCorrelativo,GlobalSelectedCodEmbarque)
            .then(()=>{
                funciones.Aviso('El pedido se marcó como RECHAZADO');
                fcnCargarGrid();
                hideMenuLateral();
                socket.emit('reparto pedidomarcado',GlobalSelectedNomCliente,'RECHAZADO', GlobalSelectedCodven);
            })
            .catch(()=>{
                funciones.AvisoError('Error al marcar el pedido')
            })
        })
    })

    let btnPedidoParcial = document.getElementById('btnPedidoParcial');
    btnPedidoParcial.addEventListener('click',()=>{
        funciones.Confirmacion('Marcar este pedido como DEVOLUCIÓN PARCIAL, ¿desea continuar?')
        .then(()=>{
            api.repartidorMarcarPedido('P',GlobalSelectedCoddoc,GlobalSelectedCorrelativo,GlobalSelectedCodEmbarque)
            .then(()=>{
                funciones.Aviso('El pedido se marcó como PARCIAL');
                fcnCargarGrid();
                hideMenuLateral();
                socket.emit('reparto pedidomarcado',GlobalSelectedNomCliente,'PARCIAL', GlobalSelectedCodven);
            })
            .catch(()=>{
                funciones.AvisoError('Error al marcar el pedido')
            })
        })
    })

    let btnPedidoEntregado = document.getElementById('btnPedidoEntregado');
    btnPedidoEntregado.addEventListener('click',()=>{
        funciones.Confirmacion('Marcar este pedido como ENTREGADO, ¿desea continuar?')
        .then(()=>{
            api.repartidorMarcarPedido('E',GlobalSelectedCoddoc,GlobalSelectedCorrelativo,GlobalSelectedCodEmbarque)
            .then(()=>{
                funciones.Aviso('El pedido se CONFIRMÓ');
                fcnCargarGrid();
                hideMenuLateral();
                socket.emit('reparto pedidomarcado',GlobalSelectedNomCliente,'ENTREGADO', GlobalSelectedCodven);
            })
            .catch(()=>{
                funciones.AvisoError('Error al marcar el pedido')
            })
        })
    })

    

};

async function fcnCargarGrid(){

    let cmbPicking = document.getElementById('cmbPicking');

    if(cmbTipoListado.value == "PEDIDOS"){
        GlobalSelectedCodEmbarque =cmbPicking.value;
        await api.repartidorPicking(cmbPicking.value,'containerRepartidor','txtTotalPicking')
    }else{
        await api.repartidorMapaEmbarque(cmbPicking.value,'containerRepartidor','txtTotalPicking');
    }
}

function Lmap(lat,long,nombre,importe){
    //INICIALIZACION DEL MAPA            
      var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, {center: [lat, long],maxZoom: 20, attribution: osmAttrib});    
      map = L.map('mapcontainer').setView([lat, long], 18).addLayer(osm);

      L.marker([lat, long])
        .addTo(map)
        .bindPopup(nombre + ' - ' + importe)

      return map;
};

function iniciarVistaRepartidor(){
    getView();
    addListeners();
}


function getDetalleFactura(coddoc,correlativo,cliente,codven){
    GlobalSelectedCoddoc = coddoc;
    GlobalSelectedCorrelativo = correlativo;
    GlobalSelectedNomCliente = cliente;
    GlobalSelectedCodven = codven;

    api.repartidorDetallePedido(coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')
    showMenuLateral('CLIENTE: ' + cliente);

}