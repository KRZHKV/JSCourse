const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        btnClose = document.querySelector('.close-btn'),
        menuItem = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    }

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('close-btn')) {
            handlerMenu();
        } else {
            target = target.closest('li');
            if (!target) {
                handlerMenu;
            };
        };
    });

};

export default toggleMenu;