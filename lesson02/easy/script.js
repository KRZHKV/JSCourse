let money = 200000;
let income = '50000';
let addExpenses = 'Такси, Фастфуд, ЖКХ, Шоколадки';
let deposit = true;
let mission = 80000000;
let period = 8;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);