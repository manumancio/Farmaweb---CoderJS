//array carro de compras inicial
const carroCompras = []


// funcion para mostrar productos
const productsContainer = document.getElementById("productsContainer");

function mostrarProductos(items) {
    items.forEach(element => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.style = "width: 18rem;"
        card.innerHTML = `
            <img src="${element.imagen}" class="card-img-top" alt="Imagen ilustrativa del medicamento ${element.nombreComercial}">
            <div class="card-body">
            <h5 class="card-title">${element.nombreComercial}</h5>
            <p class="card-text">${element.nombreGenerico}</p>
            <p class="card-text">$ ${element.precio}</p>
            <button id="agregar${element.nombreComercial}" class="btn btn-success ">Agregar <i class="bi bi-bag-plus"></i></button>
            <div class="d-flex flex-start mt-2 ">

            <button id="eliminar${element.nombreComercial}" class="btn btn-outline-success" type="button"> - </button>

            <p id="valorValue" type="text" class="input-carroDeCompras">1</p>

            <button  class="btn btn-outline-success" type="button"> + </button>

            </div>
            </div> 
        `
        productsContainer.appendChild(card)

        // boton "Agregar" que agrega productos
        const botonAgregar = document.getElementById(`agregar${element.nombreComercial}`)
        botonAgregar.addEventListener("click", () => {
            console.log(`${element.nombreComercial}`)
            carroCompras.push(element)
            alert(`Agregaste a tu carro de compras: ${element.nombreComercial}`)
            console.log(carroCompras)
            document.getElementById("valorValue")
            valorValue.innerHTML = `<p> (+=1)</p>`
        })

        // boton "-" que elimina productos
        const botonEliminar = document.getElementById(`eliminar${element.nombreComercial}`)
        botonEliminar.addEventListener("click", () => {
            const medicamentoABorrar = carroCompras.find(element => element.nombreComercial)
            const indice = carroCompras.indexOf(medicamentoABorrar);
            carroCompras.splice(indice, 1);
            console.log(carroCompras)
        })

         // boton "+" que agrega productos

    });
}

mostrarProductos(medicamentosEnVenta)



//boton finalizar compra

//funcion del cálculo del precio total de la compra
function calcularTotal() {
    let totalCompra = 0;
    for (total of carroCompras) {
        totalCompra += total.calcularPrecioConIva()
    }
    console.log(carroCompras);
    return totalCompra.toFixed(2);
}


//funcion para mostrar carrito de compras
function mostrarCarrito() {
    let carrito = "aún está vacío"
    carrito = carroCompras.map(element => element.nombreComercial);
    return carrito;
}


const botonFinalizar = document.getElementById("botonFinalizarCompra")
botonFinalizarCompra.addEventListener("click", () => {
    document.getElementById("resultadosCompra")
    resultadosCompra.innerHTML = `<h3>Mi carro de compras</h3>
                                  <p>Ítems de tu carro de compra: ${mostrarCarrito()}</p>
                                  <p>El precio final que debes abonar es es $ ${calcularTotal()}.</p>`
})