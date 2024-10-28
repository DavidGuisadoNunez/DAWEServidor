import fetch from 'node-fetch';

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();

    // Extraer propiedades
    console.log(data.title); // Imprime el título
    console.log(data.body);  // Imprime el cuerpo
}

debugger;
fetchData();