const checkNumber = () => {
    const calcItem = document.querySelector('.calc-item');
    calcItem.addEventListener('input', (event) => {
        let target = event.target;
        if (target.classList.contains('calc-item') && target.tagName !== 'SELECT') {
            target.value = target.value.replace(/\D/g, '');
        };
    });

};

export default checkNumber;