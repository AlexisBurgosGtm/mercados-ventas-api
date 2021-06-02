let btnListaP = document.getElementById('btnListaP');
btnListaP.addEventListener('click',()=>{
    $('#modalListaPrecios').modal('show');
})

let txtBProducto = document.getElementById('txtBProducto');
txtBProducto.addEventListener('keydown',(e)=>{
    if(e.code=='Enter'){
        fcnBusquedaProducto2('txtBProducto','tblPre');
        //$('#modalListaPrecios').modal('show');
    }
    if(e.code=='NumpadEnter'){
        fcnBusquedaProducto2('txtBProducto','tblPre');
        //$('#modalListaPrecios').modal('show');
    }
});

let btnBProducto = document.getElementById('btnBProducto');
btnBProducto.addEventListener('click',()=>{
    fcnBusquedaProducto2('txtBProducto','tblPre');
    //$('#modalListaPrecios').modal('show');
})

function fcnBusquedaProducto2(idFiltro,idTablaResultado){
    
    let filtro = document.getElementById(idFiltro).value;
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;

    if(filtro==''){
        funciones.showToast('Escriba una descripción para buscar');
        //$('#modalListaPrecios').modal('hide');
        return;
    };

    let str = ""; 
    axios.get('/ventas/buscarproducto?empnit=' + GlobalEmpnit + '&filtro=' + filtro + '&app=' + GlobalSistema + '&tipoprecio=P')
    
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            let exist = Number(rows.EXISTENCIA)/Number(rows.EQUIVALE); let strC = '';
            
            if(Number(rows.EXISTENCIA<=0)){strC='bg-danger text-white'}else{strC='bg-success text-white'};            
            
            str += `<tr class="border-bottom">
            <td >
                ${funciones.quitarCaracteres(rows.DESPROD,'"'," pulg",true)}
                <br>
                <small class="text-danger"><b>${rows.CODPROD}</b></small>
                <br>
                <b class"bg-danger text-white">${rows.CODMEDIDA}</b>
                <small>(${rows.EQUIVALE})</small>
            </td>
            <td>${funciones.setMoneda(rows.PRECIO || 0,'Q ')}
                <br>
                <small class="${strC}">Inv:${funciones.setMoneda(exist,'')}</small>
            </td>
            
        </tr>`
        })
        tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });

};