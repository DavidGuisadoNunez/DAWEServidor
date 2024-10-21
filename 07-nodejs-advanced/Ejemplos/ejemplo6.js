function timeout(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve(x);
        }, x);
    });
}

async function init() {

    const promises = [];
    const results = [];
    //First loop, array creation
    for (let i = 0; i < 20; i++) {
        const promise = await timeout(i * 100).then(x => results.push({
            index: i,
            timeout: x
        }));
        promises.push(promise);
    }
    /*Promise.all(promises).then(() => {
    });*/
    console.log(results);
}

init();