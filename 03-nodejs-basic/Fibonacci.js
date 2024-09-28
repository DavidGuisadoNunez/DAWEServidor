let n = 15, a = 0, b = 1, temp;
console.log(a);
for(let i = 1; i < n; i++){
    console.log(b);
    temp = a + b;
    a = b;
    b = temp;
}