const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = []; // State management array

// Add task (Create)
function addTask() {
  const taskText = taskInput.value.trim();

  // Validation
  if (taskText === "") {
    console.log("Empty task not allowed");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = "";
}

// Render tasks (Read)
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.innerText = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = task.id;

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  console.log(tasks);
}

// Update (Mark complete)
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Delete (Event Delegation)
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.dataset.id);
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
});

// Button click
addBtn.addEventListener("click", addTask);

// Enter key support
taskInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
