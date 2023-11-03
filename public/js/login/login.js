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
    })
        .then(response => {
            if (response.ok) {
                console.log('Inicio de sesión exitoso');
                if (userType == 'cliente') {
                    window.location.href = '/store'
                } else {
                    alert('pronto dashboard')
                }
            } else {
                alert('Credenciales no encontradas')
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
});
