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
	incomeTitle = document.querySelector('.income-title'),
	expensesTitle = document.querySelector('.expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	expensesItem = document.querySelector('.additional_expenses-item'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	cancel = document.querySelector('#cancel'),
	incomeItems = document.querySelectorAll('.income-items');




function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(str) {
	if (str !== null && !isNumber(str) && str !== '') {
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
	start: function () {


		if (salaryAmount.value === '') {
			alert('Ошибка, поле Месячный доход должно быть заполнено!');
			return;
		}
		this.budget = salaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.calcSavedMoney();
		this.showResult();

	},
	showResult: function () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		addictionalExpensesValue.value = this.addExpenses.join(', ');
		addictionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
	},
	changePeriod: function () {
		periodAmount.innerHTML = periodSelect.value;
	},
	addExpensesBlock: function () {
		console.log(expensesItems.parentNode);
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			expensesAdd.style.display = 'none';
		}
	},
	addIncomeBlock: function () {
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			incomeAdd.style.display = 'none';
		}
	},
	getExpenses: function () {
		expensesItems.forEach(function (item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = cashExpenses;
			}
		}, this);
	},
	getIncome: function () {

		incomeItems.forEach(function (item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = +cashIncome;
				this.incomeMonth = +cashIncome;
			}
		}, this);
	},
	getAddExpenses: function () {
		let addExpenses = expensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		}, this);
	},
	getAddIncome: function () {
		incomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		}, this);
	},
	getExpensesMonth: function () {
		for (let key in appData.expenses) {
			this.expensesMonth = +appData.expensesMonth + +this.expenses[key];
		}
		return this.expensesMonth;
	},
	getBudget: function () {
		this.budgetMonth = +this.budget + +this.incomeMonth - +this.expensesMonth;
		this.budgetDay = parseInt(this.budgetMonth / 30);

	},
	getTargetMonth: function () {
		let sum = Math.round(targetAmount.value / this.budgetMonth);
		return sum;

	},
	getStatusIncome: function () {
		if (this.budgetDay > 1200) {
			return ('У вас высокий уровень дохода');
		} else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
			return ('У вас средний уровень дохода');
		} else if (this.budgetDay < 600 && this.budgetDay > 0) {
			return ('К сожалению, у вас уровень дохода меньше среднего');
		} else if (this.budgetDay <= 0) {
			return ('Что-то пошло не так');
		}
	},
	getInfoDeposit: function () {
		if (this.deposit) {
			do {
				this.percentDeposit = prompt('Какой у вас годовой процент?', 10);
			} while (!isNumber(this.percentDeposit));
			do {
				this.moneyDeposit = prompt('Какая сумма заложена?', 20000);
			} while (!isNumber(this.moneyDeposit));
		}
	},
	calcSavedMoney: function () {
		return this.budgetMonth * periodSelect.value;
	},
	freezeMenu: function () {
		start.style.display = 'none';
		cancel.style.display = 'block';
		let allInput = document.querySelectorAll('input[type=text]');
		allInput.forEach(function (item) {
			item.disabled = true;
		});
	},
	resetMenu: function () {
		cancel.style.display = 'none';
		start.style.display = 'block';
		let allInput = document.querySelectorAll('input[type=text]');
		allInput.forEach(function (item) {
			item.value = '';
			item.disabled = false;
		});

	}

}


// console.log('Наша программа включает в себя данные');
// let showStatus = function() {
// 	for ( let key in appData) {
// 		console.log(key + " " + appData[key]);
// 	}
// }
// // showStatus();
appData.getInfoDeposit();


start.addEventListener('click', appData.start.bind(appData));
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);


start.disabled = true;

salaryAmount.addEventListener('input', function () {
	if (salaryAmount.value === '') {
		start.disabled = true;
	} else {
		start.disabled = false;
	}

});

start.addEventListener('click', appData.freezeMenu);
cancel.addEventListener('click', appData.resetMenu);

