function getView(){
    let view = {
        login : ()=>{
            return `
        <div class="row">
            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                <div class="card shadow">

                    <div class="card-header bg-danger-outline text-center">
                        <img src="./favicon.png" width=60 height=60>
                        <p>APLICACIÓN DE VENTAS</p>
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
                                <small class="">Mercados Efectivos - V3.3 PROGRAMADOR</small>
                                <br>
                                <i class="fal fa-headset"></i><span class=" fw-700"><a href="https://apigen.whatsapp.com/send?phone=50257255092&text=Ayudame%20con%20la%20app%20de%20Mercados%20Efectivos...%20">por Alexis Burgos</a></span>
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

        almacenarCredenciales();

        btnIniciar.innerHTML = GlobalLoader; //<i class="fal fa-unlock"></i>Ingresar
        apigen.empleadosLogin(frmLogin.cmbSucursal.value,frmLogin.txtUser.value,frmLogin.txtPass.value)
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

   //getCredenciales();
  
};


async function almacenarCredenciales(){
    const cred = new PasswordCredential({
        id: document.getElementById('txtUser').value,
        name: document.getElementById('cmbSucursal').value,
        password: document.getElementById('txtPass').value
    })

    await navigator.credentials.store(cred)

};

function getCredenciales(){
   if ('credentials' in navigator) {
  navigator.credentials.get({password: true})
  .then(function(creds) {

      console.log(creds);
    //Do something with the credentials.
    document.getElementById('txtUser').value = creds.id;
    document.getElementById('cmbSucursal').value = creds.name;
    document.getElementById('txtPass').value = creds.password;

  });
    } else {
    //Handle sign-in the way you did before.
    };
}