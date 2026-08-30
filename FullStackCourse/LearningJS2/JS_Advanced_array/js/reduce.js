var emps = [
 {
 name: 'Joe Schmoe',
 yearsExperience: 5,
 department: 'IT'
 },
 {
 name: 'Sally Sallerson',
 yearsExperience: 15,
 department: 'Engineering'
 },
 {
 name: 'Bill Billson',
 yearsExperience: 5,
 department: 'Engineering'
 },
 {
 name: 'Jane Janet',
 yearsExperience: 15,
 department: 'Management'
 },
 {
 name: 'Bob Hope',
 yearsExperience: 9,
 department: 'IT'
 }
];

function sumAllExperience(){
    return emps.reduce((acc,employe) =>{
        acc+employe.yearsExperience;
        
        return acc
    },0)
}

function collectiveExperience(){
    const collectiveExp = emps.reduce((acc,employe) =>{
        if(!acc[employe.department]) acc[employe.department]=0;
        acc[employe.department]+=employe.yearsExperience;
        return acc
    },{});
    return collectiveExp
}

function countEmpsInDepartment(){
    const depNums= emps.reduce((acc,emp)=>{
        if(!acc[emp.department]) acc[emp.department]=0;
        acc[emp.department]++;
        return acc
    },{});
    return depNums
}

console.log(countEmpsInDepartment())
// console.log(sumAllExperience())






// let gValues = [1,1,1,2,3,4,4,4,4,4,5,6,7,8,8];

// function findModes(Values){
//     let countMap = getCountMap(Values);
//     let maxOccur =0;
//     let modeNUms=[];
//     for (const num in countMap) {
//         if(countMap[num]>maxOccur){
//             maxOccur=countMap[num];
//             modeNUms=[num]
//         }
//         else if(countMap[num]===maxOccur){
//             modeNUms.push(num)
//         }
//     }
//     return {nums:modeNUms ,frequency:maxOccur}
// }

// function getCountMap(Values){
//     let newMap = Values.reduce((acc,num)=>{
//         if(!acc[num]) acc[num] = 0;
//         acc[num]++;
//         return acc
//     },{});
//     return newMap
// }
// console.log(findModes(gValues))