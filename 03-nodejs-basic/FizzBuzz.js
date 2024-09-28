for(let i=0; i<=100; i++){
    if(i % 3 === 0 && i % 5 === 0){
        console.log( i + ': Fizzbuzz');
    } else if(i % 3 === 0){
        console.log(i + ': Fizz');
    } else if(i % 5 === 0){
        console.log(i + ': Buzz');
    } else{
        console.log(i + ': No es múltiplo de 3 ni de 5.');
    }
}