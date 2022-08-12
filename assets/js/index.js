const API = fetch("https://apipetshop.herokuapp.com/api/articulos")

let eventosAPI;


const datosAPI = async () => {
    try{
        const res = await API
        eventosAPI = await res.json()
        printCarousel(eventosAPI.response)
    }catch(err){
        console.log(err)
    }
}

datosAPI()


let container1 = document.querySelector('.carousel-inner')


function printCarousel(arrayDatos){
    let primer = true
    arrayDatos.forEach(item => {
        if(item.stock < 4 && item.stock > 0){
            let carouselItem = document.createElement('div')
            if(primer){
                carouselItem.className = "carousel-item active"
                primer = false
            }else{
                carouselItem.className = "carousel-item"
            }
            carouselItem.innerHTML = `
                                    <div class="card-wrapper product">
                                        <div class="product-carousel">
                                            <div class="product-image">
                                                <img src="${item.imagen}" alt="">
                                            </div>
                                            <div class="product-specification pt-3">
                                                <h4 class="mb-2 pt-1">${item.nombre}</h4>
                                                <div class="price-tag justify-content-center py-2">
                                                    <span>$</span>
                                                    <p class="size-price">${item.precio}</p>
                                                    <span>ARG</span>
                                                </div>
                                                <div class="buy-button justify-content-evenly">
                                                    <div class="form-group mb-4">
                                                    <label class="card-input ps-2" for="exampleInputPassword1">cantidad</label>
                                                        <input type="number" min="1" value="1" max="${item.stock}" class="cantidad-input form-control cantidad-input" style="width: 5rem;">
                                                    </div>
                                                    <button class="cardButton mb-1 btn-primary button-class" data-th="${item._id}">Agregar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `
            container1.appendChild(carouselItem)
        }
    });



let carrito = []; 
// agarra el carrito
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

    enviarAlCarrito()
    function enviarAlCarrito() { 
        document.querySelectorAll('.btn-primary').forEach(element => element.addEventListener('click', function() {

        let cantidad = this.closest('.product').querySelector('.cantidad-input').value; 
        //class que tomo del input
        console.log(cantidad)
        let id = this.getAttribute("data-th"); 
        // obtiene la id cada vez que clickeo el boton que agrega al carrito
       // console.log(id)

        let agregoProductos = false; //comienza vacio
        let producto = { 
            id: id,
            cantidad: cantidad
        }
        if (localStorage.getItem("carrito")) {
            for (let i = 0; carrito.length > i; i++) {
                if (carrito[i].id == id) {
                    carrito[i].cantidad == Number(carrito[i].cantidad) + Number(cantidad)
                    // toma del stock la cantidad agregada al carrito.
                    agregoProductos = true;
                    //porque contiene cosas
                    //console.log(agregoProductos)
                }
            }
        } if (agregoProductos === false) {
        carrito.push(producto);
          // console.log(producto)
        }
        //console.log(producto)
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //se setea carrito para ser llamado en el otro html con los datos que fueron enviados.

    }))
}

}


// ------------------- CARTA CAROUSEL -------------- //



/* <div class="product-carousel cardCarousel-style">
<div class="product-image">
    <img src="https://puppis.vteximg.com.br/arquivos/ids/163598-1000-1000/228767.jpg?v=636746890828270000" alt="">
</div>
<div class="product-specification pt-3">
    <h4 class="mb-2 pt-1">Juguete interactivo IQ Treat Ball</h4>
    <div class="price-tag justify-content-center py-2">
        <span>$</span>
        <p class="size-price">300</p>
        <span>ARG</span>
    </div>
    <div class="buy-button justify-content-evenly">
        <div class="form-group mb-4">
        <label class="card-input ps-2" for="exampleInputPassword1">cantidad</label>
            <input type="number" min="1" value="1" max="${item.stock}" class="form-control cantidad-input" style="width: 5rem;">
        </div>
        <button class="cardButton mb-1  me-2">Agregar</button>
    </div>
</div>
</div> */