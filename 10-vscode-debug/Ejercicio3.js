import fetch from 'node-fetch'; 

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data); // Imprime el objeto recibido

    // Puedes modificar la variable aquí:
    data.modified = "Nuevo valor"; // Esto es solo un ejemplo
    console.log(data);
}

debugger; // Este es el punto de interrupción
fetchData();