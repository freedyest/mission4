const inputtodo = document.getElementById("inputtexttodo");
const inputdeadline = document.getElementById("inputdeadline");
const priority = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTaskBtn");
const listmenu = document.getElementById("listmenu");
const sortTask = document.getElementById("sortTask");
const deleteall = document.getElementById("deleteall");
const donelist = document.getElementById("donelist");
const tasklist = document.getElementById("tasklist");
const doneContainer = document.getElementById("doneContainer");

// Set time
const currentTime = document.getElementById("currentTime");
const now = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
currentTime.textContent =
  "Hari & Tanggal: " + now.toLocaleDateString("id-ID", options);

// Filter nav
const filternav = document.getElementById("filternav");
const filterLinks = filternav.querySelectorAll("a");

filterLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    filterLinks.forEach((l) => l.classList.remove("bg-slate-200"));
    link.classList.add("bg-slate-200");

    const filter = link.textContent.trim();
    const tasks = taskContainer.querySelectorAll("div");

    tasks.forEach((task) => {
      const checkbox = task.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      if (filter === "All") {
        task.style.display = "flex";
      } else if (filter === "Late") {
        const detail = task.querySelector("p");
        if (!detail) return;

        const match = detail.textContent.match(/Due:\s*([\d-]+)/);
        if (!match) return;

        const taskDate = new Date(match[1]);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (taskDate < today && !checkbox.checked) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      } else if (filter === "Done") {
        task.style.display = checkbox.checked ? "flex" : "none";
      }
    });
  });
});

// sorting function
sortTask.addEventListener("change", () => {
  const value = sortTask.value;

  // take only  items
  const taskItems = Array.from(taskContainer.children).filter((el) =>
    el.querySelector("h2")
  );

  let sortedTasks = [];

  if (value === "priority") {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
      high: 1,
      medium: 2,
      low: 3,
    };

    sortedTasks = taskItems.sort((a, b) => {
      const pa = priorityOrder[a.dataset.priority] || 99;
      const pb = priorityOrder[b.dataset.priority] || 99;
      return pa - pb;
    });
  } else if (value === "az") {
    sortedTasks = taskItems.sort((a, b) => {
      const ta = a.querySelector("h2").textContent.toLowerCase();
      const tb = b.querySelector("h2").textContent.toLowerCase();
      return ta.localeCompare(tb);
    });
  } else if (value === "za") {
    sortedTasks = taskItems.sort((a, b) => {
      const ta = a.querySelector("h2").textContent.toLowerCase();
      const tb = b.querySelector("h2").textContent.toLowerCase();
      return tb.localeCompare(ta);
    });
  } else {
    return;
  }

  sortedTasks.forEach((task) => taskContainer.appendChild(task));
});

// Filter date
const filterDate1 = document.getElementById("filterDate1");
const filterDate2 = document.getElementById("filterDate2");
const filterBtn = document.getElementById("filterBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");

//  Filter
filterBtn.addEventListener("click", () => {
  const startDate = filterDate1.value ? new Date(filterDate1.value) : null;
  const endDate = filterDate2.value ? new Date(filterDate2.value) : null;

  const tasks = taskContainer.querySelectorAll("div");

  tasks.forEach((task) => {
    const detail = task.querySelector("p");
    if (!detail) return;

    const match = detail.textContent.match(/Due:\s*([\d-]+)/);
    if (!match) return;

    const taskDate = new Date(match[1]);

    let show = true;
    if (startDate && taskDate < startDate) show = false;
    if (endDate && taskDate > endDate) show = false;

    if (show) {
      task.classList.remove("hidden");
    } else {
      task.classList.add("hidden");
    }
  });
});

// Clear Filter
clearFilterBtn.addEventListener("click", () => {
  filterDate1.value = "";
  filterDate2.value = "";

  const tasks = taskContainer.querySelectorAll("div");
  tasks.forEach((task) => {
    if (task.querySelector("p")) {
      task.classList.remove("hidden");
    }
  });
});

// confirm blank input
addTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const newvaluetask = inputtodo.value.trim();
  const newdeadline = inputdeadline.value.trim();
  const newpriority = priority.value;

  if (newvaluetask == "") {
    alert("Task tidak boleh kosong!");
    return;
  }
  if (newdeadline == "") {
    alert("Deadline harus diisi!");
    return;
  }
  if (newpriority == "priority") {
    alert("Silakan pilih priority!");
    return;
  }
  const taskitem = {
    tasktext: newvaluetask,
    deadline: newdeadline,
    priority: newpriority,
    checked: false,
  };

  addTask(taskitem);

  inputtodo.value = "";
  inputdeadline.value = "";
  priority.value = "priority";
});

const taskContainer = document.getElementById("taskContainer");

function addTask(taskitem) {
  const item1 = document.createElement("div");
  item1.className =
    "flex justify-between items-center border-b border-gray-300 py-2 md:mx-10";
  item1.dataset.priority = taskitem.priority;

  //info
  const item2 = document.createElement("div");
  item2.className = "flex items-center space-x-4 px-4 py-2";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // wrap info
  const item3 = document.createElement("div");

  //  deadline string
  const deadlineDate = new Date(taskitem.deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (deadlineDate < today) {
    item3.className = "text-red-500";
  } else {
    item3.className = "";
  }

  const title = document.createElement("h2");
  title.className = "text-lg font-semibold";
  title.textContent = taskitem.tasktext;

  const detail = document.createElement("p");
  detail.className = "text-gray-500";
  detail.textContent =
    "Due: " + taskitem.deadline + " | Priority: " + taskitem.priority;

  //checked task

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      item3.style.textDecoration = "line-through";
      item3.style.color = "gray";

      const emptyMsg = document.getElementById("emptyDoneMsg");
      if (emptyMsg) emptyMsg.remove();

      let exist = Array.from(doneContainer.querySelectorAll("h2")).some(
        (el) => el.textContent === title.textContent
      );

      if (!exist) {
        const doneItem = document.createElement("div");
        doneItem.className =
          "md:mx-10 done-item flex justify-between items-center py-2";

        const doneInfo = document.createElement("div");
        doneInfo.className = "flex items-center space-x-4 px-4 py-2";

        const doneText = document.createElement("div");

        const doneTitle = document.createElement("h2");
        doneTitle.className = "text-lg font-semibold";
        doneTitle.textContent = title.textContent;

        const doneDetail = document.createElement("p");
        doneDetail.className = "text-gray-500";
        doneDetail.textContent = detail.textContent;

        doneText.appendChild(doneTitle);
        doneText.appendChild(doneDetail);
        doneInfo.appendChild(doneText);
        doneItem.appendChild(doneInfo);

        doneContainer.appendChild(doneItem);
      }
    } else {
      item3.style.textDecoration = "none";
      item3.style.color = "";

      const doneItems = doneContainer.querySelectorAll("h2");
      doneItems.forEach((el) => {
        if (el.textContent === title.textContent) {
          el.closest(".done-item").remove();
        }
      });

      if (doneContainer.querySelectorAll(".done-item").length === 0) {
        const msg = document.createElement("p");
        msg.id = "emptyDoneMsg";
        msg.className = "text-gray-500 italic";
        msg.textContent = "Belum ada tugas yang selesai.";
        doneContainer.appendChild(msg);
      }
    }
  });

  // append info
  item3.appendChild(title);
  item3.appendChild(detail);

  item2.appendChild(checkbox);
  item2.appendChild(item3);

  //edit delete
  const item4 = document.createElement("div");
  item4.className = "flex space-x-2 px-4 py-2";

  const editBtn = document.createElement("button");
  editBtn.className = "bg-green-500 text-white px-3 py-1 rounded";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    openEditModal(item1, title, detail);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "bg-red-500 text-white px-3 py-1 rounded";
  deleteBtn.textContent = "Delete";

  // Delete click
  deleteBtn.addEventListener("click", () => {
    item1.remove();
  });

  item4.appendChild(editBtn);
  item4.appendChild(deleteBtn);

  // append all
  item1.appendChild(item2);
  item1.appendChild(item4);

  taskContainer.appendChild(item1);

  if (taskContainer.children.length !== 0) {
    const emptyMsg = document.getElementById("emptyTaskMsg");
    if (emptyMsg) emptyMsg.remove();
  }
}

// delete all task
deleteall.addEventListener("click", () => {
  if (confirm("Yakin ingin menghapus semua task?")) {
    taskContainer.innerHTML = "";
  } else {
    return;
  }
});
// Modal Edit Task
const editModal = document.getElementById("editModal");
const editTaskText = document.getElementById("editTaskText");
const editTaskDeadline = document.getElementById("editTaskDeadline");
const editTaskPriority = document.getElementById("editTaskPriority");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const saveEditBtn = document.getElementById("saveEditBtn");

let currentEditItem = null;

function openEditModal(item1, title, detail) {
  currentEditItem = { item1, title, detail };

  // field fill
  editTaskText.value = title.textContent;
  const match = detail.textContent.match(
    /Due:\s*([\d-]+)\s*\|\s*Priority:\s*(\w+)/
  );
  if (match) {
    editTaskDeadline.value = match[1];
    editTaskPriority.value = match[2].toLowerCase();
  }

  editModal.classList.remove("hidden");
  editModal.classList.add("flex");
}

function closeEditModal() {
  editModal.classList.remove("flex");
  editModal.classList.add("hidden");
  currentEditItem = null;
}

cancelEditBtn.addEventListener("click", closeEditModal);

saveEditBtn.addEventListener("click", () => {
  if (!currentEditItem) return;
  const { item1, title, detail } = currentEditItem;

  title.textContent = editTaskText.value;
  detail.textContent = `Due: ${editTaskDeadline.value} | Priority: ${editTaskPriority.value}`;
  item1.dataset.priority = editTaskPriority.value;

  const deadlineDate = new Date(editTaskDeadline.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const item3 = title.parentElement;
  if (deadlineDate < today) {
    item3.classList.add("text-red-500");
  } else {
    item3.classList.remove("text-red-500");
  }

  closeEditModal();
});
