const booksContainer = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const bookTitles = document.querySelectorAll('a');
const ads = document.querySelector('.adv');
const visibilityBookElems = books[0].querySelectorAll('li');
const asyncBookElems = books[5].querySelectorAll('li');
const es6BookElems = books[2].querySelectorAll('li');

booksContainer.prepend(books[1], books[0], books[4], books[3], books[5], books[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

bookTitles[4].textContent = 'Книга 3. this и Прототипы Объектов';

ads.remove();

visibilityBookElems[1].after(visibilityBookElems[3], visibilityBookElems[6], visibilityBookElems[8]);
visibilityBookElems[9].after(visibilityBookElems[2]);

asyncBookElems[1].after(asyncBookElems[9], asyncBookElems[3], asyncBookElems[4]);
asyncBookElems[7].after(asyncBookElems[5]);

es6BookElems[8].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');