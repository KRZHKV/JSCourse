'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

let quiz = function() {
	let answer = 66;
	let tryAnswer = function() {
		let number = +prompt('Угадай число от 1 до 100');
		if ( number === answer) {
			alert('Отлично, ты Угадал!');
		} else if (number > answer) {
			alert('Загаданное число меньше');
			tryAnswer();
		} else if (number < answer){
			alert('Загаданное число больше');
			tryAnswer();
		} else if (!isNumber(number)) { 
			alert('Введи число!')
			tryAnswer();
		}
	}
	tryAnswer();

}

quiz();