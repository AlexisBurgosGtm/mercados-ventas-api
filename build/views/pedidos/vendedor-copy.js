function getView(){
    let view = {
        encabezado: ()=>{
            return `
            <div class="col-12 bg-trans-gradient text-white">
                <h5>Pedidos tomados por fecha</h5>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <input type="date" class="form-control" id="txtFechaPedido">
                </div>
                
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h1 class="text-danger" id="lbTotalPedidos">Q 0.00</h1>
                </div>
            
            </div>
            <div class="row">
                <div class="col-4">
                    <button class="btn btn-success" id="btnCargarPedidos">
                        <i class="fal fa-tag"></i>
                        Pedidos
                    </button>                
                </div>
                <div class="col-4">
                    <button class="btn btn-success" id="btnCargarProductos">
                        <i class="fal fa-cube"></i>
                        Producto
                    </button>                
                </div>
                <div class="col-4">
                    <button class="btn btn-success" id="btnCargarMarcas">
                        <i class="fal fa-credit-card-front"></i>    
                        Marcas
                    </button>                
                </div>
            </div>
            `
        },
        listado: ()=>{
            return `
            <br>
            <div class="row card">
                <div class="table-responsive" id="tblListaPedidos">
                    
                </div>
            </div>
            `
        },
        modalDetallePedido:()=>{
            return `
            <div class="card">          
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
            <div class="row">
                <button class="btn btn-info btn-lg" id="btnEditarPedido">
                    <i class="fal fa-edit"></i>
                    Editar Pedido
                </button>
            </div>
        </div>
        `
        },
        modalCantidad:()=>{
            return `
            <div class="modal fade" id="ModalCantidad" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Nueva Cantidad</label>
                        </div>

                        <div class="modal-body">

                            <div class="row">
                                <div class="col-2">
                                    <h1 class="text-danger fw-700">Cant:</h1>
                                </div>
                                <div class="col-8 text-center">
                                    <h1 class="text-danger fw-700" id="lbCalcTotal">0</h1>
                                </div>
                                <div class="col-2"></div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc1">1</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc2">2</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc3">3</button>
                                </div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc4">4</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc5">5</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc6">6</button>
                                </div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc7">7</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc8">8</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc9">9</button>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-4">
                            
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc0">0</button>
                                </div>
                                <div class="col-4">
                            
                                </div>
                            </div>

                            <br><br><br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-danger btn-md" id="btnCalcCancelar">Cancelar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-primary btn-md" id="btnCalcLimpiar">Limpiar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-success btn-md" id="btnCalcAceptar">Aceptar</button>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
            `
        }
    };

    root.innerHTML = view.encabezado() + view.listado();
    rootMenuLateral.innerHTML = view.modalDetallePedido() + view.modalCantidad();
    lbMenuTitulo.innerText = "Detalle del Pedido"

};

function addListeners(){

    iniciarModalCantidad();

    let btnCargarPedidos = document.getElementById('btnCargarPedidos');
    let btnCargarProductos = document.getElementById('btnCargarProductos');
    let btnCargarMarcas = document.getElementById('btnCargarMarcas');
    
    let txtFechaPedido = document.getElementById('txtFechaPedido');
    let lbTotalPedidos = document.getElementById('lbTotalPedidos');

    txtFechaPedido.value = funciones.getFecha();

    btnCargarProductos.addEventListener('click',async ()=>{
        await api.reporteDiaProductos(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');
    });
    btnCargarMarcas.addEventListener('click',async ()=>{
        await api.reporteDiaMarcas(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');
    });
    btnCargarPedidos.addEventListener('click',async ()=>{
        await api.pedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');
    });
    btnCargarPedidos.click();

    let btnEditarPedido = document.getElementById('btnEditarPedido');
    btnEditarPedido.addEventListener('click',()=>{

        cargarPedidoEdicion(GlobalSelectedCoddoc,GlobalSelectedCorrelativo);
        
    })

};

function inicializarVistaPedidos(){
    getView();
    addListeners();

};

function deletePedidoVendedor(fecha,coddoc,correlativo,st){
    console.log("status del documento: " + st)
    if(st=='O'){
        funciones.Confirmacion('¿Está seguro que desea Eliminar este Pedido?')
        .then((value)=>{
            if(value==true){
                funciones.solicitarClave()
                    .then((clave)=>{
                        if(clave==GlobalPassUsuario){

                            api.deletePedidoVendedor(GlobalCodSucursal,GlobalCodUsuario,fecha,coddoc,correlativo)
                            .then(async()=>{
                                funciones.Aviso('Pedido Eliminado Exitosamente!!')
                                await api.pedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');
                            })
                            .catch(()=>{
                                funciones.AvisoError('No se pudo eliminar')
                            })

                        }else{
                            funciones.AvisoError('Clave incorrecta')
                        }
                    }
                )        
            }
        });

    }else{
        funciones.AvisoError('No se puede Eliminar un pedido que ya fué confirmado por Digitación');
        funciones.hablar('No se puede Eliminar un pedido que ya fué confirmado por Digitación, comuníquese a oficina para solucionarlo');
    }  

};

function getDetallePedido(fecha,coddoc,correlativo){
    GlobalSelectedFecha = fecha;
    GlobalSelectedCoddoc = coddoc;
    GlobalSelectedCorrelativo = correlativo;
    
    lbMenuTitulo.innerText = `Pedido: ${coddoc}-${correlativo}`;
    api.digitadorDetallePedido(fecha,coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')
    $("#modalMenu").modal('show');
};

function getModalCantidad(idRow){

    document.getElementById('lbCalcTotal').innerText='';    
    $("#ModalCantidad").modal('show');


};

function deleteProductoPedido(idRow,coddoc,correlativo,totalprecio,totalcosto){
    funciones.Confirmacion('¿Está seguro que desea Quitar este Producto en este Pedido?')
    .then((value)=>{
        if(value==true){

            api.digitadorQuitarRowPedido(idRow,coddoc,correlativo,totalprecio,totalcosto)
            .then(async()=>{
                
                await api.pedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,funciones.devuelveFecha('txtFechaPedido'),'tblListaPedidos','lbTotalPedidos');

                document.getElementById(idRow).remove();
                
                api.digitadorDetallePedido(GlobalSelectedFecha,coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')

                funciones.Aviso('Item removido exitosamente !!')
            })
            .catch((error)=>{
                console.log(error)
                funciones.AvisoError('No se pudo remover el item')
            })
            
            
        }
    })    
};

function iniciarModalCantidad(){
    let total = document.getElementById('lbCalcTotal');
    total.innerText = "";
    let btnCalcAceptar = document.getElementById('btnCalcAceptar');
    let btnCalcLimpiar = document.getElementById('btnCalcLimpiar');
    let btnCalcCancelar = document.getElementById('btnCalcCancelar');

    let b0 = document.getElementById('btnCalc0');
    let b1 = document.getElementById('btnCalc1');
    let b2 = document.getElementById('btnCalc2');
    let b3 = document.getElementById('btnCalc3');
    let b4 = document.getElementById('btnCalc4');
    let b5 = document.getElementById('btnCalc5');
    let b6 = document.getElementById('btnCalc6');
    let b7 = document.getElementById('btnCalc7');
    let b8 = document.getElementById('btnCalc8');
    let b9 = document.getElementById('btnCalc9');

    b0.addEventListener('click',()=>{total.innerText = total.innerText + "0"})
    b1.addEventListener('click',()=>{total.innerText = total.innerText + "1"})
    b2.addEventListener('click',()=>{total.innerText = total.innerText + "2"})
    b3.addEventListener('click',()=>{total.innerText = total.innerText + "3"})
    b4.addEventListener('click',()=>{total.innerText = total.innerText + "4"})
    b5.addEventListener('click',()=>{total.innerText = total.innerText + "5"})
    b6.addEventListener('click',()=>{total.innerText = total.innerText + "6"})
    b7.addEventListener('click',()=>{total.innerText = total.innerText + "7"})
    b8.addEventListener('click',()=>{total.innerText = total.innerText + "8"})
    b9.addEventListener('click',()=>{total.innerText = total.innerText + "9"})
    btnCalcLimpiar.addEventListener('click',()=>{total.innerText = ""})

    btnCalcAceptar.addEventListener('click',async ()=>{
        let n = Number(total.innerText);
        
        fcnUpdateRowPedido();
        //fcnUpdateTempRow(GlobalSelectedId,n)
        //.then(async()=>{
            
            //
        //})
        total.innerText = "";
        
        $("#ModalCantidad").modal('hide');
    })

    btnCalcCancelar.addEventListener('click',()=>{
        $("#ModalCantidad").modal('hide');
    });

};


function cargarPedidoEdicion(coddoc,correlativo,codclie,nit,nomclie,dirclie){
    funciones.Confirmacion('¿Está seguro que desea EDITAR este pedido, no se podrá deshacer lo que haga?')
    .then((value)=>{

        funciones.Aviso(`Serie: ${coddoc} - Número: ${correlativo}`)

        return; 
        if(value==true){

            loadDetallePedido(coddoc,correlativo)
            .then(()=>{
                //document.getElementById('txtNit').value = codclie;
                //document.getElementById('txtNombre').value = nomclie;
                //document.getElementById('txtDireccion').value = dirclie;
                
                fcnDeletePedidoCargado(coddoc,correlativo)
                .then(async()=>{
                    //createNotification('Pedido anterior eliminado con éxito!!')
                    //await controllerventa.fcnCargarGridTempVentas('tblGridTempVentas');
                    //await controllerventa.fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
                    //$('#ModalListaPedidos').modal('hide');
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo eliminar el pedido anterior')
                })
                

            })
            .catch((error)=>{
                funciones.AvisoError('No se pudo cargar el pedido. Error: ' + error);
            })

        }
    })
    
}

function loadDetallePedido(coddoc,correlativo){
    
    return new Promise((resolve,reject)=>{
        axios.post('/ventas/pedidosdetalle', {
            empnit:GlobalEmpnit,
            coddoc: coddoc,
            correlativo: correlativo
        })
        .then((response) => {
            console.log(response);
            const data = response.data;
            if (data.rowsAffected[1]==0){
                //funciones.AvisoError('No se cargó el pedido');
                reject('No se cargó el pedido');
            }else{
                //funciones.Aviso('Pedido Cargado con éxito')
                resolve();
            }
            
        }, (error) => {
            //funciones.AvisoError('Error en la solicitud');
            resolve('Error de solicitud');
        });

    })
    
    
}

function fcnDeletePedidoCargado(coddoc,correlativo){
    return new Promise((resolve,reject)=>{
        axios.post('/ventas/eliminarpedidocargado', {
            empnit:GlobalEmpnit,
            coddoc: coddoc,
            correlativo: correlativo
        })
        .then((response) => {
            
            const data = response.data;
          
                resolve();
          
        }, (error) => {
            //funciones.AvisoError('Error en la solicitud');
            reject();
        });
    })
    
}