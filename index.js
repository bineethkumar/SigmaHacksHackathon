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
        globalStore.push(taskData);
    })
};

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

    const newUpdatedArray = globalStore.filter((cardObject) => cardObject.id !== targetID);
    localStorage.setItem("TaskMan",JSON.stringify({cards:globalStore}));

    if(tagname=== "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

    }
    //taskContainer.removeChild(document.getElementById(targetID));

};
//for opening a task
const openTask = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const getTask = state.taskList.filter(({targetID}) => id === event.target.id);
  taskModal.innerHTML = htmlModalContent(getTask[0]);
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
  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  submitButton = parentNode.childNodes[5].childNodes[1];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};
//for saving an edited task
const saveEdit = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const parentNode = event.target.parentNode.parentNode;
  console.log(parentNode.childNodes);
  const taskTitle = parentNode.childNodes[3].childNodes[3];
  const taskDescription = parentNode.childNodes[3].childNodes[5];
  const submitButton = parentNode.childNodes[5].childNodes[1];
  const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };
  let stateCopy = state.taskList;
  stateCopy = stateCopy.map((task) =>
    task.id === targetID ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        } : task);

  state.taskList = stateCopy;
  updateLocalStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};
//for searching a task
const searchTask = (event) => {
  event = window.event;
  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }

  const resultData = state.taskList.filter(({ title }) =>
    title.includes(event.target.value)
  );

  resultData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
};
