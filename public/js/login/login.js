const cliente = localStorage.getItem('cliente');
const distribuidor = localStorage.getItem('distribuidor');

if(cliente){
    window.location.href='/store'
}
if(distribuidor){
    window.location.href = '/dashDis'
}

document.getElementById('button').addEventListener('click', function (event) {
    event.preventDefault();

    // Obtén el valor del radio input seleccionado ("cliente" o "distribuidor")
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Obtén los valores de nombre de usuario y contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Crea un objeto con los datos a enviar
    const formData = {
        username: username,
        password: password,
    };
    let ruta = "";
    // Define la ruta adecuada para enviar la solicitud POST al servidor
    if (userType === 'cliente') {
        ruta = `/api/loginC`;
    } else {
        ruta = `/api/loginD`
    }

    // Envía los datos al servidor a través de una solicitud fetch
    fetch(ruta, {
        method: 'POST', // Debería ser POST en lugar de GET
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('Credenciales no encontradas');
        }
    }).then(data => {
        if (data) {
            if (userType === 'cliente') {
                localStorage.setItem('cliente', 'true');
                localStorage.setItem('id_cliente', data.id_cliente);
                window.location.href = '/store';
            } else {
                localStorage.setItem('distribuidor', 'true');
                localStorage.setItem('id_distribuidor', data.id_distribuidor);
                window.location.href = '/dashDis'
            }
        }
    })
    .catch(error => {
        console.error('Error en la solicitud fetch:', error);
    });
});
