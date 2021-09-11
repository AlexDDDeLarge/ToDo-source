let taskList = document.querySelector('.task-list');
let removeList = document.querySelector('.remove-list');
let count = 0;

function newElem (tagName, className, attributeName, attributeValue) {
  let elem = document.createElement(tagName);
  elem.classList.add(className);
  elem.setAttribute(attributeName, attributeValue);
  return elem;
}

function addId (elem, string) {
  elem.id = string + String(count++);
}

function addAttribute (elem, attributeName, attributeValue) {
  elem.setAttribute(attributeName, attributeValue);
}

function newTask (taskName) {
  let li = newElem('li', 'task-list__item');
  let label = newElem('label', 'task-list__task-name');
  let inputBox = newElem('input', 'task-list__input-box', 'type', 'checkbox');
  let checkbox = newElem('span', 'task-list__checkbox');
  let changeBtn = newElem('button', 'task-list__change-btn');

  inputBox.classList.add('visually-hidden');
  addId(inputBox, 'a');
  addAttribute(label, 'for', inputBox.id);

  li.appendChild(inputBox);
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(changeBtn);
  label.textContent = taskName;
  taskList.appendChild(li);
  return li;
}

function newPopup (value, caption) {
  let body = document.querySelector('body');
  let popup = newElem('div', 'change-popup');
  popup.classList.add('change-popup--hidden');
  let containerBtn = newElem('div', 'change-popup__container-btns');
  let containerEdit = newElem('div', 'change-popup__container');
  let removeBtn = '';
  if (caption === false) {
    removeBtn = newElem('button', 'change-popup__remove-btn');
  }
  let title = newElem('h3', 'change-popup__title');
  let field = newElem('input', 'change-popup__field', 'type', 'text');
  let saveBtn = newElem('button', 'change-popup__save-btn');

  field.value = value;
  saveBtn.textContent = 'Save';
  title.textContent = 'Edit:';
  containerEdit.classList.add("container");

  if (caption === false) {
    containerBtn.appendChild(removeBtn);
  }
  containerEdit.appendChild(title);
  containerEdit.appendChild(field);
  containerEdit.appendChild(saveBtn);
  popup.appendChild(containerBtn);
  popup.appendChild(containerEdit);
  body.appendChild(popup);

  return popup;
}
