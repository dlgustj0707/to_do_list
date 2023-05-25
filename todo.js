const toDOForm =document.getElementById("todo-form");
const toDOInput = document.querySelector("#todo-form input");
const toDOList = document.getElementById("todo-list");

const TODOS_KEY = "todos"
let toDos = [];


function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos)); 
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos =toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text; //span 안에 newToDo 변수 text를 넣어준다
    const button =document.createElement("button");
    button.innerText ="❌";
    button.addEventListener("click",deleteToDo)
    li.appendChild(span); //li 안에 span을 넣어준다 (append는 마지막에 써주어야함!)
    li.appendChild(button);
    toDOList.appendChild(li); 
} 

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDOInput.value;
    toDOInput.value="";
    const newTodoObj ={
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj); //배열에 변수 newToDo 값 넣기
    paintToDo(newTodoObj);
    saveToDos();
}

toDOForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

//function sayHello(item){
//    console.log(item);
//}

if(savedToDos){
    const parsedToDos = JSON.parse(savedToDos); //string -> array
    //parsedToDos.forEach(sayHello); //forEach는 array에 있는 item들에 함수를 적용시켜준다
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}