document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const nombre_cliente = document.getElementById('nombre_cliente').value;
    const correo_cliente = document.getElementById('correo_cliente').value;
    const direccion_cliente = document.getElementById('direccion_cliente').value;
    const telefono_cliente = document.getElementById('telefono_cliente').value;

    const data = {
        user,
        password,
        nombre_cliente,
        correo_cliente,
        direccion_cliente,
        telefono_cliente
    };

    fetch("/api/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "/store";
        }
    })
    .catch(error => {
        console.log(error)
    });
});