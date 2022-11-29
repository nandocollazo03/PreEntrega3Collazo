const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaArticulos = document.querySelector('#lista-articulos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaArticulos.addEventListener('click', agregarArticulo);
    
    carrito.addEventListener('click', eliminarArticulo);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });
}

function agregarArticulo(evento) {
    evento.preventDefault();

    if (evento.target.classList.contains('agregar-carrito')) {
        const ArticuloSeleccionado = evento.target.parentElement;
        leerDatosArticulo(ArticuloSeleccionado);
    }
}

function eliminarArticulo(evento) {
    if (evento.target.classList.contains('borrar-articulo')) {
        const articuloId = evento.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !==  articuloId);

        carritoHTML();
    }
}

function leerDatosArticulo(articulo) {
    const infoarticulo = {
        titulo: articulo.querySelector('h3').textContent,
        precio: articulo.querySelector('p').textContent,
        cantidad: 1,
        id: articulo.querySelector('a').getAttribute('data-id')
    }

    const existe = articulosCarrito.some(articulo => articulo.id === infoarticulo.id);

    if (existe) {
        const articulos = articulosCarrito.map(articulo => {
            if (articulo.id === infoarticulo.id) {
                articulo.cantidad++;
                return articulo;
            } else {
                return articulo;
            }
        });

        articulosCarrito = [...articulos];

        
    } else {
        articulosCarrito = [...articulosCarrito, infoarticulo];
    }

    carritoHTML();
}


function carritoHTML() {
    limpiarHTML();

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

        contenedorCarrito.appendChild(fila);
    });

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Eliminar los articulos del tbody
function limpiarHTML() {
    contenedorCarrito.innerHTML = '';

}