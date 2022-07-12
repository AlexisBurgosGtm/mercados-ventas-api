let classNavegar = {
    login : async(historial)=>{
        divUsuario.innerText = 'DESCONECTADO';
        lbTipo.innerText = "Inicie sesión";
        rootMenu.innerHTML = '';
        GlobalCoddoc = '';
        GlobalCodUsuario=99999;
        GlobalUsuario = '';
        GlobalPassUsuario = '';
        GlobalTipoUsuario ='';
            funciones.loadScript('../views/login/index.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGIN';
                InicializarVista();
                rootMenuFooter.innerHTML = '<b class="text-white">Mercados Efectivos</b>';
                if(historial=='SI'){

                }else{
                    window.history.pushState({"page":0}, "login", GlobalUrl + '/login')
                }
                
            })
        
            
    },
    inicio : async(tipousuario)=>{
        divUsuario.innerText = GlobalUsuario;
        lbTipo.innerText = GlobalTipoUsuario;

        switch (tipousuario) {
            case 'VENDEDOR':
                classNavegar.inicioVendedor();
                break;
            default:
                funciones.AvisoError('Esta aplicación es solo para VENTAS');
                break;
        };
    },
    inicioProgramador: ()=>{
        funciones.loadScript('../views/programador.js','root')
        .then(async()=>{
            GlobalSelectedForm='DEVELOPER';
            InicializarVista();
        })
    },
    inicioVendedor : async ()=>{
        let strFooter =    `<button class="btn btn-sm "  id="btnMenu2VendedorClientesMapa">
                                <i class="fal fa-map"></i>
                                Mapa
                            </button> 
                            <button class="btn btn-sm "  id="btnMenu2VendedorClientes">
                                <i class="fal fa-shopping-cart"></i>
                                Clientes
                            </button>
                          
                            <button class="btn btn-sm " id="btnMenu2VendedorLogro">
                                <i class="fal fa-chart-pie"></i>
                                Logro
                            </button>

                            <button class="btn btn-sm hidden" id="btnMenu2Censo">
                                <i class="fal fa-edit"></i>
                                .
                            </button>
                            <button class="btn btn-sm "  id="btnMenu2VendedorSync">
                                <i class="fal fa-sync"></i>
                                Desc
                            </button>
                    
                            `

                    rootMenuFooter.innerHTML = strFooter;
                                                 
                    let btnMenu2VendedorClientes = document.getElementById('btnMenu2VendedorClientes');
                    btnMenu2VendedorClientes.addEventListener('click',()=>{
                        classNavegar.inicioVendedorListado();
                    });


                    let btnMenu2VendedorClientesMapa = document.getElementById('btnMenu2VendedorClientesMapa');
                    btnMenu2VendedorClientesMapa.addEventListener('click',()=>{
                        classNavegar.ventasMapaClientes();
                    });

             
             
                    let btnMenu2VendedorLogro = document.getElementById('btnMenu2VendedorLogro');
                    btnMenu2VendedorLogro.addEventListener('click',()=>{
                        classNavegar.logrovendedor();
                    });

                 
                    let btnMenu2Censo = document.getElementById('btnMenu2Censo');
                    btnMenu2Censo.addEventListener('click',()=>{

                        funciones.Aviso('Opción no disponible de momento');

                    });

                    let btnMenu2VendedorSync = document.getElementById('btnMenu2VendedorSync');
                    btnMenu2VendedorSync.addEventListener('click',()=>{
                        $('#modalSync').modal('show');
                    });

                 
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();

                    //classNavegar.ventasMapaClientes();
                    classNavegar.inicioVendedorListado();


                    let btnMConfig = document.getElementById('btnMConfig');
                    btnMConfig.addEventListener('click',()=>{
                        if(GlobalSelectedForm=='LOGIN'){
                            funciones.AvisoError('Debe iniciar sesión para ver esta sección');
                            return;
                        };
                        classNavegar.ConfigVendedor();
                    });

                  
             
    },
    inicioVendedorListado :async ()=>{
        funciones.loadScript('../views/vendedor/vendedor.js','root')
        .then(async()=>{
            GlobalSelectedForm='INICIO';
            InicializarVista();
            window.history.pushState({"page":1}, "clientes", '/clientes');
        })
    },
    inicio_getgps :async (latitud,longitud)=>{
        funciones.loadScript('../views/vendedor/getGpsLocation.js','root')
        .then(async()=>{
            GlobalSelectedForm='GPS';
            InicializarVista(latitud,longitud);
            window.history.pushState({"page":7}, "gps", '/gps');
        })
    },
    inicioRepartidor : async()=>{
        let strMenu =  `
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuGerenteInicio">
                                <span>Pickings</span>
                            </a>
                            
                            <a class="dropdown-item hidden" data-toggle="dropdown" id="btnMenuGerenteNoticias">
                                <span>Noticias</span>
                            </a>
                            `
                    rootMenu.innerHTML = strMenu;
                       
                     // handlers del menu
                    let btnMenuGerenteInicio = document.getElementById('btnMenuGerenteInicio');
                    btnMenuGerenteInicio.addEventListener('click',()=>{
                        classNavegar.inicioGerente();
                    });
                    
                    
                    let btnMenuGerenteNoticias = document.getElementById('btnMenuGerenteNoticias');
                    btnMenuGerenteNoticias.addEventListener('click',()=>{
                        

                    });

                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();

                    classNavegar.repartidorIniciar();

    },
    inicioSupervisor : async()=>{
        let strMenu =  `
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuSupervisorDashboard">
                                <span>Dashboard</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuSupervisorVendedores">
                                <span>Vendedores</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuSupervisorClientes">
                                <span>Censo Clientes</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuSupervisorPrecios">
                                <span>Precios</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuSupervisorNoticias">
                                <span>Noticias</span>
                            </a>
                            `
                    rootMenu.innerHTML = strMenu;

                     // handlers del menu
                     let btnMenuSupervisorDashboard = document.getElementById('btnMenuSupervisorDashboard');
                     btnMenuSupervisorDashboard.addEventListener('click',()=>{
                         classNavegar.supervisorDashboard();
                     });

                     let btnMenuSupervisorVendedores = document.getElementById('btnMenuSupervisorVendedores');
                     btnMenuSupervisorVendedores.addEventListener('click',()=>{
                         classNavegar.supervisorVendedores();
                     });
                     let btnMenuSupervisorClientes = document.getElementById('btnMenuSupervisorClientes');
                     btnMenuSupervisorClientes.addEventListener('click',()=>{
                         classNavegar.supervisorClientes();
                     });
                     
                     let btnMenuSupervisorPrecios = document.getElementById('btnMenuSupervisorPrecios');
                     btnMenuSupervisorPrecios.addEventListener('click',()=>{
                        classNavegar.supervisorPrecios(); 
                     });
                     
                     let btnMenuSupervisorNoticias = document.getElementById('btnMenuSupervisorNoticias');
                     btnMenuSupervisorNoticias.addEventListener('click',()=>{
                        classNavegar.noticias();     
                     });

                     //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();
                    //carga el inicio del supervisor
                    classNavegar.supervisorDashboard();
    },
    supervisorDashboard:()=>{
        funciones.loadScript('../views/supervisor/dashboard.js','root')
        .then(()=>{
            GlobalSelectedForm='SUPERVISORDASHBOARD';
            InicializarVistaSupervisorDashboard();
        });          
    },
    supervisorVendedores:()=>{
        funciones.loadScript('../views/supervisor/vendedores.js','root')
        .then(()=>{
            GlobalSelectedForm='SUPERVISORVENDEDOR';
            InicializarVistaSupervisorVendedores();
        });          
    },
    supervisorPrecios: ()=>{
        funciones.loadScript('../views/supervisor/precios.js','root')
        .then(()=>{
            GlobalSelectedForm='SUPERVISORPRECIOS';
            inicializarVistaPrecios();
        })
    },
    supervisorClientes: ()=>{
        funciones.loadScript('../views/supervisor/censo.js','root')
        .then(()=>{
            GlobalSelectedForm='SUPERVISORCENSO';
            inicializarVistaCensoSupervisor();
        })
    },
    repartidorIniciar:()=>{
        funciones.loadScript('../views/repartidor/inicio.js','root')
        .then(()=>{
            GlobalSelectedForm='REPARTIDORINICIO';
            iniciarVistaRepartidor();
        });            
    },
    ventas: async(nit,nombre,direccion)=>{
        
            funciones.loadScript('./views/vendedor/facturacion.js','root')
            .then(()=>{
                GlobalSelectedForm ='VENTAS';
                iniciarVistaVentas(nit,nombre,direccion);
                window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
            })
          
    },
    vendedorCenso: async()=>{
        
        funciones.loadScript('./views/vendedor/censo.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORCENSO';
            iniciarVistaVendedorCenso();
        })
      
    },
    ventasMapaClientes: async(historial)=>{
        funciones.loadScript('./views/vendedor/mapaclientes.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORMAPACLIENTES';
            iniciarVistaVendedorMapaClientes();
            if(historial=='SI'){

            }else{
            window.history.pushState({"page":3}, "mapaclientes", GlobalUrl + '/mapaclientes')
            }
        })
    },
    vendedorReparto: async()=>{
        
        funciones.loadScript('./views/vendedor/reparto.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORREPARTO';
            iniciarVistaVendedorReparto();
        })
      
    },
    pedidos: async (historial)=>{
        funciones.loadScript('../views/pedidos/vendedor.js','root')
        .then(()=>{
            GlobalSelectedForm='PEDIDOS';
            inicializarVistaPedidos();
            if(historial=='SI'){

            }else{
            window.history.pushState({"page":4}, "logro", GlobalUrl + '/logro')
            }
        })             
    },
    logrovendedor: (historial)=>{
        funciones.loadScript('../views/pedidos/vendedorlogro.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGROVENDEDOR';
                inicializarVistaLogro();
                if(historial=='SI'){

                }else{
                window.history.pushState({"page":5}, "logromes", GlobalUrl + '/logromes')
                }
        })
    },
    despacho: async()=>{
        funciones.loadView('../views/despacho/index.html','root')
        .then(()=>{
            funciones.loadScript('./views/despacho/controller.js','root')
            .then(()=>{
                GlobalSelectedForm ='DESPACHO';
                controllerdespacho.iniciarVistaDespacho();

            })
        })
    },
    ConfigVendedor: ()=>{
        funciones.loadScript('../views/config.js','root')
        .then(()=>{
            GlobalSelectedForm='CONFIG';
            initView();
        })
    }
}