const form = document.querySelector("form");
let inputText = document.querySelector("#todoText");
const addButton = document.querySelector(".btn-info");
const todoLists = document.querySelector(".todolists");
let items;

//load the items
loadItems();
function loadItems() {
  items = getItemsFormLS();

  items.forEach(function (item) {
    createItem(item);
  });
}

//call event listeners
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  todoLists.addEventListener("click", removeItem);
}

//get items from Local Storage
function getItemsFormLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

//set item to local storage
function setItemToLS(text) {
  items = getItemsFormLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

//delete item from local storage
function deleteItemFromLS(text) {
  items = getItemsFormLS();

  items.forEach(function (item, index) {
    if (item == text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

//create new item
function createItem(text) {
  //create div
  let createTodo = document.createElement("div");
  createTodo.className = "input-group mb-3";

  //create input text
  let createTodoTextBox = document.createElement("input");
  createTodoTextBox.className = "form-control p-4";
  createTodoTextBox.setAttribute("type", "text");
  createTodoTextBox.setAttribute("placeholder", text);
  createTodoTextBox.setAttribute("disabled", text);

  //create div
  let inputGroupPrepend = document.createElement("div");
  inputGroupPrepend.className = "input-group-prepend";

  //create div
  let inputGroupText = document.createElement("div");
  inputGroupText.className = "input-group-text";

  //create input checkbox
  let inputGroupTextCheckbox = document.createElement("input");
  inputGroupTextCheckbox.setAttribute("type", "checkbox");
  inputGroupTextCheckbox.className = "remove";

  createTodo.appendChild(createTodoTextBox);
  createTodo.appendChild(inputGroupPrepend);
  inputGroupPrepend.appendChild(inputGroupText);
  inputGroupText.appendChild(inputGroupTextCheckbox);
  todoLists.appendChild(createTodo);
}
//add new item
function addNewItem(e) {
  if (inputText.value === "") {
    alert("Required");
  }
  //create item
  createItem(inputText.value);

  //save to localstorage
  setItemToLS(inputText.value);

  inputText.value = "";
  e.preventDefault();
}

//remove an item
function removeItem(e) {
  if (e.target.className == "remove") {
    if (confirm("Are you sure want to delete")) {
      e.target.parentElement.parentElement.parentElement.remove();

      //delete item from LS
      deleteItemFromLS(
        e.target.parentElement.parentElement.parentElement.children[0].getAttribute(
          "placeholder"
        )
      );
    }
  }
}
