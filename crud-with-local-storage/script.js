let btnSave = document.getElementById("btnSave"),
  btnClear = document.getElementById("btnClear"),
  btnEdit = document.getElementById("btnEdit"),
  btnCancel = document.getElementById("btnCancel"),
  display = document.getElementById("blogDisplay"),
  task = document.getElementById("task"),
  taskForEdit = document.getElementById("taskForEdit"),
  editModal = document.getElementById("editModal"),
  key,
  todo;

for (let i = 0; i < localStorage.length; i++) {
  key = localStorage.key(i);
  todo = JSON.parse(localStorage.getItem(key));
  display.innerHTML += `<li>
  ${todo.task}
 <button class="edit" onclick="editTask(${key})" id="${key}"> Edit </button>
 <button class="delete" onclick="deleteTask(${key})"> Delete </button>
  </li>`;
}

btnSave.onclick = () => {
  task = task.value;
  idTime = new Date().getTime();
  if (task) {
    data = { task: `${task}` };
    localStorage.setItem(idTime, JSON.stringify(data));
  }
  location.reload();
};

btnClear.onclick = () => {
  if (confirm("Are you really sure about this?")) {
    localStorage.clear();
    location.reload();
  }
};

btnCancel.onclick = () => {
  location.reload();
};

function deleteTask(id) {
  if (confirm("Are you sure about this?")) {
    localStorage.removeItem(id)
    location.reload();
  }
}

function editTask(id) {
  editModal.style.visibility = 'visible';
  btnEdit.dataId = id;
  todo = JSON.parse(localStorage.getItem(id));
  taskForEdit.value = todo.task;
}

btnEdit.onclick = () => {
  taskForEdit = taskForEdit.value;
  if (taskForEdit) {
    data = { task: `${taskForEdit}` };
    localStorage.setItem(btnEdit.dataId, JSON.stringify(data));
  }
  location.reload();
};