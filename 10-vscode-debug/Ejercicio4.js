import fetch from 'node-fetch';

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
}

debugger; // Punto de interrupción
fetchData();