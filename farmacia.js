
let dataAPI;

getData()
async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(data => dataAPI = data.response)

    let cardContainerP = document.getElementById('card-container-p');
    
    //console.log(dataAPI[2].stock)

    let pharmacyProducts = [];

    cardsFilter()
    function cardsFilter() {
        for (product of dataAPI) {
            if (product.tipo == "Medicamento") {
                pharmacyProducts.push(product)
            }
        }
        //console.log(pharmacyProducts)
        return pharmacyProducts;
    }

    //funcion para crear cartas, hay que decidir un modelo de cards y/o editamos este.

    pharmacyCards(pharmacyProducts);
    function pharmacyCards(array) {
        cardContainerP.innerHTML = ""
        array.forEach(item => {
            let cardBody = document.createElement("div");
            cardBody.innerHTML = `  <div class="product-carousel card-style m-3">
            <div class="product-image ">
                <img src="${item.imagen}" class=" img-fluid">
            </div>
            <div class="product-specification">
                <h4 class="mt-5 pt-3">${item.nombre}</h4>
                
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
        })
    }

    let carrito = []; 
    // agarra el carrito
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    // agregar addeventlistener para filtrar
    let contenidoSearch = document.querySelector(".search-input");
    contenidoSearch.addEventListener("keyup", enviarAlCarrito);

        enviarAlCarrito()
        function enviarAlCarrito() { 
            //filtro
            let textSearch = contenidoSearch.value.toLowerCase();
            let filtrado = filtrarNombre(textSearch)
            pharmacyCards(filtrado)
            //filtro
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
              //  carrito.push(producto);
              //  console.log(producto)
            }
           // console.log(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito));
            //se setea carrito para ser llamado en el otro html con los datos que fueron enviados.

        }))//eventL
    }
    
    // llamo funcion
    
    function filtrarNombre(nombre) {
        let filtrado = pharmacyProducts.filter((producto) => {
            return producto.nombre.toLowerCase().includes(nombre)
        })
        return filtrado
    }

 
        
}