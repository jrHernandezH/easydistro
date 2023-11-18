document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch("/api/distribuidores", {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            if(data) {
                localStorage.setItem('distribuidor', 'true');
                console.log(data.id);
                localStorage.setItem('id_distribuidor', data.id);
                window.location.href = '/dashDis'
            }
        })
        .catch(error => {
            console.log(error)
        });
})