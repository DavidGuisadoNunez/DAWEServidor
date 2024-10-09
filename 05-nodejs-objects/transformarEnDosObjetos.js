function transformarObjeto(obj) {
    const claves = Object.keys(obj); 
    const valores = Object.values(obj); 
    return [claves, valores]; 
}


const objeto = { a: 1, b: 2, c: 3 };
const resultado = transformarObjeto(objeto);

console.log(resultado);

const objeto2 = { a: "Apple", b: "Microsoft", c: "Google" };
const resultado2 = transformarObjeto(objeto2);

console.log(resultado2);

const objeto3 = { key1: true, key2: false, key3: undefined };
const resultado3 = transformarObjeto(objeto3);

console.log(resultado3);