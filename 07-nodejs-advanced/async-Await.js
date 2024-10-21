async function obtenerNombres() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        const data = await response.json();
        data.forEach(user => {
            console.log('Nombre:', user.name);
        });
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

obtenerNombres();