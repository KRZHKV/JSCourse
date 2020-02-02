'use strict';



function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function isNum(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


const quizStart = function() {

	const randomNumber = getRandomInt(100);

	function quiz() {

		const answer = prompt('Угадай число от 1 до 100');
	
		if (answer === null) {
			alert('До свидания!');
			return;
		}
	
		if (isNum(answer)) {
		const number = +answer;
	
		if (number > randomNumber) {
			alert('Загаданное число меньше');
			quiz();
		} else if (number < randomNumber) {
			alert('Загаданное число больше');
			quiz();
		} else {
			alert('Вы угадали!');
		}
	} else {
		alert('Введите число');
		quiz();
	}
	}

	quiz();
}
quizStart();


