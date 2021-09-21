const money = +prompt('Ваш месячный доход?');
const income = 'Фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?'); 
const mission = 150000;
const expenses1 = prompt('Введите обязательную статью расходов', 'Интернет');
const amount1 = +prompt('Во сколько это обойдется?', '500');
const expenses2 = prompt('Введите обязательную статью расходов', 'Еда на месяц');
const amount2 = +prompt('Во сколько это обойдется?', '5000');
const budgetMonth = money - (amount1 + amount2);
const accumulationPeriod = Math.ceil(mission / budgetMonth);
const period = 8;
const budgetDay = Math.floor(budgetMonth / 30);

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей.`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

console.log(`Бюджет на месяц: ${budgetMonth} рубль(ей)`);
console.log(`Вы накопите нужную сумму через ${accumulationPeriod} месяца(ев)`);
console.log(`Ваш дневной бюджет: ${budgetDay} рубль(ей)`);

let getStatusIncome = function() {
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
console.log(getStatusIncome());