import fetch from 'node-fetch';

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data); // Imprime el objeto recibido

    // Inspecciona el objeto data
    console.log('Title:', data.title); // Imprime el título
    console.log('Body:', data.body); // Imprime el cuerpo
}

debugger; // Este es el punto de interrupción
fetchData();