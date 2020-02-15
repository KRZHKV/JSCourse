

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.todo-control');
    const todoList = document.getElementById('todo');
    const completedList = document.getElementById('completed');
    const headerInput = document.querySelector('.header-input');
    
    // создаем объект
    let data = {
        todo: [],
        completed: []
    };

    // проверяем localStorage на проверку данных
    if(localStorage.getItem('localData')) {
        data = JSON.parse(localStorage.getItem('localData'));
    }

    // рендерит объект Data если в нем что-то есть и подгружает данные
    const renderItemsForUpdate = function() {
        if(!data.todo.length && !data.completed.length) return 

        for(let i = 0; i < data.todo.length; i++) {
            renderItem(data.todo[i]);
        }
        for(let i = 0; i < data.completed.length; i++) {
            renderItem(data.completed[i], true);
        }
    }

    //Добавляет данные в localStorage
    const dataUpdateToLocalS = function () {
        localStorage.setItem('localData', JSON.stringify(data));
        console.log(localStorage.getItem('localData'));
    }

    // добавляет элемент на страницу
    const addItem = function(text) {
        renderItem(text);
        headerInput.value = '';
        data.todo.push(text);
        console.log(data.todo);
        dataUpdateToLocalS();
    };

    // Удаляет элемент
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

    // Перенесит элемент из todo в Completed
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

    //рендеринг одного элемента
    const renderItem = function(text, completed = false) {
        const item = document.createElement('li');
        const btnBlock = document.createElement('div');
        const btnRemove = document.createElement('button');
        const btnComplete = document.createElement('button');

        let list = todoList;
        // если completed = true то рендерится в список выполненных
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

    //обработчик сабмита, когда добавляем todoшку
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if(headerInput.value !== '') {
            addItem(headerInput.value.trim());

        }
    });
    // вызов функции, которая при наличии данных в localStorage отрендерит их
    renderItemsForUpdate();

})