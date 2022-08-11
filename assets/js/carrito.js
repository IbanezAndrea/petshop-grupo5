let cardContainer = document.getElementById('cardContainer')
let cardTemplate = cardContainer.querySelector('#cardTemplate')
//Selecciona al cardContainer para crear las card del carrito adentro.

//Recolecta la data de la API.
async function getData() {
  await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => data = json)
    let articulos = data.response

    
    //Se le debe pasar un array de articulos seleccionados.
    crearCartas(articulos);
    
    //Imprime las cartas del carrito.
    function crearCartas(array) {
      array.forEach(e => {
      const card = cardTemplate.content.cloneNode(true).children[0]
      card.querySelector("#productImage").setAttribute("src", `${e.imagen}`)
      card.querySelector("#productName").textContent = e.nombre
      card.querySelector("#productPrice").textContent = `$ ${e.precio}`
      card.querySelector("#productQuantity").setAttribute("value", `${e.stock}`)
      cardContainer.append(card)
    });
    }

    let removeCartItemButtons = document.getElementsByClassName('removeItemBtn')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', function(event) {
            let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
        })
    }

}
getData()