'use strict'

let gNextId = 101;
let gTodos = [
  { id: `t${gNextId++}`, txt: "Do this 1", isDone: false},
  { id: `t${gNextId++}`, txt: "Do this 2", isDone: false },
  { id: `t${gNextId++}`, txt: "Do this 3", isDone: false },
];

let gFilterBy='all';

function getTodosForDisplay(){
    if(gFilterBy=='all') return gTodos;
    return gTodos.filter(todo=>
        todo.isDone && gFilterBy=="done" ||!todo.isDone && gFilterBy=="active"
    )
}
function toggleTodo(id){
    const todo = gTodos.find(todo=> todo.id===id)
    todo.isDone=!todo.isDone;
}
function RemoveTodo(id){
    const todoIdx = gTodos.findIndex(todo => todo.id===id);
    if(todoIdx !== -1) gTodos.splice(todoIdx,1);    
}
function addTodo(txt){
    let todo ={ id: "t" + getRandomInt(100,200),
                txt: txt,
                isDone: false };
    gTodos.unshift(todo);
}

//filter:

function setFilter(filterBy){
    gFilterBy=filterBy;
    debugger
}