
let specialData = prompt('Введите что-нибудь');

const checkData = function(data) {
 if(typeof(data) !== typeof('')) {
     alert('Введите текст');
 } else {
     data = data.trim();
     if (data.length > 30) {
         console.log(data.slice(0, 30) + '...');
     }
 };
 
};

checkData(specialData);