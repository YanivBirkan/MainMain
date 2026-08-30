function reverseAll(strs){
    return strs.map(str=>str.split("").reverse().join(""))
}

console.log(reverseAll(["abc" , "cde"]))