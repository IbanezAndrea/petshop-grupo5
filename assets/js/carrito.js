let cardContainer = document.getElementById('cardContainer')
let cardTemplate = cardContainer.querySelector('#cardTemplate')
//Selecciona al cardContainer para crear las card del carrito adentro.

//Recolecta la data de la API.
async function getData() {
  await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then(response => response.json())
    .then(json => data = json)
  let articulos = data.response
  guardarTodo(articulos)

  //traer storage a una variable
  let articulosStorage = JSON.parse(localStorage.getItem('algo'));
  console.log(articulosStorage)


  crearCartas(articulosStorage);

  //Imprime las cartas del carrito.
  function crearCartas(array) {
    array.forEach(e => {
      let subtotal = e.cantidad * e.precio
      const card = cardTemplate.content.cloneNode(true).children[0]
      card.querySelector("#productImage").setAttribute("src", `${e.imagen}`)
      card.querySelector("#productName").textContent = e.nombre
      card.querySelector("#productPrice").textContent = `$ ${e.precio}`
      card.querySelector("#productQuantity").setAttribute("value", `${e.cantidad}`)
      card.querySelector(".subTotal").textContent = `${subtotal}`
      card.querySelector(".minusButton").setAttribute("onclick", `updateInputNumber("minus", ${e._id}`)
      card.querySelector(".plusButton").setAttribute("onclick", `updateInputNumber("plus", ${e._id}`)
      cardContainer.append(card)
    });
  }
  //Remueve la card del carrito.
  let removeCartItemButtons = document.getElementsByClassName('removeItemBtn')
  for (var i = 0; i < removeCartItemButtons.length; i++) { //tratar de pasar a foreach
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function (event) {
      let buttonClicked = event.target
      buttonClicked.parentElement.parentElement.remove()
    })
  }

  //actualizar caja de texo de contidad al clickear botones + o -
  function updateInputNumber(action, id) {
    //Actualizar el array de los datos del storage
    articulosStorage = articulosStorage.map(e => {
      let cantidad = e.cantidad
      if (e._id === id) {
        if (action === "minus") { cantidad-- }
        else { cantidad++ }
      }
      return {
        ...e,
        cantidad
      }
    })
    
console.log(articulosStorage)
  }
  //Sube un array al LocalStorage
  function guardarTodo(array) {
    localStorage.setItem("algo", JSON.stringify(array))
  }

  // console.log(articulos)

  //Agarra todos los elementos del local Storage y los hace objeto.
  // function allStorage() {
  //     var values = [],
  //         keys = Object.keys(localStorage),
  //         i = keys.length;
  //     while (i--) {
  //         values.push(localStorage.getItem(keys[i]));
  //     }
  //     return values;
  // }
  // console.log(allStorage())


  let subTotales = document.getElementsByClassName('subTotal')
  //Calcula la suma de todos los articulos del carrito.
  function subtotales(array) {
    resultado = 0;
    for (var i = 0; i < array.length; i++) {
      resultado = resultado + Number(array[i].innerHTML)
    }
    return resultado;
  }
  console.log(subtotales(subTotales))

  //Precio Total
  var precioTotal = document.getElementById('totalLi')
  let total = subtotales(subTotales)
  precioTotal.innerHTML = `Total= ${total}`

  //Remueve Todas las cards del carrito.
  let todasLasCards = document.getElementsByClassName('cart-items')

  function removerTodasLasCard(array) {
    if (array.length > 0) {
      while (array.length > 0) {
        array[0].parentElement.remove()
      }
      console.log("Gracias por su compra!")
    } else console.log("No hay elementos en el carrito")
  }

  //Limpia el Storage
  let btnCompra = document.getElementById('compra')
  btnCompra.addEventListener('click', function (event) {
    removerTodasLasCard(todasLasCards)
    localStorage.clear()
  })


}
getData()