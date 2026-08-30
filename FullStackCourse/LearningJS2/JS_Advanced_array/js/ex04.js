function onlyVowels(strs){
    return strs.map(filterOnlyVowels(str))
}

function filterOnlyVowels(str){
    return str.split("").filter(isVowel.join(''))
}
function isVowel(ch){
    let vowels="aeiou";
    return vowels.includes(ch)
}