"use strict";

let gFilterBy='all';

let gNextId = 101;
let gTodos =  [];

const STORAGE_KEY ="todoDB";
_createTodos();


function _createTodos(){
    gTodos= loadFromStorage(STORAGE_KEY);
    if(!gTodos||!gTodos.length){
        gTodos=    [
        _createTodo("Do this 1"),
        _createTodo("Do this 2"),
        _createTodo("Do this 3"),
        ]
    }
    _saveTodos()

}

function _createTodo(txt){
    return  { 
        id: `t${getRandomInt()}`,
        txt: txt,
        isDone: false
        }
}

function getTodosForDisplay(){
    if(gFilterBy=='all') return gTodos;
    return gTodos.filter(todo=>
        todo.isDone && gFilterBy=="done" ||!todo.isDone && gFilterBy=="active"
    )
}
function getTotalTodosCount(){
    return gTodos.length
}
function getActiveTodosCount(){
    return gTodos.filter(todo=> !todo.isDone).length
}
function toggleTodo(id){
    const todo = gTodos.find(todo=> todo.id===id)
    todo.isDone=!todo.isDone;
    _saveTodos();

}
function RemoveTodo(id){
    const todoIdx = gTodos.findIndex(todo => todo.id===id);
    if(todoIdx !== -1) gTodos.splice(todoIdx,1);    
    _saveTodos();
}
function addTodo(txt){
    let todo ={ id: "t" + getRandomInt(100,200),
                txt: txt,
                isDone: false };
    gTodos.unshift(todo);
    _saveTodos();
}

//filter:
function setFilter(filterBy){
    gFilterBy=filterBy;
}

//local storage:
function _saveTodos(){
    saveToStorage(STORAGE_KEY,gTodos);
}