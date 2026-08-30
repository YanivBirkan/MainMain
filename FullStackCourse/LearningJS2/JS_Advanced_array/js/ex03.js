function  capitalizeLongerThan5(strs){
    return strs
        .map(str=>(str.length>5 )? str.charAt(0).toUpperCase()+str.slice(1) :str);
        
}
console.log(capitalizeLongerThan5(['abcdefg','xyz']))

