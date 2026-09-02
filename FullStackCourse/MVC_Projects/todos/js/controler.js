"use strict";

function onInit() {
  console.log("init");
  renderTodos();
}

function renderTodos() {
  const todos = getTodosForDisplay();
  let strHtmls = todos.map((todo) => {
    return `<li class="${todo.isDone ? "done" : ""}" 
            onclick="onToggleTodo('${todo.id}')">
                ${todo.txt}
                <button onclick="onRemoveTodo('${todo.id}',event)" title="btn" class='remove-btn'>X</button>
            </li>`;
  });
  document.querySelector(".todo-list").innerHTML = strHtmls.join("");
  renderStat();
}

function onToggleTodo(id) {
  toggleTodo(id);
  console.log(" ", gTodos);
  renderTodos();
}

function onRemoveTodo(id, ev) {
  ev.stopPropagation();
  RemoveTodo(id);
  console.log("remove:", id);
  renderTodos();
}

function onAddTodo() {
  const elInput = document.querySelector('input[name="todo-txt"]');
  addTodo(elInput.value);
  renderTodos();
  console.log(gTodos);
  elInput.value = "";
}

//filter:

function onSetFilter(filterBY) {
  setFilter(filterBY)
  renderTodos()
}


//stats:
function renderStat(){
  document.querySelector(".total-todos-count").innerText = getTotalTodosCount();

  document.querySelector(".active-todos-count").innerText = getActiveTodosCount();
}