{
  //VARYABLES
  let taskList = document.querySelector('.task-list');
  let removeList = document.querySelector('.remove-list');

  //////////////////////////////////////////////////////////////////////////////
  //ПЕРЕМЕННЫЕ ДЛЯ ЗАГРУЗКИ СТАРЫХ ЗАДАЧ
  //////////////////////////////////////////////////////////////////////////////
  let storage = JSON.parse(localStorage.getItem('tasks'));
  let todos = [];

  if (storage !== null) {
    for (let i = 0; i < storage.length; i++) {
      todos.push(storage[i])
    }
  };
  console.log(todos);


  let storageChecked = JSON.parse(localStorage.getItem('tasksChecked'));
  let todosChecked = [];

  if (storageChecked !== null) {
    for (let i = 0; i < storageChecked.length; i++) {
      todosChecked.push(storageChecked[i]);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////
  //ЗАГРУЗКА СТРАНИЦЫ
  ///////////////////////////////////////////////////////////////////////////////
   if (todos.length != 0) {
     for (let i = 0; i < todos.length; i++) {
       taskList.appendChild(handlerNewTaskBody(todos[i]));
     }
   }


   if (todosChecked.length != 0) {
     for (let i = 0; i < todosChecked.length; i++) {
       let currentTask = handlerNewTaskBody(todosChecked[i]);
       let currentCheckbox = currentTask.querySelector('input');
       currentCheckbox.checked = true;
       removeList.appendChild(currentTask);
     }
   }

  //////////////////////////////////////////////////////////////////////////////

  //Добавление и изменение новых задач

  function handlerNewTaskBody (currentValue, array) {
    //let currentValue = addNewTask.value;
    if (currentValue !== "") {
      let thisTask = newTask(currentValue);
      let changeBtn = thisTask.querySelector('.task-list__change-btn');
      let thisTaskLabel = thisTask.querySelector('.task-list__task-name');
      let checkbox = thisTask.querySelector('.task-list__input-box');

      checkbox.addEventListener('change', function (evt){
        let checkboxHandler = function (arrayPush, arraySplice) {
          for (let i = 0; i < arraySplice.length; i++) {
            if (arraySplice[i].includes(thisTaskLabel.textContent) == true) {
              arrayPush.push(thisTaskLabel.textContent);
              arraySplice.splice([i], 1);
              let newItemChecked = JSON.stringify(todosChecked);
              localStorage.setItem('tasksChecked', newItemChecked);
              let newItem = JSON.stringify(todos);
              localStorage.setItem('tasks', newItem);
            }
          }
        };

        if (checkbox.checked) {
          checkboxHandler(todosChecked, todos);
          removeList.appendChild(thisTask);
        } else {
          checkboxHandler(todos, todosChecked);
          taskList.appendChild(thisTask);
        };
        console.log(todos);
        console.log(todosChecked);
      });

      let changeHandler = function (targetEvt) {
        changeBtn.addEventListener(targetEvt, function (evt) {
          let thisPopup = '';
          if (document.querySelector('.change-popup') == null) {
            let thisPopup = newPopup(thisTaskLabel.textContent, false);
            thisPopup.classList.remove('change-popup--hidden');
            let field = thisPopup.querySelector('.change-popup__field');
            let saveBtn = thisPopup.querySelector('.change-popup__save-btn');
            let removeBtn = thisPopup.querySelector('.change-popup__remove-btn');

            let saveEditHandler = () => {
              let saveHandlerInnerIf = function (array, key) {
                for (let i = 0; i < array.length; i++) {
                  if (array[i].includes(thisTaskLabel.textContent) == true) {
                    array.splice([i], 1);
                    thisTaskLabel.textContent = field.value;
                    array.splice([i], 0, thisTaskLabel.textContent);
                    let newItem = JSON.stringify(array);
                    localStorage.setItem(key, newItem);
                  }
                }
              }

              if (thisTask.parentNode == taskList) {
                saveHandlerInnerIf(todos, 'tasks');
              } else if (thisTask.parentNode == removeList) {
                saveHandlerInnerIf(todosChecked, 'tasksChecked');
              }

              thisPopup.remove();
            };

            field.addEventListener('change', saveEditHandler);
            saveBtn.addEventListener(targetEvt,  saveEditHandler);

            removeBtn.addEventListener(targetEvt, function() {
              let removeHandlerInnerIf = function (array, key) {
                for (let i = 0; i < array.length; i++) {
                  if (array[i].includes(thisTaskLabel.textContent) == true) {
                    array.splice([i], 1);
                    let newItem = JSON.stringify(array);
                    localStorage.setItem(key, newItem);
                  }
                }
              };

              if (thisTask.parentNode == taskList) {
                removeHandlerInnerIf(todos, 'tasks');
              } else if (thisTask.parentNode == removeList) {
                removeHandlerInnerIf(todosChecked, 'tasksChecked');
              }

              thisTask.remove();
              thisPopup.remove();
            });
          }
        })
      }

      changeHandler('click');
      changeHandler("touchstart");

      if (array) {
        array.push(thisTaskLabel.textContent);
        const newItem = JSON.stringify(array);
        localStorage.setItem('tasks', newItem);
      }

      return thisTask;
    }
  };

  let addNewTask = document.querySelector('.task-list__field');
  let addBtn = document.querySelector('.task-list__btn');

  let addBtnHandler = function (targetEvt) {
    addBtn.addEventListener(targetEvt, function () {
      handlerNewTaskBody(addNewTask.value, todos);
      addNewTask.value = "";
    });
  }

  addBtnHandler('click');
  addBtnHandler('touchstart');

  addNewTask.addEventListener('keydown', function (evt){
    if (evt.key == 'Enter') {
      handlerNewTaskBody(addNewTask.value, todos);
      addNewTask.value = "";
    }
  });


  //////////////////////////////////////////////////////////
  //ОЧИСТКА СПИСКА ЗАДАЧ
  //////////////////////////////////////////////////////////

  let removeAllBtn = document.querySelector('.menu-list__button--remove-all');
  let removeDoneBtn = document.querySelector('.menu-list__button--remove-done');
  let clearAll = document.querySelector('.menu-list__button--clear-all');

  let removeBtnHandler = function (targetEvt) {
    removeAllBtn.addEventListener(targetEvt, function () {
      let taskList = document.querySelector('.task-list').children;
      let removeList = document.querySelector('.remove-list').children;

      for (let i = taskList.length - 1; i > -1; i--) {
        taskList[i].remove();
      };
      for (let i = removeList.length - 1; i > -1; i--) {
        removeList[i].remove();
      };

      todos = [];
      localStorage.setItem('tasks', JSON.stringify(todos));

      todosChecked = [];
      localStorage.setItem('tasksChecked', JSON.stringify(todosChecked));

      localStorage.setItem('captionName', '');
      document.querySelector('.main-name__caption').textContent = 'Название списка';
    });

    removeDoneBtn.addEventListener(targetEvt, function () {
      let removeList = document.querySelector('.remove-list').children;
      for (let i = removeList.length - 1; i > -1; i--) {
        removeList[i].remove();
      };
      todosChecked = [];
      let newItem = JSON.stringify(todosChecked);
      localStorage.setItem('tasksChecked', newItem);
    });

    clearAll.addEventListener(targetEvt, function () {
      localStorage.clear();
    });
  }

  removeBtnHandler('click');
  removeBtnHandler('touchstart');

}
