let money = 25000; // доход за месяц
let income = 'Фриланс'; // дополнительный доход
let addExpenses = 'интернет, такси, гаджеты, подписки'; // доп расходы
let deposit = true; 
let mission = 150000; // сумму, которую хочу накопить
let period = 8; 
let budgetDay = money / 30; // дневной бюджет 

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей.`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

const a = prompt('Введите обязательную статью расходов');
const b = +prompt('Во сколько это обойдется?');
const c = prompt('Введите обязательную статью расходов');
const d = +prompt('Во сколько это обойдется?');

// for (let i = 0; i < 2; i++) {
//     a = prompt('Введите обязательную статью расходов');
//     c, d = +prompt('Во сколько это обойдется?');
// }

let budgetMonth = money - (b + d);
console.log(`Бюджет на месяц: ${budgetMonth} рублей`);

period = Math.ceil(mission / budgetMonth);
console.log(`Вы накопите нужную сумму через ${period} месяца(ев)`);

budgetDay = Math.floor(budgetMonth / 30);
console.log(`Ваш дневной бюджет: ${budgetDay} рубль`);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас сердний уровень дохода');
} else if (budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}