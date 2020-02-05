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
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
				appData.expensesMonth = appData.expensesMonth + appData.expenses[key];
		}
		return appData.expensesMonth;
	},
	getBudget: function() {
			appData.budgetMonth = money - appData.expensesMonth;
			appData.budgetDay = parseInt(appData.budgetMonth / 30);
		
	},
	getTargetMonth: function() {
		let sum = Math.round(appData.mission / appData.budgetMonth);
		if (sum < 0) {
			return ('Цель не будет достигнута');
		} else  {
			return ('Цель будет достигнута за' + ' ' + sum + ' ' + 'месяцев');
		}
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
appData.asking();
appData.getBudget();
console.log(appData.getExpensesMonth());
console.log(appData.expensesMonth);
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные');
let showStatus = function() {
	for ( let key in appData) {
		console.log(key + " " + appData[key]);
	}
	
}
showStatus();










// let accumulatedMonth = appData.getAccumulatedMonth();
// getTargetMonth();
