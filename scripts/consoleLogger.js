document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid, которое диспатчит validation.js
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;      // Получаем данные формы из события
        console.clear();                    // Очищаем консоль для наглядности (опционально)
        
        // Построчный вывод данных
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Сообщение:', formData.message || '(не заполнено)');
        
        // Вывод временной метки    
        const timestamp = new Date().toLocaleString();
        console.log('Время отправки:', timestamp);
    });
});