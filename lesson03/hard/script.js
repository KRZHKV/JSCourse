'use strict';

//1 задание
let lang = prompt('Выберете язык: ru/en');
const arrayRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const arrayEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const body = document.querySelector('body');

// Вариант a
// if (lang === 'ru') {
// 	toString(arrayRu);
// 	body.innerHTML = 'Дни недели: ' + arrayRu;
// } else if (lang === 'en') {
// 	toString(arrayEn);
// 	body.innerHTML = 'Дни недели: ' + arrayEn;
// } else {
// 	body.innerHTML = 'Ошибка';
// }


//Вариант b
// switch(lang) {
// 	case 'ru': toString(arrayRu);
// 			   body.innerHTML = 'Дни недели: ' + arrayRu;
// 	break;
// 	case 'en': toString(arrayEn);
// 			   body.innerHTML = 'Дни недели: ' + arrayEn;
// 	break;
// 	default: body.innerHTML = 'Ошибка';
// }


// Вариант c
const mainArray = [];
mainArray['ru'] = arrayRu;
mainArray['en'] = arrayEn
body.innerHTML = `Неделя: ${mainArray[lang]}`;

//2 задание
let namePerson = prompt('Ваше имя?');

let answer = (namePerson == 'Артем') ? console.log('Директор') : (namePerson == 'Максим') ?
console.log('Преподаватель') : console.log('Студент');