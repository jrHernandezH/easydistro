// Función para hacer una solicitud GET a la API
function obtenerTiendas() {
    fetch('http://192.168.101.6:3000/api/distribuidores')
        .then(response => response.json())
        .then(data => {
            const cardContainer = document.querySelector('.card-container');

            data.forEach(tienda => {
                const card = document.createElement('div');
                card.classList.add('card');

                const imagen = document.createElement('img');
                imagen.alt = tienda.nombre_distribuidor;
                imagen.src = `http://192.168.101.6:3000/img/${tienda.imagen}`;

                const nombre = document.createElement('h2');
                nombre.textContent = tienda.nombre_distribuidor;

                const direccion = document.createElement('p');
                direccion.textContent = `Dirección: ${tienda.direccion_distribuidor}`;

                const telefono = document.createElement('p');
                telefono.textContent = `Teléfono: ${tienda.telefono_distribuidor}`;

                const correo = document.createElement('p');
                correo.textContent = `Correo: ${tienda.correo_distribuidor}`;

                const descripcion = document.createElement('p');
                descripcion.textContent = `Descripción: ${tienda.descripcion}`;

                card.appendChild(imagen);
                card.appendChild(nombre);
                card.appendChild(direccion);
                card.appendChild(telefono);
                card.appendChild(correo);
                card.appendChild(descripcion);

                card.addEventListener('click', () => {
                    mostrarProductos(tienda);
                });

                cardContainer.appendChild(card);

            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de tiendas:', error);
        });
}


// Función para mostrar productos de la tienda
function mostrarProductos(tienda) {
    const datosDistribuidor = {
        nombre: tienda.nombre_distribuidor,
        direccion: tienda.direccion_distribuidor,
        telefono: tienda.telefono_distribuidor
    };
    window.location.href = `/tienda?nombre=${datosDistribuidor.nombre}&direccion=${datosDistribuidor.direccion}&telefono=${datosDistribuidor.telefono}`;
}

// Llama a la función para obtener los datos de tiendas cuando se cargue la página
document.addEventListener('DOMContentLoaded', obtenerTiendas);
