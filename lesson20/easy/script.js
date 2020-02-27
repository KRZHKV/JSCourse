window.addEventListener('DOMContentLoaded', function () {
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
                menu.addEventListener('click', (event) => {
                    let target = event.target;
                    if (target.classList.contains('close-btn')) {
                        handlerMenu();
                    } else {
                        target = target.closest('li');
                        if (!target) {
                            handlerMenu;
                        }
                    }
                })

            }

            toggleMenu();


            const togglePopUp = () => {
                const popup = document.querySelector('.popup');
                const popupBtn = document.querySelectorAll('.popup-btn');
                const popupBtnClose = document.querySelector('.popup-close');
                const popupContent = document.querySelector('.popup-content');


                const showPopup = () => {
                    popup.style.display = 'block'; // показать попап
                    if (window.innerWidth > 768) { // если ширина экрана больше заданного числа, то запустить анимацию
                        let start = Date.now(); // получить стартовое время анимации (в момент клика)
                        let timer = setInterval(() => {
                            let timePassed = Date.now() - start; // запуск таймера, отнять от текущего реального времени стартовое время, после клика
                            if (timePassed >= 800) {
                                clearInterval(timer); // если время достигло определенного числа удалить setInterval 
                                return;
                            }
                            draw(timePassed); // отрисовка анимации 
                        });
                        let draw = (timePassed) => {
                            let wContent = +getComputedStyle(popupContent).width.split('px')[0]; // получить стили попап контента (блок с самой формой, а не вся обёртка, с попап )
                            wContent = -wContent / 2 + 50 + 'px'; // данные для центрирования по горизонтали
                            popupContent.style.left = timePassed / 16 + '%'; // центрирование по горизонтали
                            popupContent.style.marginLeft = wContent; // центрирование по горизонтали
                        };
                    } else {
                        popupContent.style.left = '49.875%';
                        popupContent.style.margin = '-150px';
                    }
                };

                popupBtn.forEach((elem) => {
                    elem.addEventListener('click', showPopup);

                });


                popup.addEventListener('click', (event) => {
                        let target = event.target;
                        if (target.classList.contains('popup-close')) {
                                popup.style.display = `none`;
                            } else {
                                target = target.closest('.popup-content');
                                if (!target) {
                                    popup.style.display = 'none';
                                }
                            }

                        })
                }

                togglePopUp();

                //табы
                const tabs = () => {
                    const tabHeader = document.querySelector('.service-header'),
                        tab = tabHeader.querySelectorAll('.service-header-tab'),
                        tabContent = document.querySelectorAll('.service-tab');


                    const toggleTab = (index) => {
                        for (let i = 0; i < tabContent.length; i++) {
                            if (index === i) {
                                tab[i].classList.add('active');
                                tabContent[i].classList.remove('d-none');
                            } else {
                                tab[i].classList.remove('active');
                                tabContent[i].classList.add('d-none');
                            }
                        }
                    }

                    tabHeader.addEventListener('click', (event) => {
                        let target = event.target;
                        //closest проверят есть ли у элемента или у родителя данный параметр
                        target = target.closest('.service-header-tab');
                        if (target) {
                            tab.forEach((item, i) => {
                                if (item === target) {
                                    toggleTab(i);
                                }
                            });

                        }
                    })



                }
                tabs();

                //Слайдер

                const slider = () => {
                    const slide = document.querySelectorAll('.portfolio-item'),
                          btn = document.querySelectorAll('.portfolio-btn'),
                        //   dot = document.querySelectorAll('.dot'),
                          slider = document.querySelector('.portfolio-content'),
                          dotWrapper = document.querySelector('.portfolio-dots');

                    let dot = document.createElement('li');
                    dot.classList.add('dot');

                    let currentSlide = 0,
                        interval;
                    
                    function slideDotAdd() {
                        let cloneDot = dot.cloneNode();
                        for (let i = 0; i < slide.length; i++) {
                              dotWrapper.appendChild(cloneDot);
                            };
                        }
                    slideDotAdd();
                    const prevSlide = (elem, index, strClass) => {
                        elem[index].classList.remove(strClass);
                    };

                    const nextSlide = (elem, index, strClass) => {
                        elem[index].classList.add(strClass);
                    };

                    const autoPlaySlide = () => {
                        prevSlide(slide, currentSlide, 'portfolio-item-active');
                        prevSlide(dot, currentSlide, 'dot-active');
                        currentSlide++;
                        if(currentSlide >= slide.length) {
                            currentSlide = 0;
                        }
                        nextSlide(slide, currentSlide, 'portfolio-item-active');
                        nextSlide(dot, currentSlide, 'dot-active');
                    };

                    const startSlide = (time = 3000) => {
                        interval = setInterval(autoPlaySlide, time);

                    };

                    const stopSlide = ( ) => {
                        clearInterval(interval);
                    }

                    slider.addEventListener('click', (event) => {
                        event.preventDefault();

                        let target = event.target;

                        if(!target.matches('.portfolio-btn, .dot')) {
                            return;
                        }

                        prevSlide(slide, currentSlide, 'portfolio-item-active');
                        prevSlide(dot, currentSlide, 'dot-active');

                        if(target.matches('#arrow-right')) {
                            currentSlide++;
                        }else if(target.matches('#arrow-left')) {
                            currentSlide--;
                        } else if (target.matches('.dot')) {
                            dot.forEach( (elem, index) => {
                                if (elem === target) {
                                    currentSlide = index;
                                }
                            });
                        }
                        if(currentSlide >= slide.length) {
                            currentSlide = 0;
                        }
                        if(currentSlide < 0) {
                            currentSlide =  slide.length - 1;
                        }
                        nextSlide(slide, currentSlide, 'portfolio-item-active');
                        nextSlide(dot, currentSlide, 'dot-active');
                    });

                    slider.addEventListener('mouseover', (event) => {
                        if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                            stopSlide();
                        }
                    });

                    slider.addEventListener('mouseout', (event) => {
                        if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                            startSlide();
                        }
                    })


                    startSlide(1500);



                }

                slider();


            });