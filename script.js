'use strict';

window.onload = function() {
    const calculateBtn = document.getElementById('start');
    console.log(calculateBtn);
    const PlusBtn1 = document.getElementsByTagName('button')[0];
    console.log(PlusBtn1);
    const PlusBtn2 = document.getElementsByTagName('button')[1];
    console.log(PlusBtn2);
    const depositCheckbox = document.querySelector('#deposit-check');
    console.log(depositCheckbox);
    const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
    console.log(additionalIncomeItem);
    const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
    console.log(budgetDayValue);
    const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
    console.log(expensesMonthValue);
    const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
    console.log(additionalIncomeValue);
    const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
    console.log(additionalExpensesValue);
    const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
    console.log(incomePeriodValue);
    const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
    console.log(targetMonthValue);
    const salaryAmount = document.querySelector('.salary-amount');
    console.log(salaryAmount);
    const incomeTitle = document.querySelector('.income-title');
    console.log(incomeTitle);
    const incomeAmount = document.querySelector('.income-amount');
    console.log(incomeAmount);
    const expensesTitle = document.querySelector('.expenses-title');
    console.log(expensesTitle);
    const expensesAmount = document.querySelector('.expenses-amount');
    console.log(expensesAmount);
    const additionalExpensesItem = document.querySelector('.additional_expenses-item');
    console.log(additionalExpensesItem);
    const targetAmount = document.querySelector('.target-amount');
    console.log(targetAmount);
    const periodSelect = document.querySelector('.period-select');
    console.log(periodSelect);
    const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
    console.log(budgetMonthValue);

    const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    const capitalizeFirstLetter = function(arr) {
        return arr.map(item => item[0].toUpperCase() + item.slice(1)).join(', ');
    };

    let money;

    const start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money) || money <= 0);
    };
    start();

    const appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 150000,
        period: 8,
        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        targetMonth: 0,
        asking: function() {

            if (confirm('Есть ли у вас дополнительный источник заработка?')) {
                let itemIncome = '';
                do {
                    itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Фриланс').toLowerCase();
                } while(isNumber(itemIncome) || !itemIncome.length);

                let cashIncome;
                do {
                    cashIncome = +prompt('Сколько в месяц вы зарабатываете на этом?', '10000');
                } while(!isNumber(cashIncome) || cashIncome <= 0);
                
                appData.income[itemIncome] = cashIncome;
            }

            let addExpenses = '';
            do {
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Театр, КиНо, Ресторан, Коммуналка');
            } while (isNumber(addExpenses) || !addExpenses.length);
            appData.addExpenses = addExpenses.toLowerCase().split(', ');

            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            appData.getDepositInfo();

            for (let i = 0; i < 2; i++) {
                let expenseName = '';
                do {
                    expenseName = prompt('Введите обязательную статью расходов?', 'Еда на месяц').toLowerCase();
                } while(isNumber(expenseName) || !expenseName.trim().length);

                let expenseAmount = 0;
                do {
                    expenseAmount = +prompt('Во сколько это обойдется?', '2000');
                } while(!isNumber(expenseAmount) || expenseAmount <= 0) ;
                appData.expenses[expenseName] = expenseAmount;
            }
        },
        getExpensesMonth: function() {
            appData.expensesMonth = 0;
            for (let expenseName in appData.expenses) {
                appData.expensesMonth += appData.expenses[expenseName];
            }
        },
        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        getTargetMonth: function() {
            appData.targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
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
        calcSavedmoney: function() {
            return appData.budgetMonth * appData.period;
        },
    };

    appData.asking();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getTargetMonth();

    appData.targetMonth > 0 ? 
        console.log(`Цель будет достигнута через ${appData.targetMonth} месяца(ев)`) : 
        console.log('Цель не будет достигнута');

    console.log(`Ваш дневной бюджет: ${appData.budgetDay} рубль(ей)`);
    console.log(appData.getStatusIncome());
    console.log(`Сумма обязательных расходов за месяц составляет ${appData.expensesMonth} рублей`);

    console.log('Наша программа включает в себя данные:');

    console.log('Наша программа включает в себя данные: ');
    for (let elem in appData) {
        console.log(elem, appData[elem]);
    }

    console.log(capitalizeFirstLetter(appData.addExpenses));
};    