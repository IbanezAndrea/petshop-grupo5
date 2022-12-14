
let dataAPI;

getData()
async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(data => dataAPI = data.response)


    let cardContainerP = document.getElementById('card-container-p');
    let toyProducts = [];

    toysCardsFilter()
    function toysCardsFilter() {
        for (product of dataAPI) {
            if (product.tipo == "Juguete") {
                toyProducts.push(product)
            }
        }

        return toyProducts;
    }


    toysCards(toyProducts);
    function toysCards(array) {
        cardContainerP.innerHTML = ""
        if (array.length>0){
        array.forEach(item => {
            if (item.stock<=3){
                let cardBody = document.createElement("div");
                cardBody.innerHTML = `  <div class="product-carousel card-style m-3 product shop-card ">
                <div class="product-image ">
                    <img src="${item.imagen}" class=" img-fluid">
                </div>
                <span class= "d-flex justify-content-center span-color"> ¡Solo ${item.stock} en stock!</span>
                <div class="product-specification">
                    <h4 class="mt-4 pt-3">${item.nombre}</h4>
                    
                    <div class="d-flex justify-content-center">
                        <span class="mt-2">$</span>
                        <p class="size-price">${item.precio}</p>
                        <span class="mt-2">ARG</span>
                    </div>
                    <div class="buy-button pb-5 d-flex justify-content-evenly">
                        <div class="form-group mb-4">
                        <label class="card-input ps-2">Cantidad</label>
                            <input type="number" min="1" value="1" max="${item.stock}" class="form-control mb-1 cantidad-input" style="width: 5rem;">
                        </div>
                        <button class="cardButton mb-1 btn-primary button-class" data-th="${item._id}" me-2">Agregar</button>
                    </div>
                </div>`
                cardContainerP.appendChild(cardBody);
            } else{
                let cardBody = document.createElement("div");
                cardBody.innerHTML = `  <div class="product-carousel card-style m-3 product shop-card ">
                <div class="product-image ">
                    <img src="${item.imagen}" class=" img-fluid">
                </div>
                <span class= "d-flex justify-content-center span-color-v"> ${item.stock} en stock</span>
                <div class="product-specification">
                    <h4 class="mt-4 pt-3">${item.nombre}</h4>
                    
                    <div class="d-flex justify-content-center">
                        <span class="mt-2">$</span>
                        <p class="size-price">${item.precio}</p>
                        <span class="mt-2">ARG</span>
                    </div>
                    <div class="buy-button pb-5 d-flex justify-content-evenly">
                        <div class="form-group mb-4">
                        <label class="card-input ps-2">Cantidad</label>
                            <input type="number" min="1" value="1" max="${item.stock}" class="form-control mb-1 cantidad-input" style="width: 5rem;">
                        </div>
                        <button class="cardButton mb-1 btn-primary button-class" data-th="${item._id}" me-2">Agregar</button>
                    </div>
                </div>` 
            
                cardContainerP.appendChild(cardBody);
            }
        })}else {
            let cardBody = `  <div class="d-flex flex-wrap justify-content-center"> <div class="product-carousel card-style m-3 product">
            <div class="product-image ">
                <img src="https://cdn.dribbble.com/users/9232825/screenshots/18931408/media/d901e116d4292f1dba4a452a5a2718aa.png?compress=1&resize=400x300" class=" img-fluid">
            </div>
            <div class="product-specification">
                <h4 class="mt-5 pt-3">Sin resultados</h4>
                <div class="buy-button pb-5 d-flex justify-content-evenly">
                </div>
            </div></div>`
        cardContainerP.innerHTML += cardBody;
    }
        }

    //carrito
    let carrito = [];

    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    // agregar addeventlistener para filtrar
    let contenidoSearch = document.querySelector(".search-input");
    contenidoSearch.addEventListener("keyup", enviarAlCarrito);

    enviarAlCarrito()
    function enviarAlCarrito() {

        let textSearch = contenidoSearch.value.toLowerCase();
        let filtrado = filtrarNombre(textSearch)
        toysCards(filtrado)
        //filtro
        document.querySelectorAll('.btn-primary').forEach(element => element.addEventListener('click', function () {

            let cantidad = this.closest('.product').querySelector('.cantidad-input').value;
            //class que tomo del input
            let id = this.getAttribute("data-th");
            // obtiene la id cada vez que clickeo el boton que agrega al carrito
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
                        console.log(agregoProductos)
                    }
                }
            } if (agregoProductos === false) {
                carrito.push(producto);
                //  console.log(producto)
            }
            //console.log(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }))
    }

    // llamo funcion de filtro
    function filtrarNombre(nombre) {
        let filtrado = toyProducts.filter((producto) => {
            return producto.nombre.toLowerCase().includes(nombre)
        })
        return filtrado
    }



}

