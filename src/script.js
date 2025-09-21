// variabel script js
const inputtodo = document.getElementById('inputtexttodo');
const inputdeadline = document.getElementById('inputdeadline');
const priority = document.getElementById('priority');
const addTaskBtn = document.getElementById('addTaskBtn');
const listmenu = document.getElementById('listmenu');
const sortTask = document.getElementById('sortTask');
const deleteall = document.getElementById('deleteall');
const donelist = document.getElementById('donelist');
const tasklist = document.getElementById('tasklist');
const doneContainer = document.getElementById('doneContainer');

// Set time
  const currentTime = document.getElementById("currentTime");
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentTime.textContent = "Hari & Tanggal: " + now.toLocaleDateString('id-ID', options);

  // confirm blank input
addTaskBtn.addEventListener('click', function(event) {
  event.preventDefault();

  const newvaluetask = inputtodo.value.trim();
  const newdeadline = inputdeadline.value.trim();
  const newpriority = priority.value;

  if (newvaluetask == '') {
    alert("Task tidak boleh kosong!");
    return;
  }
  if (newdeadline == '') {
    alert("Deadline harus diisi!");
    return;
  }
  if (newpriority == 'priority') {
    alert("Silakan pilih priority!");
    return;
  }
  const taskitem = {
    tasktext: newvaluetask,
    deadline: newdeadline,
    priority: newpriority,
    checked: false
  };

  addTask(taskitem);

  // reset input
  inputtodo.value = '';
  inputdeadline.value = '';
  priority.value = 'priority';
});
//textlist
const taskContainer = document.getElementById('taskContainer');

function addTask(taskitem) {
  const item1 = document.createElement('div');
  item1.className = 'flex justify-between items-center border-b border-gray-300 py-2';

 //info
  const item2 = document.createElement('div');
  item2.className = 'flex items-center space-x-4 px-4 py-2';

  const checkbox = document.createElement('input'); 
  checkbox.type = 'checkbox';

  const item3 = document.createElement('div');

  const title = document.createElement('h2');
  title.className = 'text-lg font-semibold';
  title.textContent = taskitem.tasktext;

  const detail = document.createElement('p');
  detail.className = 'text-gray-500';
  detail.textContent = 'Due: ' + taskitem.deadline + ' | Priority: ' + taskitem.priority;


  //checked task

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    item1.style.textDecoration = 'line-through';
    item1.style.color = 'gray';

    // del msg
    const emptyMsg = document.getElementById('emptyDoneMsg');
    if (emptyMsg) emptyMsg.remove();

    // check item
    let exist = Array.from(doneContainer.querySelectorAll('h2'))
      .some(el => el.textContent === title.textContent);

    if (!exist) {
      // remake done list
      const doneItem = document.createElement('div');
      doneItem.className = 'done-item flex justify-between items-center py-2';

      const doneInfo = document.createElement('div');
      doneInfo.className = 'flex items-center space-x-4 px-4 py-2';

      const doneText = document.createElement('div');

      const doneTitle = document.createElement('h2');
      doneTitle.className = 'text-lg font-semibold';
      doneTitle.textContent = title.textContent;

      const doneDetail = document.createElement('p');
      doneDetail.className = 'text-gray-500';
      doneDetail.textContent = detail.textContent;

      doneText.appendChild(doneTitle);
      doneText.appendChild(doneDetail);
      doneInfo.appendChild(doneText);
      doneItem.appendChild(doneInfo);

      //append to doneContainer
      doneContainer.appendChild(doneItem);
    }
  } else {
    item1.style.textDecoration = 'none';
    item1.style.color = 'black';

    // delete from done list
    const doneItems = doneContainer.querySelectorAll('h2');
    doneItems.forEach(el => {
      if (el.textContent === title.textContent) {
        el.closest('.done-item').remove();
      }
    });

    // if empty done list
    if (doneContainer.querySelectorAll('.done-item').length === 0) {
      const msg = document.createElement('p');
      msg.id = 'emptyDoneMsg';
      msg.className = 'text-gray-500 italic';
      msg.textContent = 'Belum ada tugas yang selesai.';
      doneContainer.appendChild(msg);
    }
  }
});
  // gabung info
  item3.appendChild(title);
  item3.appendChild(detail);

  item2.appendChild(checkbox);
  item2.appendChild(item3);

  //edit delete
  const item4 = document.createElement('div');
  item4.className = 'flex space-x-2 px-4 py-2';

  const editBtn = document.createElement('button');
  editBtn.className = 'bg-green-500 text-white px-3 py-1 rounded';
  editBtn.textContent = 'Edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'bg-red-500 text-white px-3 py-1 rounded';
  deleteBtn.textContent = 'Delete';

  // hapus task ketika klik Delete
  deleteBtn.addEventListener('click', () => {
    item1.remove();
  });

  item4.appendChild(editBtn);
  item4.appendChild(deleteBtn);

  // gabung kiri & kanan
  item1.appendChild(item2);
  item1.appendChild(item4);

  // masukkan ke container
  taskContainer.appendChild(item1);
}

// delete all task
deleteall.addEventListener('click', () => {
  if (confirm("Yakin ingin menghapus semua task?")) {
    taskContainer.innerHTML = '';
  } else {
    return;
  }
});
