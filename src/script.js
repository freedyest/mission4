window.addEventListener('DOMContentLoaded', loadTodoList);

const inputtodo = document.getElementById('inputtexttodo');
const listtodo = document.getElementById('listtodo');
const buttonadd = document.getElementById('addtext');

// Set time
  const currentTime = document.getElementById("currentTime");
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentTime.textContent = "Hari & Tanggal: " + now.toLocaleDateString('id-ID', options);