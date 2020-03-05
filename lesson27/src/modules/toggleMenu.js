const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        btnClose = document.querySelector('.close-btn'),
        menuItem = menu.querySelectorAll('ul>li>a');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    }

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('close-btn')) {
            handlerMenu();
        } else {
            menuItem.forEach((elem) => {
                if( elem === target ) {
                handlerMenu();
                };
            });
            
        };
    });

};

export default toggleMenu;