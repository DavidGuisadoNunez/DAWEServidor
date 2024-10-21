const promise = new Promise(function (resolve, reject) {
    resolve('Success!');
    // or
    // reject ("Error!");
});

promise.then(function (value) {
    console.log(value); // Success!
}, function (reason) {
    console.log(reason); // Error!
});