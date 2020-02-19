'use strict';

let startBtn = document.getElementById('start'),
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
	cancelBtn = document.querySelector('#cancel'),
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

const AppData = function () {
	this.income = {};
	this.addIncome = [];
	this.incomeMonth = 0;
	this.expenses = {};
	this.addExpenses = [];
	this.deposit = false;
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.expensesMonth = 0;
}

AppData.prototype.start = function () {

		if (salaryAmount.value === '') {
			alert('Ошибка, поле Месячный доход должно быть заполнено!');
			return;
		}
		this.budget = +salaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getIncomeMonth();
		this.getBudget();
		this.calcSavedMoney();
		this.showResult();

};
AppData.prototype.showResult = function () {
	budgetMonthValue.value = this.budgetMonth;
	budgetDayValue.value = this.budgetDay;
	expensesMonthValue.value = this.expensesMonth;
	addictionalExpensesValue.value = this.addExpenses.join(', ');
	addictionalIncomeValue.value = this.addIncome.join(', ');
	targetMonthValue.value = this.getTargetMonth();
	incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.changePeriod = function () {
	periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.addExpensesBlock = function () {
	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
	expensesItems = document.querySelectorAll('.expenses-items');

	if (expensesItems.length === 3) {
		expensesAdd.style.display = 'none';
	}
};
AppData.prototype.addIncomeBlock = function () {
	let cloneIncomeItem = incomeItems[0].cloneNode(true);
	incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
	incomeItems = document.querySelectorAll('.income-items');

	if (incomeItems.length === 3) {
		incomeAdd.style.display = 'none';
	}
};
AppData.prototype.getExpenses = function () {
	expensesItems.forEach(function (item) {
		let itemExpenses = item.querySelector('.expenses-title').value;
		let cashExpenses = item.querySelector('.expenses-amount').value;
		if (itemExpenses !== '' && cashExpenses !== '') {
			this.expenses[itemExpenses] = cashExpenses;
		}
	}, this);
};
AppData.prototype.getIncome = function () {

	incomeItems.forEach(function (item) {
		let itemIncome = item.querySelector('.income-title').value;
		let cashIncome = item.querySelector('.income-amount').value;
		if (itemIncome !== '' && cashIncome !== '') {
			this.income[itemIncome] = +cashIncome;
		}
	}, this);
};

AppData.prototype.getIncomeMonth = function () {
	for (let key in this.income) {
		this.incomeMonth = +this.incomeMonth + +this.income[key];
	}
	return this.incomeMonth;
};

AppData.prototype.getAddExpenses = function () {
	let addExpenses = expensesItem.value.split(',');
	addExpenses.forEach(function (item) {
		item = item.trim();
		if (item !== '') {
			this.addExpenses.push(item);
		}
	}, this);
};
AppData.prototype.getAddIncome = function () {
	incomeItem.forEach(function (item) {
		let itemValue = item.value.trim();
		if (itemValue !== '') {
			this.addIncome.push(itemValue);
		}
	}, this);
};
AppData.prototype.getExpensesMonth = function () {
	for (let key in this.expenses) {
		this.expensesMonth = +this.expensesMonth + +this.expenses[key];
	}
	return this.expensesMonth;
};
AppData.prototype.getBudget = function () {
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	this.budgetDay = parseInt(this.budgetMonth / 30);

};
AppData.prototype.getTargetMonth = function () {
	let sum = Math.round(targetAmount.value / this.budgetMonth);
	return sum;
};
AppData.prototype.getStatusIncome = function () {
	if (this.budgetDay > 1200) {
		return ('У вас высокий уровень дохода');
	} else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
		return ('У вас средний уровень дохода');
	} else if (this.budgetDay < 600 && this.budgetDay > 0) {
		return ('К сожалению, у вас уровень дохода меньше среднего');
	} else if (this.budgetDay <= 0) {
		return ('Что-то пошло не так');
	}
};
AppData.prototype.getInfoDeposit = function () {
	if (this.deposit) {
		do {
			this.percentDeposit = prompt('Какой у вас годовой процент?', 10);
		} while (!isNumber(this.percentDeposit));
		do {
			this.moneyDeposit = prompt('Какая сумма заложена?', 20000);
		} while (!isNumber(this.moneyDeposit));
	}
};
AppData.prototype.calcSavedMoney = function () {
	return this.budgetMonth * periodSelect.value;
};
AppData.prototype.freezeMenu = function () {
	startBtn.style.display = 'none';
	cancelBtn.style.display = 'block';
	let allInput = document.querySelectorAll('input[type=text]');
	allInput.forEach(function (item) {
		item.disabled = true;
	});
};
AppData.prototype.resetMenu = function () {
	cancelBtn.style.display = 'none';
	startBtn.style.display = 'block';
	// сброс
	Object.assign(this, new AppData)

	let allInput = document.querySelectorAll('input[type=text]');
	allInput.forEach(function (item) {
		item.value = '';
		item.disabled = false;
		start.disabled = true;
	});

};
AppData.prototype.eventListeners = function () {
	start.addEventListener('click', this.start.bind(this));
	expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
	incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
	periodSelect.addEventListener('input', this.changePeriod.bind(this));
	startBtn.disabled = true;

	salaryAmount.addEventListener('input', function () {
		if (salaryAmount.value === '') {
			startBtn.disabled = true;
		} else {
			startBtn.disabled = false;
		}

	});

	startBtn.addEventListener('click', appData.freezeMenu);
	cancelBtn.addEventListener('click', this.resetMenu.bind(this));
}
const appData = new AppData();

appData.eventListeners();
console.log(appData);
