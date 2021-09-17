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