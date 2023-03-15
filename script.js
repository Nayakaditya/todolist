// window.alert("Make sure you have proper internet connection");
// List container to append their list children
const listContainer = document.querySelector(".list-container");
// Extract form from html so that we can submit that form so,
const createListForm = document.querySelector(".create_list_form");
// input field for extracting value
const inputField = document.querySelector(".inputField");

const totalTask = document.getElementById("totalTask");

// An event listner for submitting form
createListForm.addEventListener("submit", (e) => {
  // prevent default submission
  e.preventDefault();
  const listItem = createList(inputField.value); // creating a list item variable which will run createList function and store form value in it
  listContainer.appendChild(listItem); // and then add it to the list container class
  // save listItem to the localStorage
  const lists = JSON.parse(localStorage.getItem("lists")) || []; // creating an array of lists which will hold our data
  lists.push(inputField.value); // pushing input field value to an array of lists

  // and then set it to the local Storage of the browser
  localStorage.setItem("lists", JSON.stringify(lists));
  // after submitting, form will be empty or length will fall to 0
  inputField.value = "";
});

// function for creating list with a value
function createList(value) {
  // creating a new element call div with classes and data sets
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.dataset.key = new Date().getTime();
  listItem.dataset.aos = "fade-left";

  // creating a new list
  const li = document.createElement("li");
  listItem.appendChild(li);

  // a label for input
  const ipnutLabel = document.createElement("label");
  ipnutLabel.classList.add("checkbox-container");
  li.appendChild(ipnutLabel);

  // creating input and setting attribute to it
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "checkbox");
  input.onclick = isChecked; // if checkbox is checked function
  ipnutLabel.appendChild(input);

  // creating a new input for task value
  const task = document.createElement("input");
  task.setAttribute("type", "text");
  task.classList.add("task-text");
  task.setAttribute("value", value);
  li.appendChild(task);

  // function for checkbox, checking if checkbox is checked or not, if true add a class called completed otherwise remove it
  function isChecked() {
    if (input.checked == true) {
      task.classList.add("completed");
      listItem.classList.add("bg-red");
    } else {
      task.classList.remove("completed");
      listItem.classList.remove("bg-red");
    }
  }

  // delete button for every task
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete-btn");
  li.appendChild(deleteBtn);

  // creating a button icon with class and appending it to the delete-btn class
  const deleteBtnIcon = document.createElement("i");
  deleteBtnIcon.classList.add("fa-sharp", "fa-solid", "fa-circle-xmark");
  deleteBtn.appendChild(deleteBtnIcon);

  // Adding an event listener for deleting a list with a click
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
  });

  // finally return the list items from lsists
  return listItem;
}

// adding an event listener so that when browser will reload the content it will load every data from localStorage and append it to the list container and we can see our lists
window.addEventListener("load", () => {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];

  lists.forEach((list) => {
    // iterating over each list
    const listItem = createList(list);
    listContainer.appendChild(listItem); // and appending it to the list contaienr
  });

  // length of the array lists
  totalTask.innerText = lists.length;
});