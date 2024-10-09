function isSimilar(arrX, arrY) {

    if (arrX.constructor.name !== arrY.constructor.name) return false;


    if (arrX.constructor.name === "Array") {

        if (arrX.length !== arrY.length) return false;

        return arrX.every((item, i) => {

            if (["Object", "Array"].includes(item.constructor.name)) {
                return isSimilar(item, arrY[i]);
            }

            return item === arrY[i];
        });
    }


    if (arrX.constructor.name === "Object") {

        const keysX = Object.keys(arrX);
        const keysY = Object.keys(arrY);
        if (keysX.length !== keysY.length) return false;

        return keysX.every(key => {

            if (["Object", "Array"].includes(arrX[key].constructor.name)) {
                return isSimilar(arrX[key], arrY[key]);
            }

            return arrX[key] === arrY[key];
        });
    }
    return true;
}


console.log(isSimilar([1, 2, { a: 3 }], [1, 2, { a: 3 }]));
console.log(isSimilar([1, 2, { a: 3 }], [1, 2, { a: 4 }]));
console.log(isSimilar({ a: 1, b: 2 }, { a: 1, b: 2 }));
console.log(isSimilar({ a: 1, b: 2 }, { a: 1, b: 3 }));
console.log(isSimilar([1, 2, 3], { a: 1, b: 2 }));         