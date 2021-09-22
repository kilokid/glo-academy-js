'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
    money = prompt('Ваш месячный доход?');

    while (!isNumber(money)) {
        money = prompt('Ваш месячный доход?');
    }
};

start();

const expenses = [];
const expensesAmount = getExpensesMonth();
const income = 'Фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?'); 
const mission = 150000;
const accumulatedMonth = getAccumulatedMonth();
const period = 8;
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

        sum += +prompt('Во сколько это обойдется?');
    }

    return sum;
}

function getAccumulatedMonth() {
    return money - expensesAmount;
}

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));
console.log(`Ваш дневной бюджет: ${budgetDay} рубль(ей)`);
console.log(getStatusIncome());
console.log(`Сумма обязательных расходов за месяц составляет ${expensesAmount} рублей`);
console.log(`Цель будет достигнута через ${getTargetMonth()} месяца(ев)`);