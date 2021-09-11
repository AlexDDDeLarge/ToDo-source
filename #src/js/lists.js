{

  //Accordeon
  let accordeon = document.querySelector('.menu-list__button-open-list');
  let itemAcc = document.querySelector('.menu-list__item-open-list');
  accordeon.onclick = function () {
    this.classList.toggle('active');
    itemAcc.classList.toggle('active');
    this.nextElementSibling.classList.toggle('show');
  }

  //Functions

  function newElem (tagName, className, attributeName, attributeValue) {
    let elem = document.createElement(tagName);
    elem.classList.add(className);
    elem.setAttribute(attributeName, attributeValue);
    return elem;
  }

  //Add new list
  let addField = document.querySelector('.menu-list__field');
  let btnContainer = document.querySelector('.menu-list__item--btn-container');
  let subList = document.querySelector('.menu-sublist');
  let cancelBtn = document.querySelector('.menu-list__cancel-btn');
  let addBtn = document.querySelector('.menu-list__add-btn');
  let count = 0;
  let caption = document.querySelector('.main-name__caption');

  addField.addEventListener('focus', function (evt) {
    btnContainer.classList.add('show');
  });

  addBtn.addEventListener('click', function (evt) {
    let item = newElem('li', 'menu-sublist__item');
    let btn = newElem('button', 'menu-sublist__btn');
    let newId = 'b' + String(count++);
    btn.id = newId;
    btn.textContent = addField.value;

    btn.addEventListener('click', function (evt) {
      caption.textContent = btn.textContent;
    });

    item.appendChild(btn);

    subList.appendChild(item);

    addField.value = '';
    btnContainer.classList.remove('show');
  });

  cancelBtn.addEventListener('click', function (evt) {
    addField.value = '';
    btnContainer.classList.remove('show');
  });


}
