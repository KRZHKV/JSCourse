'use strict';

class First {
    constructor() {
        
    }
    hello() {
        console.log('Я Метод родителя!')
    }
};

class Second extends First {
    hello() {
        super.hello();
        console.log('А я новый метод!');
    };
};

const second = new Second();


second.hello();