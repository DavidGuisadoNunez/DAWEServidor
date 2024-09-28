let n = 15, a = 0, b = 1, suma;
console.log(a);
for(let i = 1; i < n; i++){
    console.log(b);
    suma = a + b;
    a = b;
    b = suma;
}