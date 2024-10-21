fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(user => {
            console.log('Nombre:', user.name);
        });
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });