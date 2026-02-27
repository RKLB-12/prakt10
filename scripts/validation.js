
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackFormID');
    
    if (form) {
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
        
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
                el.classList.remove('is-danger');
            });
            document.querySelectorAll('.help.is-danger').forEach(el => el.remove());



            let noErrors = true;



            const fullname = document.getElementById('fullname')
            const fullname_value = document.getElementById('fullname').value.trim();
            const words = fullname_value.split(' ').filter(word => word.length > 0);
            if (fullname_value === '') {
                showError(fullname, 'Вы ничего не ввели');
                noErrors = false;
            }else if (words.length < 2) {
            // ошибка: недостаточно слов
                showError(fullname, 'Введите корректно фамилию, имя и отчество (при наличии)');
                noErrors = false;
            }



            const choose_email = document.getElementById('choose_email')
            const choose_email_value = choose_email.checked;
            
            const choose_phone = document.getElementById('choose_phone')
            const choose_phone_value = choose_phone.checked;
            
            const choose_email_phone  = document.getElementById('choose_email_phone')
            if (!choose_email_value && !choose_phone_value) {
                showError(choose_phone, 'Выберите хотя бы один метод обратной связи');
                noErrors = false;
            }




            const email = document.getElementById('email');
            const email_value = document.getElementById('email').value.trim(); // используем базовый шаблон для проверки почты
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email_value)) {
            // ошибка: неверный формат email
                showError(email, 'Эх, некорретный формат почты, пример для вас: example@mail.com');
                noErrors = false;
            }

            const phone = document.getElementById('phone')
            const phone_value = document.getElementById('phone').value.trim();
            const phoneDigits = phone_value.replace(/\D/g, ''); // удаляем все не-цифры
            if (phoneDigits.length < 10) {
            // ошибка: недостаточно цифр
                showError(phone, 'Формат такой и никакой другой: +7 (XXX) XXX-XX-XX');
                noErrors = false;
            }



            const header_message_value = document.getElementById('header_message').value.trim();
            if (header_message_value === '') {
                showError(header_message, 'Вы ничего не ввели');
                noErrors = false;
            }

            
            if(noErrors){
                const formData = {
                    fullname: fullname_value,
                    phone: phone_value,
                    email: email_value,
                    message: document.getElementById('message').value.trim() || '(не заполнено)'
                };
                const event = new CustomEvent('formValid', { detail: formData });
                document.dispatchEvent(event);
                alert('Форма отправлена! Данные в консоли.');
            }

        });
    }
    // Функция показа ошибки
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        input.parentNode.parentNode.appendChild(help);
    }
    // Сброс ошибки при вводе
    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const parent = this.parentNode.parentNode;
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
    });
});