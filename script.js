let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const priorityInput = document.getElementById('priorityInput');
  const categoryInput = document.getElementById('categoryInput');

  if (taskInput.value.trim() !== '') {
    const newTask = {
      id: Date.now(),
      text: taskInput.value,
      completed: false,
      date: dateInput.value,
      time: timeInput.value,
      priority: priorityInput.value,
      category: categoryInput.value
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <span>${task.date} ${task.time}</span>
            <span>${task.priority}</span>
            <span>${task.category}</span>
            <button onclick="toggleTask(${task.id})">Toggle</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
    li.classList.add(`${task.priority}-priority`);
    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function searchTasks() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm) ||
    task.category.toLowerCase().includes(searchTerm) ||
    task.priority.toLowerCase().includes(searchTerm)
  );

  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <span>${task.date} ${task.time}</span>
            <span>${task.priority}</span>
            <span>${task.category}</span>
            <button onclick="toggleTask(${task.id})">Toggle</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
    li.classList.add(`${task.priority}-priority`);
    taskList.appendChild(li);
  });
}

document.getElementById('toggleTheme').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('searchButton').addEventListener('click', searchTasks);

renderTasks();