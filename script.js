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

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const capitalizeFirstLetter = function(arr) {
    return arr.map(item => item[0].toUpperCase() + item.slice(1)).join(', ');
};

class AppData {
    constructor() {
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
    }

    start() {
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.listenIncomePeriod();
        this.hideCalcBtn();
        this.blockDataElems();
        this.showResult();
    }

    reset() {
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
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth; 
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
    }
    
    addExpInc(item, name) {
        const cloneItem = item[0].cloneNode(true);
        cloneItem.querySelector(`.${name}-title`).value = '';
        cloneItem.querySelector(`.${name}-amount`).value = '';
        if (name === 'expenses') {
            expensesAddButton.before(cloneItem);
        } else if (name === 'income') {
            incomeAddButton.before(cloneItem);
        }
        this.addListenerForInputs();
        item = document.querySelectorAll(`.${name}-items`);
        if (item.length >= 3) {
            if (name === 'expenses') {
                expensesAddButton.style.display = 'none';
            } else if (name === 'income') {
                incomeAddButton.style.display = 'none';
            }
        }
    }
    
    getExpInc() {
        
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value.trim();
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle.toLowerCase()] = +itemAmount;
            }
        };
        
        incomeItems.forEach(count);
        
        expensesItems.forEach(count);
        
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    
    
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.toLowerCase().split(', ');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeItems.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    // getAddExpInc(items, name) {
    //     const addItem = items.value.toLowerCase(),split(', ');

    //     items.forEach(item => {
    //         const itemValue = item.value.trim();
    //         if (itemValue !== '') {
    //             if (name === 'income') {
    //                 this.addIncome.push(itemValue);
    //             } else if (name === 'expenses') {
    //                 this.addExpenses.push(item);
    //             }
    //         }
    //     });
    // }

    changeNumRange() {
        periodAmount.textContent = periodRange.value;
    }
    
    getExpensesMonth() {
        for (let expenseName in this.expenses) {
            this.expensesMonth += +this.expenses[expenseName];
        }
    }

    getBudget() {
        this.budget = +salaryAmount.value;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return ('У вас сердний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return ('К сожалению ваш уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        } 
    }

    getDepositInfo() {
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
    }

    calcPeriod() {
        return this.budgetMonth * periodRange.value;
    }

    listenIncomePeriod() {
        periodRange.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }

    resetInputsAndBtns() {
        depositCheckbox.disabled = false;
        depositCheckbox.checked = false;
    
        incomeAddButton.disabled = false;
        expensesAddButton.disabled = false;
    
        dataElem.querySelectorAll('input').forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
    
        resultElem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
    }

    blockDataElems() {
        depositCheckbox.disabled = true;
    
        incomeAddButton.disabled = true;
        expensesAddButton.disabled = true;
    
        dataElem.querySelectorAll('[type="text"]').forEach((item) => {
            item.disabled = true;
        });
    }

    hideCalcBtn() {
        calculateBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    }

    showCalcBtn() {
        cancelBtn.style.display = 'none';
        calculateBtn.style.display = 'block';
    }

    handleTextinput(event) {
        const target = event.target;
        const regStr = /[^а-яё, ]/gi;
        target.value = target.value.replace(regStr, '');
    }

    handleNumberinput(event) {
        const target = event.target;
        const regStr = /[^0-9.]/;
        target.value = target.value.replace(regStr, '');
    }

    blockStart() {
        calculateBtn.disabled = !salaryAmount.value.trim();
        this.addListenerForInputs();
    }

    addListenerForInputs() {
        document.querySelectorAll('[placeholder="Наименование"], [placeholder="название"]').forEach(input => {
            input.addEventListener('input', this.handleTextinput);
        });
        
        document.querySelectorAll('[placeholder="Сумма"]').forEach(input => {
            input.addEventListener('input', this.handleNumberinput);
        });
    }

    eventsListenersAndStart() {
        this.blockStart();
        salaryAmount.addEventListener('input', this.blockStart);
        calculateBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesAddButton.addEventListener('click', this.addExpInc.bind(this,expensesItems, 'expenses'));
        incomeAddButton.addEventListener('click', this.addExpInc.bind(this,incomeItems, 'income'));
        periodRange.addEventListener('input', this.changeNumRange);
    }
}

const appData = new AppData();

appData.eventsListenersAndStart();

console.log(appData);
