'use strict';

let textInput = prompt('Введите значение:', '.block');
console.log(textInput);


function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createBlock = function () {
    let elem;
<<<<<<< HEAD
   
=======
    this.selector = textInput;
>>>>>>> 1edd191d5ba1d0bab7d030e323b42b7a140e1e92
    if (this.selector[0] === '.') {
        elem = document.createElement('div');
        elem.classList.add(this.selector.slice(1));
    } else if (this.selector[0] === '#') {
        elem = document.createElement('p');
        elem.setAttribute('id', this.selector.slice(1));
    }

    this.styling(elem);
    this.writeText(elem);
    this.addElem(elem);
};

DomElement.prototype.styling = function (elem) {
    elem.style.cssText = `height: ${this.height}; width: ${this.width}; background-color: ${this.bg}; font-size: ${this.fontSize}`;
};

DomElement.prototype.writeText = function (elem) {
<<<<<<< HEAD
    elem.textContent = prompt('Что за текст?', 'вот текст');
=======
    elem.textContent = textInput;
>>>>>>> 1edd191d5ba1d0bab7d030e323b42b7a140e1e92
};

DomElement.prototype.addElem = function (elem) {
    document.body.prepend(elem);
};


let newblock = new DomElement(textInput, '185px', '103px', '#ccc', '2rem');

newblock.createElem();

<<<<<<< HEAD

div.createBlock();
p.createBlock();
=======
>>>>>>> 1edd191d5ba1d0bab7d030e323b42b7a140e1e92
