'use strict';
window.addEventListener('DOMContentLoaded', function() {


function DomElement(selector, height, width, bg, fontSize, position, left, right, top, bottom) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
}

DomElement.prototype.createBlock = function () {
    let elem;
   

    this.selector = 'block';
        elem = document.createElement('div');
        elem.classList.add('block');

    this.styling(elem);
    this.addElem(elem);
};

DomElement.prototype.styling = function (elem) {
    elem.style.cssText = `height: ${this.height}; width: ${this.width}; background-color: ${this.bg}; font-size: ${this.fontSize}; position: ${this.position}; left: ${this.left}`;
};


DomElement.prototype.addElem = function (elem) {
    document.body.prepend(elem);
};


let newblock = new DomElement('block', '100px', '100px', '#009900', '2rem', 'absolute', '0px', '0px');

newblock.createBlock();
let vertical = 0;
let horisontal = 0;
document.addEventListener('keydown', function(event) {
    let elem = document.querySelector('.block');
    if (event.key === 'ArrowUp') {
        vertical -= 10;
        elem.style.top = vertical+'px';
    } else if (event.key === 'ArrowDown') {
        vertical += 10;
        elem.style.top = vertical+'px';
    } else if (event.key === 'ArrowLeft') {
        horisontal -= 10;
        elem.style.left = horisontal+'px';
    } else if (event.key === 'ArrowRight') {
        horisontal += 10;
        elem.style.left = horisontal+'px';
    }
})
});


