{
  //кнопка изменения заголовка
  let changeBtn = document.querySelector('.main-name__change-btn');

  //заголовок
  let caption = document.querySelector('.main-name__caption');
  console.log(localStorage.length);
  if ((localStorage.length === 0) || (caption.textContent != 'Название списка')) {
    localStorage.setItem('captionName', '');
  }

  if (localStorage.getItem('captionName') != ''){
    caption.textContent = localStorage.getItem('captionName');
  }

  //ОБРАБОТЧИК СОБЫТИЙ КНОПКИ ИЗМЕНЕНИЯ НАЗВАНИЯ СПИСКА
  let changeHandler = function (targetEvt) {
    changeBtn.addEventListener(targetEvt, function (evt) {
      let thisPopup = '';
      if (document.querySelector('.change-popup') == null) {
        let thisPopup = newPopup(caption.textContent, true);
        thisPopup.classList.remove('change-popup--hidden');
        let field = thisPopup.querySelector('.change-popup__field');
        let saveBtn = thisPopup.querySelector('.change-popup__save-btn');

        // field.addEventListener('change', function() {
        //   let btnListName = document.getElementsByClassName('menu-sublist__btn');
        //
        //   for (let i = 0; i < btnListName.length; i++) {
        //     if (caption.textContent === btnListName[i].textContent && field.value != '') {
        //       caption.textContent = field.value;
        //       localStorage.setItem('captionName', caption.textContent);
        //       btnListName[i].textContent = field.value;
        //     }
        //   }
              // });

        field.addEventListener('keydown', function (evt){
          if (evt.key == 'Enter') {
            caption.textContent = field.value;
            localStorage.setItem('captionName', caption.textContent);
            thisPopup.remove();
          }
        });

        saveBtn.addEventListener(targetEvt, function() {
          caption.textContent = field.value;
          localStorage.setItem('captionName', caption.textContent);
          thisPopup.remove();
        });
        console.log('aaa');
      }
    });
  };

  changeHandler('click');
  changeHandler('touchstart');

}
