'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const input = document.querySelector('.input-text');
    const btn = document.querySelector('.form-button');
    const body = document.querySelector('body');

    
    const DomElement = function() {
    this.selector = 0;
    this.height = '200px';
    this.width = '100px';
    this.bg = 'blue';
    this.fontSize = '24px';
    };
DomElement.prototype.createBlock = function() {
    if(this.input.value.indexOf('#') != -1) {
        const item = document.createElement('p');
        item.id = input.value;
        item.style.cssText = `
        background-color: ${bg};
        height: ${height};
        width: ${width};
        fontsize: ${fontSize};`
        body.appendChild(item);
    } else if(this.input.value.indexOf('.') != -1) {
        const item = document.createElement('div');
        item.classList.add = input.value;
        item.style.cssText = `
        background-color: ${bg};
        height: ${height};
        width: ${width};
        fontsize: ${fontSize};`
        body.appendChild(item);
    }
};

    const newBlock = new DomElement();
console.log(newBlock);

form.addEventListener('submit', newBlock.createBlock);
});

