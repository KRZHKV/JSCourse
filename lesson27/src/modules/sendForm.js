const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка',
        successMessage = 'Спасибо, мы скоро с вами связжемся';

    const forms = document.querySelectorAll('form');

    let statusMessage = document.createElement('div');
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
            postData(body)
            .then((response) => {
                if(response.status !== 200) {
                    throw new Error('status network not 200');
                }   
                console.log(response);
                statusMessage.textContent = successMessage;
                statusMessage.style.cssText = 'color: green;';
                for (let i = 0; i < formValues.length; i++) {
                    formValues[i].value = '';
                };
                setTimeout(clearInput, 3000);
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                statusMessage.style.cssText = 'color: red;';
                console.error(error);
                setTimeout(clearInput, 3000);

                
            });
            const clearInput = () => {
                statusMessage.textContent = '';
            }
                
            
        });

    });

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        

    };

};

export default sendForm;