'use strict';

let money = 200000;
let income = '50000';
let addExpenses = 'Такси, Фастфуд, ЖКХ, Шоколадки';
let deposit = true;
let mission = 800000;
let period = 8;

let showTypeOf = function(data) {
	console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

money = +prompt('Ваш ежемесячный доход?');
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько вам это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько вам это обойдется?');


let getExpensesMonth = function() {
	return amount1 + amount2;
}

let getAccumulatedMonth = function() {
	return money - getExpensesMonth(amount1, amount2);
}

let getTargetMonth = function() {
	let sum = mission / accumulatedMonth;
	return console.log(sum);
}

console.log(getExpensesMonth());
getAccumulatedMonth();
let accumulatedMonth = getAccumulatedMonth();
getTargetMonth();

let missionDone = Math.round(mission / accumulatedMonth);
console.log('Цель будет достигнута за' + ' ' + missionDone + ' ' + 'месяцев');

let budgetDay = parseInt(accumulatedMonth / 30); //Вырезает из строки числа ТОЛЬКО ЦЕЛЫЕ
console.log('Бюджет на день' + ' ' + budgetDay);

let getStatusIncome = function() {
	if(budgetDay > 1200) {
		return ('У вас высокий уровень дохода');
	} else if(budgetDay >= 600 && budgetDay <= 1200) {
		return ('У вас средний уровень дохода');
	} else if(budgetDay < 600 && budgetDay > 0) {
		return ('К сожалению, у вас уровень дохода меньше среднего');
	} else if(budgetDay <= 0) {
		return ('Что-то пошло не так');
	}
}

console.log(getStatusIncome());