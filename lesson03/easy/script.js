'use strict';

let money = '200000';
let income = '50000';
let addExpenses = 'Такси, Фастфуд, ЖКХ, Шоколадки';
let deposit = true;
let mission = 800000;
let period = 8;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase().split(', '));

money = +prompt('Ваш ежемесячный доход?');

addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько вам это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько вам это обойдется?');

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц' + ' ' + budgetMonth);

let missionDone = Math.round(mission / budgetMonth);
console.log('Цель будет достигнута за' + ' ' + missionDone + ' ' + 'месяцев');

let budgetDay = parseInt(budgetMonth / 30); //Вырезает из строки числа ТОЛЬКО ЦЕЛЫЕ
console.log('Бюджет на день' + ' ' + budgetDay);

if(budgetDay > 1200) {
	console.log('У вас высокий уровень дохода');
} else if(budgetDay >= 600 && budgetDay <= 1200) {
	console.log('У вас средний уровень дохода');
} else if(budgetDay < 600 && budgetDay > 0) {
	console.log('К сожалению, у вас уровень дохода меньше среднего');
} else if(budgetDay <= 0) {
	console.log('Что-то пошло не так');
}