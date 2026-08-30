function onlyOneWord(strs){
    return strs.filter(str=> !str.trim().includes(''))
}