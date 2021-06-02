function getView(){
    let view = {
        login : ()=>{
            return `
        <div class="row">
            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                <div class="card shadow">

                    <div class="card-header bg-info-outline text-center">
                        <img src="./favicon.png" width=60 height=60>
                    </div>
                    <div class="card-body">
                        <form class="" id="frmLogin" autocomplete="off">
                            <div class="form-group">
                                <select class="form-control border-info" id="cmbSucursal">
                                    
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="text-secondary">Usuario:</label>
                                <input class="form-control border-secondary" type="text" id="txtUser" placeholder="Escriba su usuario" required="true">
                            </div>
                            <div class="form-group">
                                <label class="text-secondary">Contraseña:</label>
                                <input class="form-control border-secondary" type="password" id="txtPass" placeholder="Escriba su contraseña" required="true">
                            </div>
                            <br>
                            <div class="form-group" align="center">
                                <button class="btn bg-trans-gradient text-white btn-lg shadow col-12 btn-round"  type="submit" id="btnIniciar">
                                    <i class="fal fa-unlock"></i>
                                    Ingresar
                                </button>
                            </div>
                            <div class="form-group" align="right">
                                <small class="">Mercados Efectivos - Ver Offline 1.32</small>
                                <br>
                                <span class=" fw-700">por Alexis Burgos</a></span>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4"></div>
            `
        }
    };

    root.innerHTML = view.login();
};



function addListeners(){
    

    let frmLogin = document.getElementById('frmLogin');
    let btnIniciar = document.getElementById('btnIniciar');
    frmLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
        btnIniciar.innerHTML = GlobalLoader; //<i class="fal fa-unlock"></i>Ingresar
        api.empleadosLogin(frmLogin.cmbSucursal.value,frmLogin.txtUser.value,frmLogin.txtPass.value)
        .then(()=>{
            //document.body.requestFullscreen();
            //por lo visto se deshabilitan las scroll bars en fullscreen
        })
        .catch(()=>{
            btnIniciar.innerHTML = '<i class="fal fa-unlock"></i>Ingresar'
        });
    });


    //carga las sucursales directamente desde código
    document.getElementById('cmbSucursal').innerHTML = funciones.getComboSucursales();

};


function InicializarVista(){
   getView();
   addListeners();
    
   
   /* 
   classTipoDocumentos.getSucursales('cmbSucursal')
   .then(async()=>{
       console.log('hola mundo...')
   })
   */
  
};