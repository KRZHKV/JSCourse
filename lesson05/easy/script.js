'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
let income = 'Фриланс, подработка';
let addExpenses = prompt('Перечислите возможные расходы через запятую?');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 800000;
let period = 8;

let start = function() {
	do {
		money = prompt('Ваш ежемесячный доход?');
	} while (!isNumber(money));	
};


start();


let showTypeOf = function(data) {
	console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));


let expenses1, expenses2;

let getExpensesMonth = function() {
	let sum = 0;

	for( let i = 0; i < 2; i++) {

		if (i === 0) {
			expenses1 = prompt('Введите обязательную статью расходов', 'Продукты');
		} else if ( i === 1) {
			expenses2 = prompt('Введите обязательную статью расходов', 'Транспорт');
		}
		do {
			sum = prompt('Во сколько вам это обойдется?');
		}while(!isNumber(sum));
		sum = +sum + +sum;
		
	}
	console.log(sum);
	return sum;
}



let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц' + ' ' + expensesAmount);
let getAccumulatedMonth = function() {
	return money - expensesAmount;
}

let getTargetMonth = function() {
	let sum = Math.round(mission / accumulatedMonth);
	if (sum < 0) {
		return console.log('Цель не будет достигнута');
	} else  {
		return console.log('Цель будет достигнута за' + ' ' + sum + ' ' + 'месяцев');
	}
}

getAccumulatedMonth();
let accumulatedMonth = getAccumulatedMonth();
getTargetMonth();


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