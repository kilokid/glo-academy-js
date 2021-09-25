'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 150000,
    period: 8,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Театр, КиНо, Ресторан, Комуналка');
              appData.addExpenses = addExpenses.toLowerCase().split(', ');
              appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            const expenseName = prompt('Введите обязательную статью расходов?', 'Еда на месяц');
            let expenseAmount = 0;
            do {
                expenseAmount = +prompt('Во сколько это обойдется?', '2000');
            } while(!isNumber(expenseAmount));
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
        return Math.ceil(appData.mission / appData.budgetMonth);
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
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log(appData.getTargetMonth() > 0 ? 
    console.log(`Цель будет достигнута через ${appData.getTargetMonth()} месяца(ев)`) : 
    console.log('Цель не будет достигнута'));

console.log(`Ваш дневной бюджет: ${appData.budgetDay} рубль(ей)`);
console.log(appData.getStatusIncome());
console.log(`Сумма обязательных расходов за месяц составляет ${appData.expensesMonth} рублей`);

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log(key + appData[key]);
}