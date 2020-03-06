'use strict';
//  Задание 1
const arr = ['3212','4982100', '8999', '212122988' ,'1', '5544', '23'];

for(let i = 0; i < arr.length; i++) {
    if(arr[i][0] === '2' || arr[i][0] === '4') {
        console.log(arr[i]);
    };
};


//Задание 2

let n = 100;
nextPrime:
for (let i = 2; i <= n; i++) { // Для всех i...

  for (let j = 2; j < i; j++) { // проверить, делится ли число..
    if (i % j == 0) continue nextPrime; // не подходит, берём следующее
  }

  console.log( i ); // простое число
}

