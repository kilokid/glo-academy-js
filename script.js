const body = document.querySelector('body');
const booksContainer = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const booksTitle = document.querySelectorAll('a');
const ads = document.querySelector('.adv');
const liBookVisibilitu = books[0].querySelectorAll('li');
const liBookAsync = books[5].querySelectorAll('li');
const liBookES6 = books[2].querySelectorAll('li');

booksContainer.prepend(books[1], books[0], books[4], books[3], books[5], books[2]);

body.style.backgroundImage = 'url(./image/you-dont-know.jpg)';

booksTitle[4].textContent = 'Книга 3. this и Прототипы Объектов';

ads.remove();

liBookVisibilitu[1].after(liBookVisibilitu[3], liBookVisibilitu[6], liBookVisibilitu[8]);
liBookVisibilitu[9].after(liBookVisibilitu[2]);

liBookAsync[1].after(liBookAsync[9], liBookAsync[3], liBookAsync[4]);
liBookAsync[7].after(liBookAsync[5]);

liBookES6[8].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');
