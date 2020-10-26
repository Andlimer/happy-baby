(function() {
  const forms = document.querySelectorAll('.form'),
    phone = document.querySelectorAll('input[name=phone]'),
    loadMessage = 'Идет отправка...',
    errorMessage = 'Отправить письмо не удалось, повторите запрос позже',
    successMessage = 'Письмо успешно отправлено';

  phone.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^0-9\+]/, '');
      item.value = item.value.substr(0, 12);
    });
  });

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const overlayClose = document.querySelector('.overlay__close'),
        overlay = document.querySelector('.overlay'),
        overlayMessage = document.querySelector('.overlay__message');

      overlay.style.display = 'flex';
    
      overlayClose.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
    
      overlay.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target === overlay) {
          overlayClose.click();
        }
      });

      let formData = new FormData(form);
      const xhr = new XMLHttpRequest();
      overlayMessage.textContent = loadMessage;
      xhr.responseType = 'json';
      xhr.open('POST', 'http://andlimer.ru/sendmail.php');
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.send(formData);

      xhr.addEventListener('load', () => {
        if (xhr.response.status === 200 || xhr.response.status === 1) {
          overlayMessage.textContent = errorMessage;
        } else {
          overlayMessage.textContent = successMessage;
          form.reset();
        }
      });
    });
  });
})();