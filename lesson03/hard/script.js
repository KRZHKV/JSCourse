'use strict';

let lang = prompt('Выберете язык: ru/en');

// Вариант A
if (lang == 'ru') {
	console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
} else if (lang == 'en') {
	console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
	console.log('Ошибка/Error');
}

// Вариант B
switch(lang) {
	case 'ru':
		console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
		break;
	case 'en':
		console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
		break;
	default:
		console.log('Ошибка/Error');
		break;
}

//Вариант C
let language = {
	'ru': ['Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'],
	'en': ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday']
}
let choose = prompt('Выберете язык: ru/en');



//2 задание
let namePerson = prompt('Ваше имя?');

let answer = (namePerson == 'Артем') ? console.log('Директор') : (namePerson == 'Максим') ?
console.log('Преподаватель') : console.log('Студент');