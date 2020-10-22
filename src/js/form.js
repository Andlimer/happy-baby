(function() {
  
  const form = document.querySelector('.form-quest'),
    button = document.querySelector('.form-quest__btn');

  button.addEventListener('click', (e) => {
    e.preventDefault();

    let formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://andlimer.ru/sendmail.php');
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    console.log(formData);

    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if (xhr.response.status === 200 || xhr.response.status === 1) {
        console.log('send');
      }
    });
  });

})();