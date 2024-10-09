function transformarObjetoEnArray(obj) {
    const resultado = [];
    const claves = Object.keys(obj);

    for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];
        resultado.push([clave, obj[clave]]); 
    }

    return resultado;
}


const objeto = { a: 1, b: 2 };
const resultado = transformarObjetoEnArray(objeto);

console.log(resultado); 

const objeto1 = { shrimp: 15, tots: 12 };
const resultado1 = transformarObjetoEnArray(objeto1);

console.log(resultado1); 

const objeto2 = {};
const resultado2 = transformarObjetoEnArray(objeto2);

console.log(resultado2); 