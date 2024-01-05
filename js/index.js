// Business Logic

class TodoList {
  constructor() {
    this.tasks = [];
    this.id = 1;
  }

  addTask(todoText) {
    this.tasks.push(new Task(todoText, this.id));
    this.id++;
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(todo => todo.id !== id);
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter(todo => !todo.completed);
  }

  getRemainingTaskCount() {
    return this.tasks.filter(todo => !todo.completed).length;
  }

  getTasks() {
    return this.tasks;
  }
}

class Task {
  constructor(taskText, id) {
    this.taskText = taskText;
    this.id = id;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

function seedTodoList(todoList) {
  todoList.addTask("Complete online JavaScript course");
  todoList.tasks[0].toggleCompleted();
  todoList.addTask("Jog around the park 3x");
  todoList.addTask("10 minutes meditation");
  todoList.addTask("Read for 1 hour");
  todoList.addTask("Pick up groceries");
  todoList.addTask("Complete Todo App on Frontend Mentor");
  renderTodoList(todoList);
}

function handleTodoCreateForm(e, todoList) {
  e.preventDefault();
  let taskText = document.getElementById("task-string").value;
  if (taskText === "") {
    alert("Please enter a todo item");
    return;
  }
  todoList.addTask(taskText);
  document.getElementById("task-string").value = "";
  renderTodoList(todoList);
}

function handleClearAllTasks(todoList) {
  todoList.clearCompletedTasks();
  renderTodoList(todoList);
}

// UI logic

function setDarkTheme() {
  document.getElementById("theme-switcher-icon").src = "../images/icon-sun.svg";

  // Set background
  document.documentElement.style.setProperty("--background-image", "url(./images/bg-mobile-dark.jpg)");
  document.documentElement.style.setProperty("--background-image-desktop", "url(./images/bg-desktop-dark.jpg)");
  document.documentElement.style.setProperty("--background-color", "hsl(235, 21%, 11%)");

  // Set colors
  document.documentElement.style.setProperty("--secondary-accent-color-light", "hsl(235, 21%, 11%)");

  // List colors
  document.documentElement.style.setProperty("--surface-background-color", "hsl(235, 24%, 19%)");
  document.documentElement.style.setProperty("--list-item-text", "hsl(234, 39%, 85%)");
  document.documentElement.style.setProperty("--text-secondary", "hsl(233, 14%, 35%)");
  document.documentElement.style.setProperty("--list-item-checkbox", "hsl(237, 14%, 26%)");
}

function setLightTheme() {
  document.getElementById("theme-switcher-icon").src = "../images/icon-moon.svg";

  // Set background
  document.documentElement.style.setProperty("--background-image", "url(./images/bg-mobile-light.jpg)");
  document.documentElement.style.setProperty("--background-image-desktop", "url(./images/bg-desktop-light.jpg)");
  document.documentElement.style.setProperty("--background-color", "hsl(0, 0%, 98%)");
  
  // Set colors
  document.documentElement.style.setProperty("--secondary-accent-color-light", "hsl(236, 33%, 92%)");

  // List colors
  document.documentElement.style.setProperty("--surface-background-color", "hsl(0, 0%, 98%)");
  document.documentElement.style.setProperty("--list-item-text", "hsl(235, 19%, 35%)");
  document.documentElement.style.setProperty("--text-secondary", "hsl(236, 9%, 61%)");
  document.documentElement.style.setProperty("--list-item-checkbox", "hsl(236, 33%, 92%)");
}

function toggleTheme() {
  localStorage.setItem("theme", localStorage.getItem("theme") === "dark" ? "light" : "dark");
  let updatedTheme = localStorage.getItem("theme");
  if (updatedTheme == "dark") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

function initializeTheme() {
  let currentTheme = localStorage.getItem("theme");

  // Set Default theme to light if it hasn't been set yet
  if (currentTheme == null) {
    localStorage.setItem("theme", "light");
    currentTheme = "light";
  }
  if (currentTheme == "dark") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

function createTaskListItemElement(task, todoList) {
  // Create the li element
  let li = document.createElement("li");
  li.className = "row todo-item";

  // Create the label element
  let label = document.createElement("label");
  label.className = "row padding-0";

  // Create the checkbox input element
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-item-checkbox";
  checkbox.id = `task-${task.id}`;
  checkbox.addEventListener("change", () => {
    task.toggleCompleted();
    renderTodoList(todoList);
  });

  if (task?.completed) {
    checkbox.checked = true;
  }

  // Create the span element
  let span = document.createElement("span");
  span.textContent = task.taskText;

  // Create the button element
  let button = document.createElement("button");
  button.className = "todo-item-button";
  button.addEventListener("click", () => {
    todoList.removeTask(task.id);
    renderTodoList(todoList);
  });

  // Create the img element
  let img = document.createElement("img");
  img.src = "./images/icon-cross.svg";
  img.alt = "Delete icon for todo task.";
  img.className = "close-icon";

  // Append the checkbox and span to the label
  label.appendChild(checkbox);
  label.appendChild(span);

  // Append the img to the button
  button.appendChild(img);

  // Append the label and button to the li
  li.appendChild(label);
  li.appendChild(button);

  return li;
}

function createEmptyTaskListItemElement() {
  // Create the li element
  let li = document.createElement("li");
  li.className = "row todo-item";

  // Create the label element
  let label = document.createElement("label");
  label.className = "row padding-0 center";

  // Create the span element
  let span = document.createElement("span");
  span.className = "center empty-item"
  span.textContent = "No tasks here...";

  // Append the span to the label
  label.appendChild(span);
  li.appendChild(label);

  return li;
}

function renderTodoList(todoList) {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = "";

  // Get filter value
  const activeFilterButton = document.querySelector(".item-filter-list-button.item-filter-active");
  const activeFilter = activeFilterButton ? activeFilterButton.textContent.toLowerCase().trim() : "";

  let tasks = todoList.getTasks();
  if (activeFilter === "active") {
    tasks = tasks.filter(task => !task.completed);
  } else if (activeFilter === "completed") {
    tasks = tasks.filter(task => task.completed);
  }

  if (tasks.length === 0) {
    let li = createEmptyTaskListItemElement();
    todoListElement.appendChild(li);
  } else {
    tasks.forEach(task => {
      let li = createTaskListItemElement(task, todoList);
      todoListElement.appendChild(li);
    });
  }
  document.getElementById("task-count").innerText = todoList.getRemainingTaskCount();
}

// Add event listeners on page load

window.addEventListener('load', () => {
  initializeTheme();
  const todoList = new TodoList();
  seedTodoList(todoList);

  // Theme related event listeners
  document.getElementById("theme-switcher").addEventListener("click", () => toggleTheme());

  // Task related event listeners
  document.getElementById("todo-create-form").addEventListener("submit", (e) => handleTodoCreateForm(e, todoList));
  document.getElementById("clear-all-tasks-button").addEventListener("click", () => handleClearAllTasks(todoList));

  // - Add click event listener for each filter button
  const buttonsArr = Array.from(document.getElementsByClassName("item-filter-list-button"));
  console.log(buttonsArr)
  buttonsArr.forEach(button => {
    button.addEventListener("click", function() {
      // Remove active class from all buttons
      buttonsArr.forEach(btn => {
        btn.classList.remove("item-filter-active");
      });

      // Add active class to clicked button
      this.classList.add("item-filter-active");
      renderTodoList(todoList);
    });
  });
});