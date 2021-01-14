let rootCarrusel = document.getElementById('rootCarrusel');
let rootProductos = document.getElementById('rootProductos');



function getProductos(){
    
    let str = '';

    productos.map((rows)=>{
        str = str + `
            <div class="col-6 col-md-4 col-lg-3">
              <div class="card top-product-card">
                <div class="card-body">
                    <span class="badge badge-success">
                        Normal
                    </span>
                    <a class="wishlist-btn" href="#">
                        <i class="lni lni-heart"></i>
                    </a>
                    <a class="product-thumbnail d-block" href="#">
                        <img class="mb-2" src=${rows.url} alt=${rows.titulo} id='codigo-${rows.codigo}' onclick="openFullscreen('codigo-${rows.codigo}')">
                    </a>
                    <a class="product-title d-block" href="#">
                        ${rows.titulo}
                    </a>
                    <p class="sale-price">${rows.precio}</p>
                    
                    <a class="btn btn-success btn-sm add2cart-notify" 
                    href="https://api.whatsapp.com/send?phone=50258805114&text=Hola%20MariaAccesorios%2C%20me%20interesa%20este%20producto%20${rows.titulo.replace(' ','%20')}" target="_blank">
                        <i class="lni lni-whatsapp"></i>
                    </a>
                </div>
              </div>
            </div>
        `    
    });

    rootProductos.innerHTML = str;

};

function openFullscreen(idElement) {
    let elem = document.getElementById(idElement);

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
}

