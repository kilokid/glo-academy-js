const money = +prompt('Ваш месячный доход?');
const income = 'Фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?'); 
const mission = 150000;
const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = +prompt('Во сколько это обойдется?');
const budgetMonth = money - (amount1 + amount2);
const accumulationPeriod = Math.ceil(mission / budgetMonth);
const period = 8;
const budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей.`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

console.log(`Бюджет на месяц: ${budgetMonth} рублей`);
console.log(`Вы накопите нужную сумму через ${accumulationPeriod} месяца(ев)`);
console.log(`Ваш дневной бюджет: ${budgetDay} рубль`);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас сердний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}   