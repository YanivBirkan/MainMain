let gMat =[[1,2,3],
            [4,5,6],
            [7,8,9]];

function doubleMatrix(mat){
    return mat.map(row => row.map(num => num *2));
}

console.log(doubleMatrix(gMat))
