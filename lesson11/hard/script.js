'use strict';

let start = document.getElementById('start'),
	btnPlus = document.getElementsByTagName('button'),
	incomeAdd = btnPlus[0],
	expensesAdd = btnPlus[1],
	checkDeposit = document.querySelector('#deposit-check'),
	incomeItem = document.querySelectorAll('.additional_income-item'),
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	addictionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	addictionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),
	expensesTitle = document.querySelectorAll('.expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	cancel = document.querySelector('#cancel'),
	expensesItem = document.querySelector('.additional_expenses-item'),
	incomeItems = document.querySelectorAll('.income-items'),
	incomeTitle = document.querySelectorAll('.income-title'),
	incomeAmount = document.querySelectorAll('.income-amount'),
	expensesAmount = document.querySelectorAll('.expenses-amount');



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
	incomeMonth: 0,
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	start: function() {
		
	
		if(salaryAmount.value === '') {
			alert('Ошибка, поле Месячный доход должно быть заполнено!');
			return;
		}
		appData.budget = salaryAmount.value;

		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();
		appData.showResult();
		
	},
	showResult: function() {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		addictionalExpensesValue.value = appData.addExpenses.join(', ');
		addictionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = appData.getTargetMonth();
		let checkPeriod = document.addEventListener('input', function() {
			incomePeriodValue.value = appData.calcSavedMoney();
		});
	},
	changePeriod: function() {
		periodAmount.innerHTML = periodSelect.value;
	},
	addExpensesBlock: function() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		let inputExpense = cloneExpensesItem.querySelectorAll('input');
		inputExpense.forEach( (elem) => {
			elem.value = '';
		});
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');

		if(expensesItems.length === 3) {
			expensesAdd.style.display = 'none';
		}
	},
	addIncomeBlock: function() {
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		let inputIncome = cloneIncomeItem.querySelectorAll('input');
		inputIncome.forEach( (elem) => {
			elem.value = '';
		});
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
		incomeItems = document.querySelectorAll('.income-items');

		if(incomeItems.length === 3) {
			incomeAdd.style.display = 'none';
		}
	},
	getExpenses: function() {
		expensesItems.forEach(function(item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if(itemExpenses !== '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});
	},
	getIncome: function() {

		incomeItems.forEach(function(item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if(itemIncome !== '' && cashIncome !=='') {
				appData.income[itemIncome] = +cashIncome;
				appData.incomeMonth = +cashIncome;		
			}
		});
	},
	getAddExpenses: function() {
		let addExpenses = expensesItem.value.split(',');
		addExpenses.forEach(function(item) {
			item = item.trim();
			if (item !== '') {
				appData.addExpenses.push(item);
			}
		});
	},
	getAddIncome: function() {
		incomeItem.forEach(function(item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				appData.addIncome.push(itemValue);
			}
		});
	},
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
				appData.expensesMonth = +appData.expensesMonth + +appData.expenses[key];
		}
		return appData.expensesMonth;
	},
	getBudget: function() {
			appData.budgetMonth = +appData.budget + +appData.incomeMonth - +appData.expensesMonth;
			appData.budgetDay = parseInt(appData.budgetMonth / 30);
		
	},
	getTargetMonth: function() {
		let sum = Math.round(targetAmount.value / appData.budgetMonth);
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
		return appData.budgetMonth * periodSelect.value;
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
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);


start.disabled = true;

salaryAmount.addEventListener('input', function() {
	salaryAmount.value = salaryAmount.value.replace(/[\D]/ig, '');
	if (salaryAmount.value === '') {
		start.disabled = true;
	} else {
		start.disabled = false;
	}
});

expensesAmount.forEach( (elem) => {
	elem.addEventListener('input', (elem) => {
		elem.target.value = elem.target.value.replace(/[\D]/ig, '');
	});
});
incomeAmount.forEach( (elem) => {
	elem.addEventListener('input', (elem) => {
		elem.target.value = elem.target.value.replace(/[\D]/ig, '');
	});
});
targetAmount.addEventListener('input', () => {
	targetAmount.value = targetAmount.value.replace(/[\D]/ig, '');
});
incomeTitle.forEach( (elem) => {
	elem.addEventListener('input', (elem) => {
		elem.target.value = elem.target.value.replace(/[^А-я]/ig, '');
	})
});
expensesTitle.forEach( (elem) => {
	elem.addEventListener('input', (elem) => {
		elem.target.value = elem.target.value.replace(/[^А-я]/ig, '');
	})
});
incomeItem.forEach( (elem) => {
	elem.addEventListener('input', (elem) => {
		elem.target.value = elem.target.value.replace(/[^А-я]/ig, '');
	})
});

expensesItem.addEventListener('input', (elem) => {
	expensesItem.value = expensesItem.value.replace(/[^А-я]/ig, '');
});