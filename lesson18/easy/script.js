window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
        



    function getTimeRemaining() {
    let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        }
    }

    function updateClock() {

        let timer = getTimeRemaining(),
        formHours = timer.hours,
        formMinutes = timer.minutes,
        formSeconds = timer.seconds;
        if (formHours < 10) formHours = '0' + formHours;
        timerHours.textContent = formHours;
        if (formMinutes < 10) formMinutes = '0' + formMinutes;
        timerMinutes.textContent = formMinutes;
        if (formSeconds < 10) formSeconds = '0' + formSeconds;
        timerSeconds.textContent = formSeconds;

        
    }
    
    updateClock();
    
    let timer = setInterval(updateClock, 1000);
    let timeRemainingCheck = getTimeRemaining();
    if (timeRemainingCheck.timeRemaining < 0) {
        clearInterval(timer);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
    }

    }
    
    countTimer('02 march 2020');

    //меню

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              btnClose = document.querySelector('.close-btn'),
              menuItem = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }

        btnMenu.addEventListener('click', handlerMenu);
        btnClose.addEventListener('click', handlerMenu);

        menuItem.forEach((elem) => elem.addEventListener('click', handlerMenu));

    }

    toggleMenu();


    const togglePopUp = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupBtnClose = document.querySelector('.popup-close');
        popup.style.display = `block`;
        popup.style.transform = `translateX(-100%)`;
        
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                let start = Date.now();

                let timer = setInterval(function() {
                    let timePassed = Date.now() - start;
                    popup.style.transform = `translateX(${timePassed / 60}%)`;

                    if (timePassed > 1000) clearInterval(timer);
                }, 30);
            });
        });
        
        popupBtnClose.addEventListener('click', () => {
            popup.style.transform = `translateX(-100%)`;
        })

    }

    togglePopUp();
});