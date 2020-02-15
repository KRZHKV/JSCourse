

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.todo-control');
    const todoList = document.getElementById('todo');
    const completedList = document.getElementById('completed');
    const headerInput = document.querySelector('.header-input');
    
    let data = {
        todo: [],
        completed: []
    };

    if(localStorage.getItem('localData')) {
        data = JSON.parse(localStorage.getItem('localData'));
    }

    const renderItemsForUpdate = function() {
        if(!data.todo.length && !data.completed.length) return 

        for(let i = 0; i < data.todo.length; i++) {
            renderItem(data.todo[i]);
        }
        for(let i = 0; i < data.completed.length; i++) {
            renderItem(data.completed[i], true);
        }
    }

    const dataUpdateToLocalS = function () {
        localStorage.setItem('localData', JSON.stringify(data));
        console.log(localStorage.getItem('localData'));
    }

    const addItem = function(text) {
        renderItem(text);
        headerInput.value = '';
        data.todo.push(text);
        console.log(data.todo);
        dataUpdateToLocalS();
    };

    const itemRemove = function(elem) {
        const item = elem.parentNode.parentNode;
        const itemParent = item.parentNode;
        const id = itemParent.id;
        const text = item.textContent;
        if (id === 'todo') {
            data.todo.splice(data.todo.indexOf(text), 1);
        } else {
            data.completed.splice(data.completed.indexOf(text), 1);
        }


        itemParent.removeChild(item);


        dataUpdateToLocalS();
    };
    const itemComplete = function(elem) {
        const item = elem.parentNode.parentNode;
        const itemParent = item.parentNode;
        const id = itemParent.id;
        const text = item.textContent;

        let target;

        if (id === 'todo') {
            target = completedList;
        } else {
            target = todoList;
        }

        if (id === 'todo') {
            data.todo.splice(data.todo.indexOf(text), 1);
            data.completed.push(text);
        } else {
            data.completed.splice(data.completed.indexOf(text), 1);
            data.todo.push(text);
        }

        itemParent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);
        dataUpdateToLocalS();
       
    };

    const renderItem = function(text, completed = false) {
        const item = document.createElement('li');
        const btnBlock = document.createElement('div');
        const btnRemove = document.createElement('button');
        const btnComplete = document.createElement('button');

        let list = todoList;
        if(completed) {
            list = completedList;
        } else {
            list = todoList;
        }



        item.classList.add('todo-item');
        btnBlock.classList.add('todo-buttons');
        btnRemove.classList.add('todo-remove');
        btnComplete.classList.add('todo-complete');

        item.textContent = text;

        btnRemove.addEventListener('click', function(event) {
            itemRemove(event.target);
        });
        btnComplete.addEventListener('click', function(event) {
            itemComplete(event.target);
        });

        btnBlock.appendChild(btnRemove);
        btnBlock.appendChild(btnComplete);
        item.appendChild(btnBlock);

        list.insertBefore(item, list.childNodes[0]);

    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if(headerInput.value !== '') {
            addItem(headerInput.value);

        }
    });

    renderItemsForUpdate();

})