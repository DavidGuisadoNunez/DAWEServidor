const fetch = require('node-fetch');

/*fetch(url)
.then(response => response.json())
.then(data => console.log(data));*/

async function get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
    /*return fetch(url)
    .then(response => response.json())
    .then(data => data);*/
};

async function init() {
    const url = 'https://reqres.in/api/users?page=2';
    const data = await get('https://reqres.in/api/users?page=2');
    const data2 = await get('https://reqres.in/api/users?page=3');
    console.log(data);
    console.log(data2);
}

init();