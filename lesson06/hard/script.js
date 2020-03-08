'use strict';



function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function isNum(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


const quizStart = function() {
	const randomNumber = getRandomInt(100);
	let counter = 10;
		function quiz() {

			const answer = prompt('Угадай число от 1 до 100');
			if (answer === null) {
				alert('До свидания!');
				return;
			}
			if (isNum(answer)) {
			const number = +answer;
			if (counter > 1) {
				if (number > randomNumber) {
					--counter;
					alert('Загаданное число меньше, осталось ' + counter + ' попыток');
					quiz();
				} else if (number < randomNumber) {
					--counter;
					alert('Загаданное число больше, осталось ' + counter +' попыток');
					quiz();
				} else {
					let winner = confirm('Вы угадали, хотите попробовать еще раз?');
					if (winner === true) {
						quizStart();
					} else {
						alert('До свидания!');
					};	
				};
			} else {
				let tryAgain = confirm('Попытки закончились, хотите попровать еще раз?');
				if( tryAgain === true) {
					quizStart();
				} else {
					alert('До свидания!');
				};
			};	
		} else {
			alert('Введите число');
			quiz();
		}
		}
	
		quiz();
}
quizStart();


