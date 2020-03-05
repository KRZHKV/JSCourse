
    'use strict';

    import countTimer from './modules/countTimer';
    import toggleMenu from './modules/toggleMenu';
    import togglePopUp from './modules/togglePopup';
    import tabs from './modules/tabs';
    import slider from './modules/slider';
    import changePhoto from './modules/changePhoto';
    import checkNumber from './modules/checkNumber';
    import calc from './modules/calc';
    import sendForm from './modules/sendForm';

    countTimer('12 march 2020');

    //меню
    toggleMenu();
    togglePopUp();

    //табы
    tabs();

    //Слайдер
    slider();
    changePhoto();
    checkNumber();

    //калькулятор
    calc(100);

    //send ajax-form
    sendForm();
