document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch("/api/distribuidores", {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "/store";
            }
        })
        .catch(error => {
            console.log(error)
        });
})