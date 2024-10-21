const promise = new Promise((resolve, reject) => {
    resolve('Success!');
    // or
    // reject ("Error!");
});

promise
    .then((value) => console.log(value))
    .catch((reason) => console.log(reason));