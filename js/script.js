// Variables y constantes
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaArticulos = document.querySelector('#lista-articulos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un articulo presionando "Agregar al carrito"
    listaArticulos.addEventListener('click', agregarArticulo);
    
    // Elimina articulos del carrito
    carrito.addEventListener('click', eliminarArticulo);

    // Muestra los articulos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });
}

// Funciones
function agregarArticulo(evento) {
    evento.preventDefault();

    if (evento.target.classList.contains('agregar-carrito')) {
        const ArticuloSeleccionado = evento.target.parentElement;
        leerDatosArticulo(ArticuloSeleccionado);
    }
}

// Elimina un articulo del carrito
function eliminarArticulo(evento) {
    if (evento.target.classList.contains('borrar-articulo')) {
        const articuloId = evento.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !==  articuloId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del articulo
function leerDatosArticulo(articulo) {
    // Crear un objeto con el contenido del articulo actual
    const infoarticulo = {
        titulo: articulo.querySelector('h3').textContent,
        precio: articulo.querySelector('p').textContent,
        cantidad: 1,
        id: articulo.querySelector('a').getAttribute('data-id')
    }

    // Revisa si un eventoo ya existe en el carrito
    const existe = articulosCarrito.some(articulo => articulo.id === infoarticulo.id);

    if (existe) {
        // Actualizamos la cantidad
        const articulos = articulosCarrito.map(articulo => {
            if (articulo.id === infoarticulo.id) {
                articulo.cantidad++;
                return articulo; // retorna el objeto actualizado
            } else {
                return articulo; // retorna los objetos que no son los duplicados
            }
        });

        articulosCarrito = [...articulos];

        
    } else {
        articulosCarrito = [...articulosCarrito, infoarticulo];
    }

    // Agrega eventoos al arreglo del carrito

    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach((articulo) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                ${articulo.titulo}
            </td>

            <td>
                ${articulo.precio}
            </td>

            <td>
                ${articulo.cantidad}
            </td>

            <td>
                <a href="#" class="borrar-articulo" data-id="${articulo.id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(fila);
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Eliminar los articulos del tbody
function limpiarHTML() {
    // Forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}