fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        console.log('Publicación:', data);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });