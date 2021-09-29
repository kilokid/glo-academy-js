'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const capitalizerFirstLetter = function(arr) {
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

console.log(capitalizerFirstLetter(appData.addExpenses));