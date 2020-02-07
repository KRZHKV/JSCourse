'use strict';

let start = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button');
let incomeAdd = btnPlus[0];
let expensesAdd = btnPlus[1];

let checkDeposit = document.querySelector('#deposit-check');

let incomeItem = document.querySelectorAll('.additional_income-item')

let valueElm = document.getElementsByClassName('result-total');

let salaryAmount = document.querySelector('.salary-amount');

let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let cancel = document.querySelector('#cancel');


let money;


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function isString(str) {
	if (str !== null && !isNumber(str) && str !== ''){ 
		return str;
	}
	return;
}

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 150000,
	period: 3,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	start: function() {
		
		if(salaryAmount.value === '') {
			alert('Поле должно быть заполнено!');
			return;
		}

		appData.budget = salaryAmount.value;
		appData.asking();
		appData.getBudget();
		appData.getExpensesMonth();
	},
	addExpensesBlock: function() {
		let expensesItems = document.querySelectorAll('.expenses-items');
		console.log(expensesItems.parentNode);
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);

		if(expensesItems.length === 3) {
			expensesAdd.style.display = 'none';
		}
	},
	asking: function() {
		let cashIncome, itemIncome;
		if(confirm('Есть ли у вас дополнительный источник заработка?')) {
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
			} while (!isString(itemIncome));
			do {
			cashIncome = prompt('Сколько в месяц вы на этом зарабатывете?', '10000');
			} while (!isNumber(cashIncome));
			appData.income[itemIncome] = cashIncome;
		}

		let addExpenses = prompt('Перечислите возможные расходы через запятую?');
		appData.addExpenses = addExpenses.toLowerCase().split(', ').map(function(word) {
			return word[0].toUpperCase() + word.substr(1);
		});
		
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
			let sum = 0, question, expense;
		
			for( let i = 0; i < 2; i++) {
				do {
					expense = prompt('Введите обязательную статью расходов', 'Продукты');
				} while (!isString(expense));
				do {
					question = prompt('Во сколько вам это обойдется?', 5000);
				}while (!isNumber(question));
				question = +question;
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
			appData.budgetMonth = appData.budget - appData.expensesMonth;
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
	},

	getInfoDeposit: function() {
		if(appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой у вас годовой процент?', 10);
			} while (!isNumber(appData.percentDeposit));
			do {
				appData.moneyDeposit = prompt('Какая сумма заложена?', 20000);
			} while (!isNumber(appData.moneyDeposit));
		}
	},
	calcSavedMoney: function() {
		return appData.budgetMonth * appData.period;
	}

}


console.log('Наша программа включает в себя данные');
let showStatus = function() {
	for ( let key in appData) {
		console.log(key + " " + appData[key]);
	}
	
}
// showStatus();
appData.getInfoDeposit();


start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);



// let accumulatedMonth = appData.getAccumulatedMonth();
// getTargetMonth();
