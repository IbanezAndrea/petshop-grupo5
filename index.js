const API = fetch("https://apipetshop.herokuapp.com/api/articulos")

let eventosAPI;


const datosAPI = async () => {
    try{
        const res = await API
        eventosAPI = await res.json()
        console.log(eventosAPI.response)
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
                                    <div class="card-wrapper">
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
                                                        <input type="number" min="1" value="1" max="${item.stock}" class="form-control cantidad-input" style="width: 5rem;">
                                                    </div>
                                                    <button class="cardButton mb-1  me-2">Agregar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `
            container1.appendChild(carouselItem)
        }
    });
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