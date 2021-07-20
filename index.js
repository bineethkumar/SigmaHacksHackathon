const taskContainer = document.querySelector(".task__container");
//console.log(taskContainer);

let globalStore = [];

const generateNewCard = (taskData) => `
<div class = "col-md-6 col-lg-4">
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success" id =${taskData.id} onclick = "editTask.apply(this , arguments)"><i class="far fa-edit" id =${taskData.id} onclick = "editTask.apply(this , arguments)"></i></button>
        <button type="button" class="btn btn-outline-danger" id =${taskData.id} onclick = "deleteCard.apply(this , arguments)"><i class="far fa-trash-alt" id =${taskData.id} onclick = "deleteCard.apply(this , arguments)"></i></button>
      </div>
      <img src= ${taskData.imageUrl} class="card-img-top" alt="CardImage">
      <div class="card-body">
        <h5 class="card-title">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
      <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end"id =${taskData.id} onclick = "openTask.apply(this , arguments)">Open Task</button>
      </div>
    </div>
  </div>
  `;

const loadInitialCardData = () => {
    const getCardData = localStorage.getItem("TaskMan");

    const {cards} = JSON.parse(getCardData);

    cards.map((cardObject) => { 
        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
        globalStore.push(cardObject);
    })
};
const updateLocalStorage = () =>
  localStorage.setItem("TaskMan", JSON.stringify({ cards: globalStore }));

const saveChanges = () => {
    const taskData = {
        id : `${Date.now()}`,
        imageUrl : document.getElementById("image__url").value,
        taskTitle : document.getElementById("task__title").value,
        taskType : document.getElementById("task__type").value,
        taskDescription : document.getElementById("task__description").value,
    };
    // console.log(taskData);
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
    
    globalStore.push(taskData);

    localStorage.setItem("TaskMan",JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    //localStorage.setItem("TaskMan",JSON.stringify({cards:globalStore}));
    updateLocalStorage();
    if(tagname=== "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

    }
    //taskContainer.removeChild(document.getElementById(targetID));

};

//for editing an existing task
const editTask = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const type = event.target.tagName;
  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;
  if (type === "BUTTON") {
    parentNode = event.target.parentNode.parentNode;
  } else {
    parentNode = event.target.parentNode.parentNode.parentNode;
  }
  taskTitle = parentNode.childNodes[5].childNodes[1];
  taskDescription = parentNode.childNodes[5].childNodes[3];
  submitButton = parentNode.childNodes[7].childNodes[1];
  taskType = parentNode.childNodes[5].childNodes[5];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.innerHTML = "Save Changes";
};
//for saving an edited task
const saveEdit = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const type = event.target.tagName;
  let parentNode;
  if (type === "BUTTON") {
    parentNode = event.target.parentNode.parentNode;
  } else {
    parentNode = event.target.parentNode.parentNode.parentNode;
  }
  let taskTitle = parentNode.childNodes[5].childNodes[1];
  let taskDescription = parentNode.childNodes[5].childNodes[3];
  let submitButton = parentNode.childNodes[7].childNodes[1];
  let taskType = parentNode.childNodes[5].childNodes[5];

  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };
  
  globalStore = globalStore.map((task) => {
    if(task.id === targetID){
      return {
        id : task.id,
        imageUrl : task.imageUrl,
        taskTitle : updateData.taskTitle,
        taskType : updateData.taskType,
        taskDescription : updateData.taskDescription,
      };
    }
    return task;
  });
  updateLocalStorage();   
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.removeAttribute("onclick");
  submitButton.innerHTML = "Open Task";
};
//for searching a task
const searchTask = (event) => {
  if(!event) event = window.event;
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.firstChild);
  }

  const resultData = state.globalStore.filter(({ task__title }) =>
    task__title.includes(event.target.value)
  );

  resultData.map((taskData) => {
    taskContainer.insertAdjacentHTML("beforeend", taskData(taskData));
  });
};
//for opening a task
const openTask = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const getTask = state.taskList.filter(({targetID}) => id === event.target.id);
  taskModal.innerHTML = htmlModalContent(getTask[0]);
};