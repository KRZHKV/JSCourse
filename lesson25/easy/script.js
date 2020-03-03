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
                    };
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
            };
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
                };
            };

        });
    };

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
                };
            };
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            //closest проверят есть ли у элемента или у родителя данный параметр
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTab(i);
                    };
                });

            };
        });



    };
    tabs();

    //Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dotWrapper = document.querySelector('.portfolio-dots');


        let currentSlide = 0,
            interval;
        //динамическое добавление слайдов
        const slideDotAdd = () => {
            slide.forEach((elem, index) => {
                elem[index] = document.createElement('li');
                elem[index].classList.add('dot');
                if (elem[index] === elem[0]) {
                    elem[0].classList.add('dot-active');
                }
                dotWrapper.appendChild(elem[index]);
            });

        };
        slideDotAdd();

        let dot = document.querySelectorAll('.dot');

        //предыдущий слайд
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        //следующий слайд
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            };
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);

        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            };

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    };
                });
            };
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            };
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            };
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            };
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            };
        });


        startSlide(1500);

    }

    slider();

    const changePhoto = () => {
        let command = document.querySelector('.command');
        command.addEventListener('mouseover', (event) => {
            const oldPhoto = event.target.src;
            if (event.target.classList.contains('command__photo')) {
                event.target.src = event.target.dataset.img;
            }
            command.addEventListener('mouseout', (event) => {
                if (event.target.classList.contains('command__photo')) {
                    event.target.src = oldPhoto;
                };
            });
        });


    }
    changePhoto();

    const checkNumber = () => {
        const calcItem = document.querySelector('.calc-item');
        calcItem.addEventListener('input', (event) => {
            let target = event.target;
            if (target.classList.contains('calc-item') && target.tagName !== 'SELECT') {
                target.value = target.value.replace(/\D/g, '');
            };
        });

    };

    checkNumber();

    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');


        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value;
            let squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            };

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            };

            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            };

            totalValue.textContent = total;

        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            // if (target.matches('.calc-type') || target.matches('.calc-square')
            //  || target.matches('.calc-day')
            //  || target.matches('.calc-count')) {

            //  }

            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
                countSum();
            };
        });

    };

    calc(100);

    //send ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка',
            successMessage = 'Спасибо, мы скоро с вами связжемся';

        const forms = document.querySelectorAll('form');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: #ffffff';


        const inputPhone = document.querySelectorAll('input[type=tel]'),
            inputName = document.querySelectorAll('input[type=text]'),
            inputText = document.querySelector('input[class=mess]');

        inputPhone.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^\+*?\d]/gi, '');
            });
        });

        inputName.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^А-я]/, '');
            });
        });

        inputText.addEventListener('input', () => {
            inputText.value = inputText.value.replace(/[^А-я]/, '');
        });


        forms.forEach((elem) => {
            elem.addEventListener('submit', (event) => {
                event.preventDefault();
                elem.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                statusMessage.style.cssText = 'color: #ffffff;';
                const formData = new FormData(elem);
                let body = {};
                let formValues = elem.querySelectorAll('input');

                formData.forEach((value, key) => {
                    body[key] = value;
                });
                postData(body,
                    () => {
                        statusMessage.textContent = successMessage;
                        statusMessage.style.cssText = 'color: green;';
                    },
                    (error) => {
                        statusMessage.textContent = errorMessage;
                        statusMessage.style.cssText = 'color: red;';
                        console.error(error);
                    });
                for (let i = 0; i < formValues.length; i++) {
                    formValues[i].value = '';
                };
            });

        });

            const postData = new Promise((body, resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(error);
                    };
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(body));
            });

    };

    sendForm();

});