'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createBlock = function () {
    let elem;
   
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
    elem.textContent = prompt('Что за текст?', 'вот текст');
};

DomElement.prototype.addElem = function (elem) {
    document.body.prepend(elem);
};


let div = new DomElement('.block', '185px', '103px', '#ccc', '2rem');
let p = new DomElement('#block', '100px', '10rem', 'lavender', '10px');


div.createBlock();
p.createBlock();