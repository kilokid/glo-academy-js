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
    asking: function() {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }
};

const expenses = [];
const expensesAmount = getExpensesMonth();

const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);


const showTypeOf = function(data) {
    console.log(data, typeof(data));
};

const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return ('У вас сердний уровень дохода');
    } else if (budgetDay >= 0) {
        return ('К сожалению ваш уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    } 
};

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов');

        let expenseAmount = 0;
        do {
            expenseAmount = +prompt('Во сколько это обойдется?');
        } while(!isNumber(expenseAmount));
       sum += expenseAmount;
    }

    return sum;
}

function getAccumulatedMonth() {
    return money - expensesAmount;
}

function getTargetMonth() {
    return Math.ceil(appData.mission / accumulatedMonth);
}

if (getTargetMonth() > 0) {
    console.log(`Цель будет достигнута через ${getTargetMonth()} месяца(ев)`);
} else {
    console.log('Цель не будет достигнута');
}

showTypeOf(appData.money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);

console.log(`Ваш дневной бюджет: ${budgetDay} рубль(ей)`);
console.log(getStatusIncome());
console.log(`Сумма обязательных расходов за месяц составляет ${expensesAmount} рублей`);