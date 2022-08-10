//Selecciona al cardContainer para crear las card del carrito adentro.
let cardContainer = document.getElementById('cardContainer')

//Recolecta la data de la API.
async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => data = json)
    let articulos = data.response

    console.log(articulos)

    //Se le debe pasar un array de articulos seleccionados.
    crearCartas(articulos);

    //Imprime las cartas del carrito.
    function crearCartas(array) {
        cardContainer.innerHTML = ''
        array.forEach(articulo => {
            let card = document.createElement('div')
            card.className = 'card cuerpoCarta'
            card.style.width = '10rem'
            card.innerHTML = `<img src="${articulo.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${articulo.nombre}</h5>
              <p class="card-text">${articulo.descripcion}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>`
            cardContainer.appendChild(card)
        });
    }


}
getData()