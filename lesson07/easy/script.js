'use strict';

let money;

let start = function() {
	do {
		money = prompt('Ваш ежемесячный доход?');
	} while (!isNumber(money));	
};


start();

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 150000,
	period: 3,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function() {
		let addExpenses = prompt('Перечислите возможные расходы через запятую?');
		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
			let sum = 0, question, expense;
		
			for( let i = 0; i < 2; i++) {
					expense = prompt('Введите обязательную статью расходов', 'Продукты');
				do {
					question = +prompt('Во сколько вам это обойдется?');
				}while(!isNumber(question));
				appData.expenses[expense] = question;
			}
			return sum;
	},
	
	getAccumulatedMonth: function() {
		return money - appData.getExpensesMonth();
	},
	getTargetMonth: function() {
		let sum = Math.round(appData.mission / appData.accumulatedMonth());
		if (sum < 0) {
			return console.log('Цель не будет достигнута');
		} else  {
			return console.log('Цель будет достигнута за' + ' ' + sum + ' ' + 'месяцев');
		}
	},
	budgetDay: function() {
		let sum = parseInt(appData.getAccumulatedMonth() / 30);
		return sum;
	},
	getStatusIncome: function() {
		if(appData.budgetDay > 1200) {
			return ('У вас высокий уровень дохода');
		} else if(appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
			return ('У вас средний уровень дохода');
		} else if(appData.budgetDay < 600 && appData.budgetDay > 0) {
			return ('К сожалению, у вас уровень дохода меньше среднего');
		} else if(appData.budgetDay <= 0) {
			return ('Что-то пошло не так');
		}
	}



}
console.log(appData);
appData.asking();













// let accumulatedMonth = appData.getAccumulatedMonth();
// getTargetMonth();
