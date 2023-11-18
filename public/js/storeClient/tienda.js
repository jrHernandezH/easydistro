let id_distribuidor = document.getElementById('name_store').innerHTML;
const productList = document.getElementById('lista-productos');

const ruta = `http://localhost:3000/api/distribuidorProductos/${id_distribuidor}`;

function loadProducts() {
  fetch(ruta)
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        // Card Header (Imagen)
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const img = document.createElement('img');
        img.src = `http://localhost:3000/img/${product.imagen_producto}`;
        img.classList.add('img');
        cardHeader.appendChild(img);

        // Card Body (Resto de la información)
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const elements = {
          titulo: 'h3',
          descripcion: 'p',
          precio: 'span',
          cantidad: 'span',
          botonComprar: 'button',
        };

        for (const [key, value] of Object.entries(elements)) {
          elements[key] = document.createElement(value);
          cardBody.appendChild(elements[key]);
        }

        elements.titulo.innerHTML = product.nombre_producto;
        elements.descripcion.innerHTML = product.descripcion_producto;
        elements.precio.innerHTML = `$ ${product.precio_producto}`;
        elements.cantidad.innerHTML = product.cantidad_producto;
        elements.botonComprar.innerHTML = 'Comprar';

        elements.titulo.classList.add('card-title')
        elements.descripcion.classList.add('card-text');
        elements.botonComprar.classList.add('btn');
        elements.botonComprar.classList.add('btn-success')

        elements.botonComprar.addEventListener('click', () => mostrarModal(product));
        productList.appendChild(divCard);
        divCard.appendChild(cardHeader);
        divCard.appendChild(cardBody);
        cardBody.appendChild(elements.titulo);
        cardBody.appendChild(elements.descripcion);
        cardBody.appendChild(elements.precio);
        cardBody.appendChild(elements.cantidad);
        cardBody.appendChild(elements.botonComprar);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
const logoutButton = document.getElementById('btn-logout');
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('cliente');
    window.location.href = '/';
});

function mostrarModal(producto) {
  const id = producto.id_producto;
  modal.style.display = 'block';

  document.getElementById('btn-comprar').addEventListener('click', () => {

    comprar(id)
  });
}

function cerrarModal(){
  modal.style.display = "none";
}
function comprar(id) {
  cerrarModal();

  const idProducto = id;
  const cantidadInputValue = parseInt(cantidadInput.value, 10);

  // Obtén la cantidad actual del producto desde la base de datos
  const url = `http://localhost:3000/api/productos/${idProducto}`;
  fetch(url)
    .then(response => response.json())
    .then(producto => {
      // Calcula la nueva cantidad
      const nuevaCantidad = Math.max(0, producto.cantidad_producto - cantidadInputValue);

      // Actualiza la base de datos con la nueva cantidad
      const updateUrl = `http://localhost:3000/api/productos/${idProducto}`;
      const data = {
        cantidad_producto: nuevaCantidad,
      };

      return fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    })
    .then(response => response.json())
    .then(updatedProduct => {
      const id_cliente = localStorage.getItem('id_cliente');
      const precio = cantidadInputValue*updatedProduct.precio_producto
      realizarPedido(id_cliente, precio )
    })
    .catch(error => {
      console.error('Error al realizar la petición PATCH', error);
    });
}

const realizarPedido= async(id_cliente, precio)=>{
  const url = 'http://localhost:3000/api/pedidos';
  const datos = {
    cliente_pedido: id_cliente,
    distribuidor_pedido: id_distribuidor,
    fecha_hora: obtenerFechaHoraActual(),
    estado_pedido: "enviado",
    total_pagar_pedido: precio
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('Pedido realizado con éxito:', jsonResponse);
      location.reload();
    } else {
      console.error('Error al realizar el pedido:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error);
  }
}

function obtenerFechaHoraActual() {
  const fechaHora = new Date();
  const options = { timeZone: 'America/Mexico_City' }; // Zona horaria de México

  const año = fechaHora.getFullYear();
  const mes = agregarCeroDelante(fechaHora.getMonth() + 1);
  const dia = agregarCeroDelante(fechaHora.getDate());
  const horas = agregarCeroDelante(fechaHora.getHours());
  const minutos = agregarCeroDelante(fechaHora.getMinutes());
  const segundos = agregarCeroDelante(fechaHora.getSeconds());

  const fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

  console.log(fechaFormateada);

  return fechaFormateada;
}

function agregarCeroDelante(numero) {
  return numero < 10 ? `0${numero}` : numero;
}

document.getElementById('name_store').innerHTML= 'Bienvenidos a la tienda'
document.addEventListener('DOMContentLoaded', ()=>{
  obtenerFechaHoraActual();
})