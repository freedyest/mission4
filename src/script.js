window.addEventListener('DOMContentLoaded', loadTodoList);

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