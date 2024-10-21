function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('resolve');
            resolve('resolve');
        }, ms);
    });
}

function init() {
    console.log('1');
    sleep(1000);
    console.log('2');
}

/*async function init(){
console.log('1');
await sleep(1000);
console.log('2');
}*/

init();
console.log('3');