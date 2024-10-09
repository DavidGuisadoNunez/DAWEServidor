function invertirObjeto(obj) {
    const nuevoObjeto = {};
    const claves = Object.keys(obj); 

    for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];
        nuevoObjeto[obj[clave]] = clave; 
    }

    return nuevoObjeto;
}


const objetoOriginal = { "z": "q", "w": "f" };
const objetoInvertido = invertirObjeto(objetoOriginal);

console.log(objetoInvertido); 

const objetoOriginal2 = { "a": 1, "b": 2, "c": 3 };
const objetoInvertido2 = invertirObjeto(objetoOriginal2);

console.log(objetoInvertido2); 

const objetoOriginal3 = { "zebra": "koala", "horse": "camel" };
const objetoInvertido3 = invertirObjeto(objetoOriginal3);

console.log(objetoInvertido3); 