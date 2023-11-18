const productForm = document.getElementById('product-form');

    productForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nombre_producto = document.getElementById('product-name').value;
        const descripcion_producto = document.getElementById('product-description').value;
        const precio_producto = document.getElementById('product-price').value;
        const cantidad_producto = document.getElementById('product-store').value;
        const distribuidor_asociado = localStorage.getItem('id_distribuidor');
        console.log(distribuidor_asociado)
        const imagen_producto = document.getElementById('product-image').files[0];
        
        const datosProductos = new FormData();
    datosProductos.append('nombre_producto', nombre_producto);
    datosProductos.append('descripcion_producto', descripcion_producto);
    datosProductos.append('precio_producto', precio_producto);
    datosProductos.append('cantidad_producto', cantidad_producto);
    datosProductos.append('distribuidor_asociado', distribuidor_asociado);
    datosProductos.append('Imagen', imagen_producto);
        try {
            const response = await fetch('http://localhost:3000/api/productos', {
                method: 'POST',
                body: datosProductos,
            });
            const data = await response.json();
            // Manejar la respuesta de la API aquí
            console.log(data);
            location.reload();
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    });

    