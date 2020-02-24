'use strict';

let date = new Date();

let newYear = new Date();
newYear.setFullYear(2021, 1, 1);
let today = new Date();
today = Math.floor(((newYear-today)/1000)/60/60/24);

let hoursNow = date.getHours(),
    dayOfWeek = date.getDay(),
    dateToday = date.getDate(),
    time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' });


if( hoursNow >= 5 || hoursNow <= 12) {
    console.log('Доброе утро!');
} else if( hoursNow >= 13 || hoursNow <= 18) {
    console.log('Добрый день!');
} else if( hoursNow >= 18 || hoursNow <= 23) {
    console.log('Добрый вечер!');
} else {
    console.log('Доброй ночи!');
}
let dayToday;
switch(dayOfWeek) {
    case 0: dayToday = 'Воскресенье';
    break;
    case 1: dayToday = 'Понедельник';
    break;
    case 2: dayToday = 'Вторник';
    break;
    case 3: dayToday = 'Среда';
    break;
    case 4: dayToday = 'Четверг';
    break;
    case 5: dayToday = 'Пятница';
    break;
    case 6: dayToday = 'Суббота';
    break;
}


console.log('Сегодня:' + ' ' + dayToday);
console.log('Текущее время' + ' ' +time);
console.log('До нового года осталось:' + ' ' + today + ' Дня');