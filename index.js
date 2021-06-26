const taskContainer = document.querySelector(".task__container");
//console.log(taskContainer);

let globalStore = [];

const generateNewCard = (taskData) => `
<div class = "col-md-6 col-lg-4">
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-outline-danger" id =${taskData.id} onclick = "deleteCard.apply(this , arguments)"><i class="far fa-trash-alt" id =${taskData.id} onclick = "deleteCard.apply(this , arguments)"></i></button>
      </div>
      <img src= ${taskData.imageUrl} class="card-img-top" alt="CardImage">
      <div class="card-body">
        <h5 class="card-title">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
      <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
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