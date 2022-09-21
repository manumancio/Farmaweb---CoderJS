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
            </div> 
        `
        productsContainer.appendChild(card)

        // boton "Agregar" que agrega productos
        const botonAgregar = document.getElementById(`agregar${element.nombreComercial}`)
        botonAgregar.addEventListener(`click`, () => {
            carroCompras.push(element)
            console.log(carroCompras)
            mostrarCarrito()
        })
    })
}

mostrarProductos(medicamentosEnVenta)

//funcion para mostrar carrito
const mostrarCarrito = () => {
    contenedorCarroCompras.innerHTML = `` //para reinicializarlo

    carroCompras.forEach(element => {
        const div = document.createElement('div')
        div.className = ('productosEnElCarrito')
        div.innerHTML = `
    <p class="productosCarrito-item">${element.nombreComercial}</p>
    <p class="productosCarrito-item">Precio: $ ${element.precio}</p>   
    <button id="eliminar${element.nombreComercial}" class="productosCarrito-item"><i class="bi bi-trash3"></i></button>
    `
        contenedorCarroCompras.appendChild(div)

        // boton "Eliminar" productos
        const botonEliminar = document.getElementById(`eliminar${element.nombreComercial}`)
        botonEliminar.addEventListener("click", () => eliminarMedicamento(element.nombreComercial))

    })

    //mostrar numero de elementos en el icono de compras
    const contadorCarroCompras = document.getElementById(`contadorCarroCompras`)
    contadorCarroCompras.innerHTML = carroCompras.length

    //mostrar el precio total
    const precioTotal = document.getElementById(`precioTotal`)
    precioTotal.innerHTML = carroCompras.reduce((acumulador, element) => acumulador + element.calcularPrecioConIva(), 0)
}

// funcion para eliminar medicamento 
const eliminarMedicamento = medicamentoABorrar => {
    const medicamento = carroCompras.find(element => element.nombreComercial === medicamentoABorrar);
    const indice = carroCompras.indexOf(medicamento);
    carroCompras.splice(indice, 1);
    console.log(carroCompras)
    mostrarCarrito()
}

//funcion para vaciar el carro de compras
const vaciarCarroCompras = document.getElementById(`vaciarCarroCompras`)
vaciarCarroCompras.addEventListener("click", () => {
    carroCompras.length = 0
    mostrarCarrito()
})

