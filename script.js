function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value !== "") {
    var li = document.createElement("li");
    li.textContent = taskInput.value;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      taskList.removeChild(li);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

// Optional: Add task when Enter key is pressed
document.getElementById("taskInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});