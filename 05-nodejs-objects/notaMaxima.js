function obtenerNotaMaxima(alumnos) {
    return alumnos.map(alumno => {
        const topNote = Math.max(...alumno.notes); 
        return {
            name: alumno.name,
            topNote: topNote
        };
    });
}

const alumnos = [
    { name: 'John', notes: [3, 5, 4] },
    { name: 'Jane', notes: [2, 8, 6] },
    { name: 'Doe', notes: [5, 3, 7] }
];

const resultado = obtenerNotaMaxima(alumnos);
console.log(resultado);