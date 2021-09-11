{
let button = document.getElementsByClassName("menu-btn");
let menu = document.querySelector(".menu");
let mainContent = document.querySelector(".main-content");
let mainName = document.querySelector(".main-name__caption");

  let buttonHandler = function (elem, targetEvt) {
    elem.addEventListener(targetEvt, function (evt) {
      evt.preventDefault();
      menu.classList.toggle("menu-active");
      mainContent.classList.toggle("main-content-active");
      mainName.classList.toggle("main-name-active");
    });
  }

  for (let i = 0; i < button.length; i++) {
    buttonHandler(button[i], 'click');
    buttonHandler(button[i], 'touchstart');
  }


}
