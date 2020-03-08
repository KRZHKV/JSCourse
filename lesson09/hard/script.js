
	const currentDate = new Date(),
	  body = document.querySelector('body');

let day = currentDate.getDate(),
	month = currentDate.getMonth(),
	year = currentDate.getFullYear(),
	hours = currentDate.getHours(),
	minutes = currentDate.getMinutes(),
	seconds = currentDate.getSeconds();

let option3 = {
	day: 'numeric',
	month: 'long',
}

let str = document.createElement('p');
let str2 = document.createElement('p');

let hoursName = 'час',
	minutesName = 'минута',
	secondsName = 'секунда';

	// Var 1
	function declOfNum(number, titles) {  
		cases = [2, 0, 1, 1, 1, 2];  
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
	}
	
secondsName = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
minutesName = declOfNum(minutes, ['минута', 'минуты', 'минут']);
hoursName = declOfNum(hours, ['час', 'часа', 'часов']);

str.textContent = `${currentDate.toLocaleString("ru", option3)} ${year} года, ${hours} ${hoursName} ${minutes} ${minutesName} ${seconds} ${secondsName}`;
body.append(str);


// Var B
let option = {
	day: 'numeric',
	month: 'numeric',
	year: 'numeric'
}
let option2 = {
	hour: 'numeric',
  	minute: 'numeric',
  	second: 'numeric'
}
str2.textContent = currentDate.toLocaleString('ru', option) + ' - ' + currentDate.toLocaleString('ru', option2);

body.append(str2);


let changeTime = function() {
	str.textContent = `${currentDate.toLocaleString("ru", option3)} ${year} года, ${hours} ${hoursName} ${minutes} ${minutesName} ${seconds} ${secondsName}`;
	str2.textContent = currentDate.toLocaleString('ru', option) + ' - ' + currentDate.toLocaleString('ru', option2);
}
setInterval(changeTime(), 1000);


