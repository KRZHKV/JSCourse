'use strict';

let word = prompt('Введите слово!', 'маааам');

console.log(word);

let newWord = word.split('').reverse().join('');

console.log(newWord);

let leng = (newWord.length - 1);

console.log(leng);
function checkword() {
  for(let i = 0; i <= leng; i++){
    if(newWord[i] !== newWord[leng - i]) {
      return false;
   }
}
}
console.log(checkword());