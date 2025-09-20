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
//buatlist
function addTask(taskitem) {
  const item1 = document.createElement('div');
  item1.className = 'flex justify-between items-center border-b border-gray-300 py-2';

  const item2 = document.createElement('div');
  item2.className = 'flex items-center space-x-4 px-4 py-2';

  const checkbox = document.createElement('input'); 
  checkbox.type = 'checkbox';

  const item3 = document.createElement('div');
  
  const item4 = document.createElement('h2');
  item3.className = 'text-lg font-semibold' ;
  item3.textContent = taskitem.tasktext;

  const item5 = document.createElement('p');
  item4.className = ' text-gray-500';
  item4.textContent = 'Deadline: ' + taskitem.deadline;

  const item6 = document.createElement('p');
  item4.className = ' text-gray-500';
  item4.textContent = 'priority: ' + taskitem.priority;

  const item7 = document.createElement('/div');

  
  const item8 = document.createElement('/div');

  const item9 = document.createElement('div');
  item9.className = 'flex items-center space-x-4 px-4 py-2';

  const item10 = document.createElement('button');
  item10.className = 'bg-green-500 text-white px-4 py-2 rounded-lg';
  item10.textContent = 'Edit';

  const items11= document.createElement('button');
  items11.className = 'bg-red-500 text-white px-4 py-2 rounded-lg';
  items11.textContent = 'Delete';

  const item12 = document.createElement('/div');
  const item13 = document.createElement('/div');
  const item14 = document.createElement('/div');

  item3.appendChild(item4);
  item3.appendChild(item5);
  item3.appendChild(item6);
  item2.appendChild(checkbox);
  item2.appendChild(item3);
  item1.appendChild(item2);
  item9.appendChild(item10);
  item9.appendChild(items11);
  item1.appendChild(item9);
  listmenu.appendChild(item1);  
}