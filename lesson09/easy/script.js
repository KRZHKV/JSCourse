'use strict';

let calculateBtn = document.getElementById('start');

let incomeAdd = document.getElementsByTagName('button')[0];
let expensesAdd = document.getElementsByTagName('button')[1];

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
