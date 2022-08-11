let cardContainer = document.getElementById('cardContainer')
let cardTemplate = cardContainer.querySelector('#cardTemplate')
//Selecciona al cardContainer para crear las card del carrito adentro.

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
      array.forEach(e => {
      const card = cardTemplate.content.cloneNode(true).children[0]
      card.querySelector("#productImage").setAttribute("src", `${e.imagen}`)
      card.querySelector("#productName").textContent = e.nombre
      card.querySelector("#productPrice").textContent = e.precio
      card.querySelector("#productQuantity").setAttribute("value", `${e.stock}`)
      cardContainer.append(card)
    });
      // cardContainer.innerHTML = ''
      //   array.forEach(articulo => {
      //       let card = document.createElement('div')
      //       card.className = 'card cuerpoCarta'
      //       card.style.width = '10rem'
      //       card.innerHTML = `<div id="cartItem" class="d-flex justify-content-around"
      //       style="background-color: rgba(255, 255, 255, 0.346) ;">
      //       <div id="productData" class="d-flex align-items-center border">
      //         <img id="productImage" src="${articulo.imagen}" alt="" style="width:100px ; height: 100px;">
      //         <p id="productName">${articulo.nombre}</p>
      //       </div>
      //       <div class="d-flex align-items-center border">
      //         <p id="productPrice">${articulo.precio}</p>
      //       </div>
      //       <div class="d-flex align-items-center border">
      //         <div class="input-group input-number-group">
      //           <div class="input-group-button">
      //             <span class="input-number-decrement">-</span>
      //           </div>
      //           <input id="productQuantity" class="input-number" type="number" value="${articulo.stock}" min="1" max="">
      //           <div class="input-group-button">
      //             <span class="input-number-increment">+</span>
      //           </div>
      //         </div>
      //         <div>
      //           <button>X</button>
      //         </div>
      //       </div>
      //     </div>`
      //       cardContainer.appendChild(card)
      //   });
    }

    let removeCartItemButtons = document.getElementsByClassName('removeItemBtn')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', function(event) {
            let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.parentElement.remove()
            console.log("item removed")
        })
    }

}
getData()