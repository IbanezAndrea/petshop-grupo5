let cardContainer = document.getElementById('cardContainer')
let cardTemplate = cardContainer.querySelector('#cardTemplate')

function decrement() {
    document.getElementById('productQuantity').stepDown();
}
async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => data = json)
    let articulos = data.response
    console.log(articulos)

    //traer localstorage a una variable
    var storageItems = JSON.parse(localStorage.getItem('carrito'));
    console.log(storageItems)

    //crear array con articulos de la api segun items del storage
    function updateItemsArray() {
        if (storageItems != null) {
            storageItems = storageItems.map((item) => {
                let image
                let name
                let price
                let cantidad = Number(item.cantidad)
                articulos.forEach((article) => {
                    if (article._id === item.id) {
                        image = article.imagen
                        name = article.nombre
                        price = article.precio
                    }
                })
                return {
                    ...item,
                    cantidad,
                    imagen: image,
                    nombre: name,
                    precio: price
                }
            })
            console.log(storageItems)
            renderCards(storageItems);
            updateDetails()
        }
    }
    updateItemsArray()
        //Imprime las cartas del carrito.
    function renderCards(array) {
        array.forEach(e => {
            let subtotal = e.cantidad * e.precio
            const card = cardTemplate.content.cloneNode(true).children[0]
            card.querySelector("#productImage").setAttribute("src", `${e.imagen}`)
            card.querySelector("#productName").textContent = e.nombre
            card.querySelector("#productPrice").textContent = `$${e.precio}`
            card.querySelector(".input-number").setAttribute("value", `${e.cantidad}`)
            card.querySelector(".input-number").setAttribute("id", `${e.id}`)
            card.querySelector(".subTotal").textContent = `${subtotal}`
                // card.querySelector(".plusButton").setAttribute("id", `${e.id}`)
                // card.querySelector(".minusButton").setAttribute("id", `${e.id}`)
            cardContainer.append(card)
        });
    }

    //Remueve la card del carrito.
    let removeCartItemButtons = document.getElementsByClassName('removeItemBtn')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', function(event) {
            let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
        })
    }

    //actualizar caja de texo de cantidad al clickear botones + o -
    let minusButtons = document.getElementsByClassName('minusButton')
    for (var i = 0; i < minusButtons.length; i++) {
        var button = minusButtons[i]
        button.addEventListener('click', function(event) {
            let textBoxId = event.target.parentElement.parentElement.parentElement.closest("div").lastChild.previousElementSibling.id
            let textboxValue = event.target.parentElement.parentElement.parentElement.closest("div").lastChild.previousElementSibling.value
            document.getElementById(`${textBoxId}`).stepDown();

            storageItems = storageItems.map((item) => {
                if (item.id == textBoxId) {
                    return {
                        ...item,
                        cantidad: textboxValue
                    }
                }
            })
        })
    }
    let plusButtons = document.getElementsByClassName('plusButton')
    for (var i = 0; i < plusButtons.length; i++) {
        var button = plusButtons[i]
        button.addEventListener('click', function(event) {
            let textBoxId = event.target.parentElement.parentElement.parentElement.closest("div").lastChild.previousElementSibling.id
            let textboxValue = event.target.parentElement.parentElement.parentElement.closest("div").lastChild.previousElementSibling.value
            document.getElementById(`${textBoxId}`).stepUp();

            storageItems = storageItems.map((item) => {
                if (item.id === textBoxId) {
                    return {
                        ...item,
                        cantidad: textboxValue
                    }
                }
            })


        })
    }


    //Sube un array al LocalStorage
    function updateStorage(array) {
        localStorage.setItem("carrito", JSON.stringify(array))
    }

    //Calcula la suma de los subtotales de los articulos del carrito
    function calcTotal() {
        let subTotalLabels = document.getElementsByClassName('subTotal')
        res = 0;
        for (var i = 0; i < subTotalLabels.length; i++) {
            res += Number(subTotalLabels[i].innerHTML)
        }
        return res;
    }
    //Cargar/actualizar datos de seccion detalles
    function updateDetails() {
        let totalPriceLabel = document.getElementById('totalLi')
        totalPriceLabel.innerHTML = `Total: $${calcTotal()}`
    }

    //Remueve todas las cards del carrito.
    function cartClear() {
        let allCards = document.getElementsByClassName('cart-items')
        if (allCards.length > 0) {
            while (allCards.length > 0) {
                allCards[0].parentElement.remove()
            }
            alert("Gracias por su compra!")
        } else console.log("No hay elementos en el carrito")
    }

    let precioFinal = document.getElementById('totalLi')

    function borrarPrecioFinal() {
        precioFinal.innerHTML = 'Total: '
    }



    //Limpia el local-storage y carrito al terminar la compra
    document.getElementById('compra').addEventListener('click', function(event) {
        cartClear()
        borrarPrecioFinal()
        localStorage.clear()
    })
}
getData()
