function allPassed(students){
    return students.every(student=> student.grade>70);
}
let gStudents = [
    {name:"S1" , grade:90},
    {name:"S2" , grade:85}
];            
// console.log(allPassed(gStudents));

function isGameOn(players){
    return players.some(player=> player.isAlive);
}
let gPlayers = [
    {name:"G1" , isAlive:false},
    {name:"G2" , isAlive:true}
];        
// console.log(isGameOn(gPlayers));

function isMatrix(arr2d){
    const firstrow=arr2d[0];
    return arr2d.every((row)=> row.length ===firstrow.length)
}
let gMat = [
    [1,2],
    [3,4],
    [5,6]
];        
// console.log(isMatrix(gMat));

function isWide(arr2d){
    const firstrow=arr2d[0];
    return arr2d.some((row)=> row.length >=5)
}
// console.log(isWide(gMat));


function positiveRowsOnly(mat){
   return mat.filter(row=> row.every(num=> num>0));
}

let gMatPosNeg = [
    [1, 10, -100],
    [2, -20, 200],
    [3, 30, 300],
];

console.log(positiveRowsOnly(gMatPosNeg));
