let gNextId = 101;
let gTodos = [
  { id: `t${gNextId++}`, txt: "Do this 1", isDone: false},
  { id: `t${gNextId++}`, txt: "Do this 2", isDone: false },
  { id: `t${gNextId++}`, txt: "Do this 3", isDone: false },
];

function onInit() {
  console.log("init");
  renderTodos();
}

function renderTodos() {
    let strHtmls = gTodos.map((todo) => {
    return `<li class="${todo.isDone ? 'done' : ''}" 
            onclick="onToggleTodo('${todo.id}')">
                ${todo.txt}
                <button onclick="onRemoveTodo('${todo.id}',event)" title="btn" class='remove-btn'>X</button>
            </li>`;
  });
  document.querySelector(".todo-list").innerHTML = strHtmls.join("");
}

function onToggleTodo(id){
    const todo = gTodos.find(todo=> todo.id===id)
    todo.isDone=!todo.isDone;
    console.log(" ",gTodos)
    renderTodos()
}

function onRemoveTodo(id,ev) {
    ev.stopPropagation();

    const todoIdx = gTodos.findIndex(todo => todo.id===id);
    if(todoIdx !== -1) gTodos.splice(todoIdx,1)
    console.log("remove:", id);
    renderTodos()
}

function onAddTodo(){
    const elInput = document.querySelector('input[name="todo-txt"]')
    let todo ={ id: "t" + getRandomInt(100,200),
                txt: `${elInpiut.value}`,
                isDone: false };
    gTodos.unshift(todo);
    renderTodos();
    console.log(gTodos);
    elInput.value="";
}




function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
