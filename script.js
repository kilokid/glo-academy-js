'use strict';

const incomeAddButton = document.getElementsByTagName('button')[0];
const expensesAddButton = document.getElementsByTagName('button')[1];
const depositCheckbox = document.querySelector('#deposit-check');
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const calculateBtn = document.getElementById('start');
const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodRange = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const capitalizeFirstLetter = function(arr) {
    return arr.map(item => item[0].toUpperCase() + item.slice(1)).join(', ');
};

const appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
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
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod(); 
    },
    addExpensesBlock: function() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems.forEach(function(item) {
            item.insertAdjacentElement('afterend', cloneExpensesItems);
        });
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length >= 3) {
            expensesAddButton.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses.length && cashExpenses.length) {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    addIncomeBlock: function() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        cloneIncomeItems.querySelector('.income-title').value = '';
        cloneIncomeItems.querySelector('.income-amount').value = '';
        incomeItems.forEach(function(item) {
            item.insertAdjacentElement('afterend', cloneIncomeItems);
        });
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length >= 3) {
            incomeAddButton.style.display = 'none';
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            const itemIncome = item.querySelector('.income-title').value ;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome.length && cashIncome.length) {
                appData.income[itemIncome] = +cashIncome;
                appData.incomeMonth += +cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItems.forEach(function(item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    changeNumRange: function() {
        periodRange.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcPeriod();
        });
        periodAmount.textContent = periodRange.value;
    },
    blockStart: function() {
        calculateBtn.disabled = !salaryAmount.value;
    },
    getExpensesMonth: function() {
        for (let expenseName in appData.expenses) {
            appData.expensesMonth += +appData.expenses[expenseName];
        }
    },
    getBudget: function() {
        appData.budget = +salaryAmount.value;
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600) {
            return ('У вас сердний уровень дохода');
        } else if (appData.budgetDay >= 0) {
            return ('К сожалению ваш уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        } 
    },
    getDepositInfo: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            let percentDeposit = 0;
            do {
                percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(percentDeposit) || percentDeposit <= 0);
            appData.percentDeposit = percentDeposit;

            let moneyDeposit = 0;
            do {
                moneyDeposit = prompt('Какая сумма заложена?', '10000');
            } while (!isNumber(moneyDeposit) || moneyDeposit <= 0);
            appData.moneyDeposit = moneyDeposit;
        }
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodRange.value;
    },
};

appData.blockStart();
salaryAmount.addEventListener('input', appData.blockStart);
calculateBtn.addEventListener('click', appData.start);

expensesAddButton.addEventListener('click', appData.addExpensesBlock);

incomeAddButton.addEventListener('click', appData.addIncomeBlock);

periodRange.addEventListener('input', appData.changeNumRange);

// appData.targetMonth > 0 ? 
//     console.log(`Цель будет достигнута через ${appData.targetMonth} месяца(ев)`) : 
//     console.log('Цель не будет достигнута');


// console.log('Наша программа включает в себя данные: ');
// for (let elem in appData) {
//     console.log(elem, appData[elem]);
// }

// console.log(capitalizeFirstLetter(appData.addExpenses));