let texto = "xxooxxoxoo";
let x = texto.split("x").length - 1;
let o = texto.split("o").length - 1;

if(x === o){
    console.log(true);
}else {
    console.log(false);
}
