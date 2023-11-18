const productList = document.getElementById('product-list');
const distribuidor_asociado = localStorage.getItem('id_distribuidor');
const cliente = localStorage.getItem('cliente');
const distribuidor = localStorage.getItem('distribuidor');
let id_producto = 0
if(distribuidor){

}else{
    if(cliente){
        window.location.href="/store";
    }else{
        window.location.href='/login';
    }
}
const ruta = `http://localhost:3000/api/distribuidorProductos/${distribuidor_asociado}`;
console.log(ruta);
function loadProducts() {
    fetch(ruta)
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
                <h3>${product.nombre_producto}</h3>
                <img src="img/${product.imagen_producto}" alt="${product.nombre_producto}">
                <p>${product.descripcion_producto}</p>
                <p>Precio: $${parseFloat(product.precio_producto).toFixed(2)}</p>
                <p>Cantidad Disponible: ${product.cantidad_producto}</p>
                <button class="edit-button btn" id="editar">Editar</button>
                <button class="delete-button btn" id="eliminar">Eliminar</button>
            `;

            productList.appendChild(productItem);
            const editButton = productItem.querySelector('.edit-button');
                editButton.addEventListener('click', () => getEdit(product.id_producto));
            const deleteButton = productItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', ()=> setDelete(product.id_producto));
        });
    })
    .catch(error =>{
        console.error('error al obtener los datos', error)
    })
}
const setDelete=(id)=>{
    const url = `http://localhost:3000/api/productos/${id}`;

    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        console.log(`Producto con ID ${id_producto} eliminado exitosamente.`);
        location.reload();
        // Aquí puedes realizar acciones adicionales si es necesario
    })
    .catch(error => {
        console.error('Error al eliminar el producto', error);
    });
}   

const getEdit = (id) => {
    id_producto = id
    const urlProducto = `http://localhost:3000/api/productos/${id}`;

    fetch(urlProducto)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(productData => {
            document.getElementById('product-name').value = productData.nombre_producto;
            document.getElementById('product-description').value = productData.descripcion_producto;
            document.getElementById('product-price').value = productData.precio_producto;
            document.getElementById('product-store').value = productData.cantidad_producto;
            const productImageInput = document.getElementById('product-image');
            // Quita la propiedad 'required'
            productImageInput.removeAttribute('required');
            document.getElementById('Agregar').style.display = 'none';
            document.getElementById('Actualizar').style.display = 'block'
            // Agrega el evento de actualización del producto   
            document.getElementById('Actualizar').addEventListener('click', updateProduct);

            // Aquí puedes realizar acciones con los datos, como llenar un formulario de edición, etc.
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto', error);
        });
};

const updateProduct = (event,) => {
    event.preventDefault();

    let nombre_producto = document.getElementById("product-name").value;
    let descripcion_producto = document.getElementById("product-description").value;
    let precio_producto = document.getElementById("product-price").value;
    let cantidad_producto = document.getElementById("product-store").value;

    const dataUpdate = {
        nombre_producto,
        descripcion_producto,
        precio_producto,
        cantidad_producto
    };
    const id = id_producto;
    const url = `http://localhost:3000/api/productos/${id}`;

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUpdate),
    })
    .then(response => response.json())
    .then(updatedProduct => {
        console.log('Producto actualizado:', updatedProduct);
        location.reload();
        
    })
    .catch(error => {
        console.error('Error al realizar la petición PATCH', error);
    });
};
const orderList = document.getElementById('order-list');

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Mexico_City' };
    const formattedDate = new Date(dateString).toLocaleString('es-MX', options);
    return formattedDate;
}

function loadOrders() {
    const ordersUrl = `http://localhost:3000/api/pedidosD/${distribuidor_asociado}`;

    fetch(ordersUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('order-list'); // Asigna un ID a tu tbody en HTML

            data.forEach(order => {
                const formattedDate = formatDate(order.fecha_hora);

                const orderItem = document.createElement('tr');
                orderItem.innerHTML = `
                    <td>${order.id_pedido}</td>
                    <td>${formattedDate}</td>
                    <td>${order.estado_pedido}</td>
                    <td>$${parseFloat(order.total_pagar_pedido).toFixed(2)}</td>
                    <td>${order.nombre_cliente}</td>
                    <td>${order.direccion_cliente}</td>
                    <td>${order.telefono_cliente}</td>
                `;

                tableBody.appendChild(orderItem);
            });
        })
        .catch(error => {
            console.error('Error al obtener los pedidos', error);
        });
}




document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadOrders();
});

  
  
  
  
const logoutButton = document.getElementById('btn-logout');
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('distribuidor');
    localStorage.removeItem('id_distribuidor')
    window.location.href = '/';
  });