'use strict';

let shelf = document.querySelector('.books');
let books = document.querySelectorAll('.book');
console.log(books);

shelf.insertBefore(books[1], books[0]);
shelf.insertBefore(books[4], books[2]);
shelf.insertBefore(books[2], books[5]);
shelf.insertBefore(books[5], books[2]);

let bodyImg = document.querySelector('body');
bodyImg.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg);')


let ad = document.querySelector('.adv');
ad.setAttribute('style', 'display: none;');

let titles = document.querySelectorAll('a');

let titleRename = titles[2];
titleRename.textContent = 'Книга 3. this и Прототипы Объектов';

let heading = document.querySelectorAll('ul');
let headingText = heading[1];
headingText.insertBefore(headingText.children[2], headingText.children[10]);
headingText.insertBefore(headingText.children[5], headingText.children[3]);
headingText.insertBefore(headingText.children[7], headingText.children[4]);

let headingText2 = heading[4];
headingText2.insertBefore(headingText2.children[9], headingText2.children[2]);
headingText2.insertBefore(headingText2.children[6], headingText2.children[9]);
headingText2.insertBefore(headingText2.children[3], headingText2.children[6]);

let headingAdd = heading[5];
console.log(headingAdd);

let newChild = document.createElement('li');
newChild.innerHTML = 'Глава 8: За пределами ES6';

headingAdd.appendChild(newChild);