// "use strict"

// const employees = [
//     {id: 1, name:'Alice',department:'Sales',salary:98_000},
//     {id: 2, name:'Bob',department:'Marketing',salary:96_000},
//     {id: 5, name:'Eve',department:'Sales',salary:94_000},
//     {id: 3, name:'Charlie',department:'Sales',salary:85_000},
//     {id: 4, name:'David',department:'Marketing',salary:70_000}
// ];

// class AdvancedArray extends Array{
//     constructor(arr,department) {
//         super();
//         this.arr = arr;
//         this.department = department;
//     }
//     sum(){
//         return this.arr.reduce((sum,item)=>{
//             return this.department === item.department ? sum + item.salary : sum
//         },0)
//     }

// }

// const advansertArray = new AdvancedArray(employees,'Sales');
// const sumSales = advansertArray.sum();
// console.log(sumSales);

// let a = 3;
// console.log(getType.a)


let input = [1,2,3,4,5,6,7,8,9,10];



let shufle = function(arr){
    let res = [];
    for(let i = arr.length-1; i > 0; i--){
        if(i <= arr[i] === 4){
        let tmp = arr[i];
        let rnd = Math.floor(Math.random() * i+1);
        arr[i] = arr[rnd];
        arr[rnd] = tmp;
        res.push(tmp)
        }
    }     
    return res
}

for(let i = 0; i < 10; i++){
    console.log(shufle(input).join(','))
}