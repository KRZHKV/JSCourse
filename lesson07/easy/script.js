'use strict';


let money;
let expensesAmount;
let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

let start = function () {
	do {
		money = prompt('Ваш ежемесячный доход?');
	} while (!isNumber(money));
	money = +money;
};

start();


let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 50000,
	period: 12,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function () {
		let addExpenses = prompt('Перечислите возможные расходы через запятую?');
		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
	},
	getExpensesMonth: function () {
		let expenses1, expenses2;
		let sum = 0;
		
		for (let i = 0; i < 2; i++) {

			if (i === 0) {
				expenses1 = prompt('Введите обязательную статью расходов', 'Продукты');
			} else if (i === 1) {
				expenses2 = prompt('Введите обязательную статью расходов', 'Транспорт');
			}
			do {
				sum = prompt('Во сколько вам это обойдется?');
			} while (!isNumber(sum));
			sum = +sum + +sum;

		}
		return sum;
	},

	// expensesAmount: getExpensesMonth(),
	getAccumulatedMonth: function () {
		return money - getExpensesMonth();
	},

	// accumulatedMonth: appData.getAccumulatedMonth(),


	getTargetMonth: function () {
		let sum = Math.round(appData.mission / appData.getAccumulatedMonth());
		if (sum < 0) {
			return console.log('Цель не будет достигнута');
		} else {
			return console.log('Цель будет достигнута за' + ' ' + sum + ' ' + 'месяцев');
		}
	},

	budgetDay: parseInt(appData.getAccumulatedMonth() / 30), //Вырезает из строки числа ТОЛЬКО ЦЕЛЫЕ
	
	getStatusIncome: function () {
		if (budgetDay > 1200) {
			return ('У вас высокий уровень дохода');
		} else if (budgetDay >= 600 && budgetDay <= 1200) {
			return ('У вас средний уровень дохода');
		} else if (budgetDay < 600 && budgetDay > 0) {
			return ('К сожалению, у вас уровень дохода меньше среднего');
		} else if (budgetDay <= 0) {
			return ('Что-то пошло не так');
		}
	}


}
appData.asking();
appData.getExpensesMonth();
console.log(appData);
console.log('Расходы за месяц' + ' ' + expensesAmount);
console.log('Бюджет на день' + ' ' + budgetDay);
console.log(getStatusIncome());