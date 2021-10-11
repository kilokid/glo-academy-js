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
const cancelBtn = document.getElementById('cancel');
const dataElem = document.querySelector('.data');
const resultElem = document.querySelector('.result');
const dataInputsTypeText = dataElem.querySelectorAll('[type="text"]');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const capitalizeFirstLetter = function(arr) {
    return arr.map(item => item[0].toUpperCase() + item.slice(1)).join(', ');
};

const AppData = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.start = function() {
    this.blockDataElems();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.listenIncomePeriod();
    this.hideCalcBtn();
    this.showResult();
};

AppData.prototype.reset = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    
    this.resetInputsAndBtns();
    this.showCalcBtn();
    this.blockStart();

    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove(incomeItems[i]);
    }
    incomeAddButton.style.display = 'block';

    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove(expensesItems[i]);
    }
    expensesAddButton.style.display = 'block';

    periodRange.value = '1';
    periodAmount.textContent = '1';
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth; 
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesAddButton.before(cloneExpensesItem);
    addListenerForInputs();
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length >= 3) {
        expensesAddButton.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        const itemExpenses = item.querySelector('.expenses-title').value.trim();
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses.toLowerCase()] = +cashExpenses;
        }
    });
};

AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeAddButton.before(cloneIncomeItem);
    addListenerForInputs();
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length >= 3) {
        incomeAddButton.style.display = 'none';
    }
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        const itemIncome = item.querySelector('.income-title').value.trim();
        const cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome.toLowerCase()] = +cashIncome;
            _this.incomeMonth += +cashIncome;
        }
    });
};

AppData.prototype.getAddExpenses = function() {
    const addExpenses = additionalExpensesItem.value.toLowerCase().split(', ');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItems.forEach(function(item) {
        const itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.changeNumRange = function() {
    periodAmount.textContent = periodRange.value;
};

AppData.prototype.getExpensesMonth = function() {
    for (let expenseName in this.expenses) {
        this.expensesMonth += +this.expenses[expenseName];
    }
};

AppData.prototype.getBudget = function() {
    this.budget = salaryAmount.value;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
        return ('У вас сердний уровень дохода');
    } else if (this.budgetDay >= 0) {
        return ('К сожалению ваш уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    } 
};

AppData.prototype.getDepositInfo = function() {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
        let percentDeposit = 0;
        do {
            percentDeposit = prompt('Какой годовой процент?', '10');
        } while (!isNumber(percentDeposit) || percentDeposit <= 0);
        this.percentDeposit = percentDeposit;

        let moneyDeposit = 0;
        do {
            moneyDeposit = prompt('Какая сумма заложена?', '10000');
        } while (!isNumber(moneyDeposit) || moneyDeposit <= 0);
        this.moneyDeposit = moneyDeposit;
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodRange.value;
};

AppData.prototype.listenIncomePeriod = function() {
    const _this = this;
    periodRange.addEventListener('input', function() {
        incomePeriodValue.value = _this.calcPeriod();
    });
};

AppData.prototype.resetInputsAndBtns = function() {
    depositCheckbox.disabled = false;
    depositCheckbox.checked = false;

    incomeAddButton.disabled = false;
    expensesAddButton.disabled = false;

    dataElem.querySelectorAll('input').forEach((item) => {
        item.disabled = false;
        item.value = '';
    });

    resultElem.querySelectorAll('input').forEach(function(item) {
        item.value = '';
    });
};

AppData.prototype.blockDataElems = function() {
    depositCheckbox.disabled = true;

    incomeAddButton.disabled = true;
    expensesAddButton.disabled = true;

    dataInputsTypeText.forEach((item) => {
        item.disabled = true;
    });
};

AppData.prototype.hideCalcBtn = function() {
    calculateBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
};

AppData.prototype.showCalcBtn = function() {
    cancelBtn.style.display = 'none';
    calculateBtn.style.display = 'block';
};

AppData.prototype.handleTextinput = function(event) {
    const target = event.target;
    const regStr = /[^а-яё, ]/gi;
    target.value = target.value.replace(regStr, '');
};

AppData.prototype.handleNumberinput = function(event) {
    const target = event.target;
    const regStr = /[^0-9.]/;
    target.value = target.value.replace(regStr, '');
};

AppData.prototype.blockStart = function() {
    calculateBtn.disabled = !salaryAmount.value.trim();
};

const appData = new AppData();

console.log(appData);

salaryAmount.addEventListener('input', appData.blockStart);
appData.blockStart();
calculateBtn.addEventListener('click', appData.start.bind(appData));
cancelBtn.addEventListener('click', appData.reset.bind(appData));

expensesAddButton.addEventListener('click', appData.addExpensesBlock);

incomeAddButton.addEventListener('click', appData.addIncomeBlock);

periodRange.addEventListener('input', appData.changeNumRange);

function addListenerForInputs() {
    document.querySelectorAll('[placeholder="Наименование"], [placeholder="название"]').forEach(input => {
        input.addEventListener('input', appData.handleTextinput);
    });
    
    document.querySelectorAll('[placeholder="Сумма"]').forEach(input => {
        input.addEventListener('input', appData.handleNumberinput);
    });
}

addListenerForInputs();