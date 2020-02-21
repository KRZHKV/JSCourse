'use strict';

const startBtn = document.getElementById('start'),
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
	expensesItem = document.querySelector('.additional_expenses-item'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositCheck = document.getElementById('deposit-check'),
	depositBank = document.querySelector('.deposit-bank'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	cancelBtn = document.querySelector('#cancel');
	
let expensesItems = document.querySelectorAll('.expenses-items'),
	incomeItems = document.querySelectorAll('.income-items'),
	depositPercent = document.querySelector('.deposit-percent');


function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(str) {
	if (str !== null && !isNumber(str) && str !== '') {
		return str;
	}
	return;
}



class AppData {
	constructor() {
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

	start() {
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
		this.getInfoDeposit();
		this.checkDepositValue();
		this.getBudget();
		this.calcSavedMoney();
		this.showResult();
	}

	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		addictionalExpensesValue.value = this.addExpenses.join(', ');
		addictionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
	}

	changePeriod() {
		periodAmount.textContent = periodSelect.value;
		incomePeriodValue.value = this.calcSavedMoney();
	}

	addExpensesBlock() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			expensesAdd.style.display = 'none';
		} 
	};

	addIncomeBlock() {
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			incomeAdd.style.display = 'none';
		}
	};

	getExpenses() {
		expensesItems.forEach( (item) => {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = cashExpenses;
			}
		}, this);
	};

	getIncome() {

		incomeItems.forEach( (item) => {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = +cashIncome;
			}
		}, this);
	};

	getIncomeMonth() {
		for (let key in this.income) {
			this.incomeMonth = +this.incomeMonth + +this.income[key];
		}
		return this.incomeMonth;
	};

	getAddExpenses() {
		let addExpenses = expensesItem.value.split(',');
		addExpenses.forEach( (item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		}, this);
	};

	getAddIncome() {
		incomeItem.forEach( (item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		}, this);
	};

	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth = +this.expensesMonth + +this.expenses[key];
		}
		return this.expensesMonth;
	};

	getInfoDeposit() {
		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
			
		}
	};


	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = parseInt(this.budgetMonth / 30);

	};

	getTargetMonth() {
		let sum = Math.round(targetAmount.value / this.budgetMonth);
		return sum;
	};

	getStatusIncome() {
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

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value;
	};

	checkDepositValue() {
		if(!parseInt(depositPercent.value) || depositPercent.value <= 0 || depositPercent.value >= 100) {
			depositPercent.value = '';
			start.disabled = true;
			alert('Введите корректное значение в поле проценты');
	 	} else {
			start.disabled = false;
	 };
	}

	freezeMenu() {
		
		startBtn.style.display = 'none';
		cancelBtn.style.display = 'block';
		let allInput = document.querySelectorAll('input[type=text]');
		allInput.forEach( (item) => {
			item.disabled = true;
		});
	};

	resetMenu() {
		cancelBtn.style.display = 'none';
		startBtn.style.display = 'block';
		// сброс
		Object.assign(this, new AppData);

		const allInput = document.querySelectorAll('input[type=text]');
		allInput.forEach(function (item) {
			item.value = '';
			item.disabled = false;
			start.disabled = true;
		});
		for (let i = 1; i < incomeItems.length; i++) {
            if (i !== 0) {
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
            }
            incomeAdd.style.display = 'block';
		};
		for (let i = 1; i < expensesItems.length; i++) {
            if (i !== 0) {
                expensesItems[i].parentNode.removeChild(expensesItems[i]);
            }
            expensesAdd.style.display = 'block';
		};
		depositBank.style.display = 'none';
		depositAmount.style.display = 'none';
		depositPercent.style.display = 'none';
		depositCheck.checked = false;
		  
	};
	
	changePercent() {
		const valueSelect = this.value;
		if(valueSelect === 'other') {
			depositPercent.value = '';
			depositPercent.style.display = 'inline-block';
		} else {
			depositPercent.value = valueSelect;
			depositPercent.style.display = 'none';
		}
	}

	depositHandler() {
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
		}
	}

	eventListeners() {
		start.addEventListener('click', this.start.bind(this));
		expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
		incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
		periodSelect.addEventListener('input', this.changePeriod.bind(this));

		startBtn.disabled = true;


		salaryAmount.addEventListener('input', () => {
			if (salaryAmount.value === '') {
				startBtn.disabled = true;
			} else {
				startBtn.disabled = false;
			}

		});

		startBtn.addEventListener('click', appData.freezeMenu);
		cancelBtn.addEventListener('click', this.resetMenu.bind(this));
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
		depositPercent.addEventListener('input', this.checkDepositValue);

	}
}

const appData = new AppData();

appData.eventListeners();
console.log(appData);