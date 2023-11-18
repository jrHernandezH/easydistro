// Función para hacer una solicitud GET a la API
const cliente = localStorage.getItem('cliente');
const distribuidor = localStorage.getItem('distribuidor');
if (cliente) {
    
}else{
    if(distribuidor){
        window.location.href= "/dashDis"
    }else{
        window.location.href="/login"
    } 
}
function obtenerTiendas() {
    fetch('http://localhost:3000/api/distribuidores')
        .then(response => response.json())
        .then(data => {
            const cardContainer = document.querySelector('.card-container');

            data.forEach(tienda => {
                const card = document.createElement('div');
                card.classList.add('card');

                const imagen = document.createElement('img');
                imagen.alt = tienda.nombre_distribuidor;
                imagen.src = `http://localhost:3000/img/${tienda.imagen}`;

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
    // Cambia la forma en que se pasa la información de la tienda
    window.location.href = `/tienda/${tienda.id_distribuidor}`;
}


// Llama a la función para obtener los datos de tiendas cuando se cargue la página
document.addEventListener('DOMContentLoaded', obtenerTiendas);

const logoutButton = document.getElementById('btn-logout');
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('cliente');
    window.location.href = '/';
  });