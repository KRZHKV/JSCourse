let num = 266219; // Присваиваем переменную

console.log(num); // Выводим число

console.log(num.toString()); // перенную преобразуем в строку
num = num.toString().split(''); // строку разделяем на массаив
console.log(num);

// Цикл для перемножения чисел
let sum = 1; 
for (let i = 0; i < num.length; i++) {
	sum = sum * num[i];
	console.log(sum);
}

num = sum; // возвращаемся к переменной num
console.log(num);
 num = num ** 3;  // возведение в степень
console.log(num);

console.log(num.toString().substring(0, 2));