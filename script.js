const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


let todos = [];
let id=0;
window.onload=()=>{
  if (localStorage.length != 0){
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      todos.push(JSON.parse(localStorage.getItem(key)));
    }
    id=localStorage.length;
    render();
  }
}

//const todo={id, text, checked};

/*<li>
  <input type="checkbox">
    <span>Text</span>
    <button>Delete</button>
</li>*/

function newTodo() {
  //alert('New TODO button clicked!')
  let text = prompt('enter new task');
  text.classList=classNames.TODO_TEXT;
  const todo={ id: id++, text, checked:false };
  todos.push(todo);
  localStorage.setItem(id-1, JSON.stringify(todo));
  //console.log('ts',JSON.parse(localStorage.getItem(id)));
  console.log('todos',todos);
  render();
}

function render(){
  list.innerHTML="";
  todos.map(todo=>renderTodo(todo)).forEach(todo => list.append(todo))
  itemCountSpan.textContent= todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo=>!todo.checked).length
}

function renderTodo({id, text, checked}){
  const li= document.createElement('li')
  li.classList=classNames.TODO_ITEM;
  li.innerHTML=`
    <input style="${classNames.TODO_CHECKBOX}" type="checkbox" ${checked ? "checked":""} onChange="toggleTodo(${id})">
    <span>${text}</span>
    <button style="${classNames.TODO_DELETE}" onclick="removeTodo(${id})">Delete</button>
  `
  return li;
}
function removeTodo(id){
  console.log('from removeTodo', id);
  todos=todos.filter(todo=>todo.id !==id);

  render();
}
function toggleTodo(id){
  console.log('FromtoglTodo', id);
  //todos=todos.map(todo => todo.id===id ? {id:todo.id, text:todo.text, checked: !todo.checked}:todo);
  todos=todos.map(todo => todo.id===id ? {...todo, checked: !todo.checked}:todo);
  render();
}