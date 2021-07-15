document.getElementById('btnDownloadProductos').addEventListener('click',()=>{
    funciones.Confirmacion('¿Está seguro que desea Descargar el catálogo de Productos?')
    .then((value)=>{
        if(value==true){
            $('#modalWait').modal('show');
            deleteProductos()
            .then(()=>{
                downloadProductos();
            })
            .catch(()=>{
                funciones.AvisoError('No se pudieron eliminar los productos previos')
            })
            
        }
    })
});

document.getElementById('btnDownloadClientes').addEventListener('click',()=>{
    funciones.Confirmacion('¿Está seguro que desea Descargar el catálogo de Clientes?')
    .then((value)=>{
        if(value==true){
            $('#modalWait').modal('show');
            deleteClientes()
            .then(()=>{
                downloadClientes();
            })
            .catch(()=>{
                funciones.AvisoError('No se pudieron eliminar los Clientes previos')
            })
            
        }
    })
});


function downloadProductos (){
    //setLog(`<label>Productos agregados: 0</label>`,'rootWait')
    //funciones.showToast('Descargando productos')
    //descargando productos
    
     axios.get('/ventas/buscarproductotodos?sucursal=' + GlobalCodSucursal)  
    .then(async(response) => {
        const data = response.data;
        let contador = 1;       
        let totalrows = 0;
        if(data.rowsAffected[0]==0){
            //tabla.innerHTML= 'No existe nada relacionado a: ' + filtro + ', o no hay productos cargados'
            funciones.AvisoError('No hay productos');
            $('#modalWait').modal('hide');
        }else{  
            totalrows = Number(data.rowsAffected[0]);
                  
            data.recordset.map(async(rows)=>{
                var datosdb = {
                    CODSUCURSAL:rows.CODSUCURSAL,
                    CODPROD:rows.CODPROD,
                    DESPROD:rows.DESPROD,
                    CODMEDIDA:rows.CODMEDIDA,
                    EQUIVALE:rows.EQUIVALE,
                    COSTO:rows.COSTO,
                    PRECIO:rows.PRECIO,
                    PRECIOA:rows.PRECIOA,
                    PRECIOB:rows.PRECIOB,
                    PRECIOC:rows.PRECIOC,
                    DESMARCA:rows.DESMARCA,
                    EXENTO:rows.EXENTO,
                    EXISTENCIA:rows.EXISTENCIA
                }                
                var noOfRowsInserted = await connection.insert({
                    into: "productos",
                    values: [datosdb], //you can insert multiple values at a time
                });
                if (noOfRowsInserted > 0) {
                    setLog(`<label>Productos agregados: ${contador} </label>`,'rootWait')
                    contador += 1;
                    if(totalrows==contador){
                        $('#modalWait').modal('hide');
                        funciones.Aviso('Productos descargados exitosamente!!')
                    }
                }
            });
            
        }
    }, (error) => {
        console.log(error);
        funciones.AvisoError('No pude guardar los productos');
        $('#modalWait').modal('hide');
    });

 
   
};

function deleteProductos(){
    return new Promise((resolve,reject)=>{
        setLog(`<label class="text-danger">Eliminando productos...</label>`,'rootWait');
        let del = connection.clear('productos');
        if(del){
            resolve();
        }else{
            reject();
        }
    })            
};

function selectProducto(filtro) {

    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "productos",
            limit: 40,
            where: {
                CODPROD: filtro,
                or: {
                    DESPROD: {
                        like: '%' + filtro + '%'
                    }   
                }
            }
           
        });
        resolve(response)
    });
};


function downloadClientes (){
    //setLog(`<label>Productos agregados: 0</label>`,'rootWait')
    //funciones.showToast('Descargando productos')
    //descargando productos
    
    axios.post('/clientes/listavendedortodos', {
        sucursal: GlobalCodSucursal,
        codven:GlobalCodUsuario
    })  
    .then(async(response) => {
        const data = response.data;
        let contador = 1;       
        let totalrows = 0;
        if(data.rowsAffected[0]==0){
            //tabla.innerHTML= 'No existe nada relacionado a: ' + filtro + ', o no hay productos cargados'
            funciones.AvisoError('No hay productos');
            $('#modalWait').modal('hide');
        }else{  
            totalrows = Number(data.rowsAffected[0]);
                  
            data.recordset.map(async(rows)=>{
                var datosdb = {
                    CODSUCURSAL:rows.CODSUCURSAL,
                    CODIGO:rows.CODIGO,
                    DESMUNI:rows.DESMUNI,
                    DIRCLIE:rows.DIRCLIE,
                    LASTSALE:rows.LASTSALE,
                    LAT:rows.LAT,
                    LONG:rows.LONG,
                    NIT:rows.NIT,
                    NOMCLIE:rows.NOMCLIE,
                    REFERENCIA:rows.REFERENCIA,
                    STVISITA:rows.STVISITA,
                    VISITA:rows.VISITA,
                    TELEFONO:rows.TELEFONO
                }                
                var noOfRowsInserted = await connection.insert({
                    into: "clientes",
                    values: [datosdb], //you can insert multiple values at a time
                });
                if (noOfRowsInserted > 0) {
                    setLog(`<label>Clientes agregados: ${contador} </label>`,'rootWait')
                    contador += 1;
                    if(totalrows==contador){
                        $('#modalWait').modal('hide');
                        funciones.Aviso('Clientes descargados exitosamente!!')
                    }
                }
            });
            
        }
    }, (error) => {
        console.log(error);
        funciones.AvisoError('No pude guardar los productos');
        $('#modalWait').modal('hide');
    });

 
   
};

function deleteClientes(){
    return new Promise((resolve,reject)=>{
        setLog(`<label class="text-danger">Eliminando Clientes...</label>`,'rootWait');
        let del = connection.clear('clientes');
        if(del){
            resolve();
        }else{
            reject();
        }
    })            
};

function selectCliente(dia) {

    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "clientes",
            limit: 40,
            where: {
                VISITA: dia
                }
           
        });
        resolve(response)
    });
};





function insertTempVentas(datos){
    return new Promise((resolve,reject)=>{
        connection.insert({
            into: "tempventa",
            values: [datos], //you can insert multiple values at a time
        })
        .then(()=>{
            resolve();
        })
        .catch(()=>{
            reject();
        })
    }) 

};

function deleteItemVenta(id){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.remove({
            from: "tempventa",
            where: {
                ID: id
            }
        });
        if(rowsDeleted>0){resolve()}else{reject()}
    })            
};

function selectTempventas(usuario) {

    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "tempventa",
            where: {
                    USUARIO: usuario
                },
            order: { by: 'ID', type: 'asc' }
        });
        resolve(response)
    });
};

function selectDataRowVenta(id,nuevacantidad) {
    let costo = 0; let precio = 0; let equivale =0; let exento=0; let cantidad= nuevacantidad;
    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "tempventa",
            where: {
                    ID: id
                }
        });
        response.map((rows)=>{
            costo = rows.COSTO;
            precio = rows.PRECIO;
            equivale = rows.EQUIVALE;
            exento = rows.EXENTO;
        });
        let totalcosto = Number(costo) * Number(cantidad);
        let totalprecio = Number(precio) * Number(cantidad);
        let totalexento = Number(exento) * Number(cantidad);
        let totalunidades = Number(equivale) * Number(cantidad);
        //actualiza la fila
        let updatedrow = await connection.update({
            in: "tempventa",
            set: {
                CANTIDAD:Number(nuevacantidad),
                TOTALUNIDADES:totalunidades,
                TOTALCOSTO:totalcosto,
                TOTALPRECIO:totalprecio,
                EXENTO:totalexento
            },
            where: {
                ID: id
            }
        })
        if(updatedrow>0){
            resolve();
        }else{
            reject();
        }

    });
};


function gettempDocproductos(usuario){
    
    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "tempventa",
            where: {
                    USUARIO: usuario
                },
            order: { by: 'ID', type: 'asc' }
        })
        if(Number(response.length)>0){
            resolve(response);
        }else{
            reject('No hay productos agregados');
        }
    })
    


    

}

function deleteTempVenta(usuario){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.remove({
            from: "tempventa",
            where: {
                USUARIO: usuario
            }
        });
        if(rowsDeleted>0){resolve()}else{resolve()}
    })            
};



function backup_insertTempVentas(datos){
    return new Promise(async(resolve,reject)=>{
        var noOfRowsInserted = await connection.insert({
            into: "tempventa",
            values: [datos], //you can insert multiple values at a time
        });
        if (noOfRowsInserted > 0) {
            resolve();
        }else{
            reject();
        }
    }) 

};

