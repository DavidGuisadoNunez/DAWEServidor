// Este es el total de segundos que se quiere optimizar en semanas, días, horas, minutos y segundos.
var segundos = 199789;

// Hacemos todos los cálculos
var semanas = Math.floor(segundos / (7 * 24 * 60 * 60));
var dias = Math.floor((segundos % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
var horas = Math.floor((segundos % (24 * 60 * 60)) / (60 * 60));
var minutos = Math.floor((segundos % (60 * 60)) / 60);
var segundosRestantes = segundos % 60;

// Pintamos en consola el resultado total
console.log(`El total es ${segundos} segundos, ${minutos} minutos, ${horas} horas, ${días} días y ${semanas} semanas.`);

