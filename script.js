var tInput = document.querySelector('#todoInput');
var todoFrame = document.querySelector('.todoFrame');
var foot =document.querySelector('.foot');
var count = document.querySelector('.count');

 

var todos = [];

//save to local storage
function saveTodos(){
    var str = JSON.stringify(todos);
    localStorage.setItem('todo', str);
}

// get data from localStorage
function getTodo(){
    var str = localStorage.getItem('todo');
    todos = JSON.parse(str);
    
    if(!todos){
         todos = [];
     }
};

getTodo();
//input values from localstorage
for(var i=0; i<todos.length; i++){
    newTodo(todos[i].value);
}

//Input on enter todos
tInput.addEventListener('keyup', function (e) {
    if(tInput.value == '') {
        return alert("Is Like You're Not Ready...What do you want to do gan gan?");
    }
    else if(e.key === "Enter" || e.keyCode == 13) {
        todos.push({value: e.target.value , checked: false});
        newTodo(e.target.value);
        tInput.value = '';
        countCompleted();
        saveTodos();
    }
});


        

//function that contols inputted value, and events
function newTodo(value){
    var todoCheck =document.createElement('div');
    todoCheck.classList.add('circle');
    var todo = document.createElement('div');
    todo.classList.add('enter', 'list', 'design', 'box');
    var todoText = document.createElement('p');
        todoText.textContent = value;
    
    var cancel = document.createElement('img');
    cancel.src = 'images/icon-cross.svg';
    cancel.classList.add('cancel');
    var checked = document.createElement('img');
    checked.src = 'images/icon-check.svg';
    checked.classList.add('mark')

    var obj = todos.find((t) => t.value === value);
   
    
    
    todo.appendChild(todoCheck);
    todo.appendChild(todoText);
    todo.appendChild(cancel);
    todoFrame.insertBefore(todo, foot);

    //events after the circle div has been clicked
    todoCheck.addEventListener('click', function(){
        obj.checked = true;
        todoCheck.style.background = 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))';
        todoCheck.style.border = 'none';
        todoCheck.appendChild(checked);
        todoText.classList.toggle('strike');
        countCompleted();
        saveTodos();

    if(todoText.classList != 'strike'){
        todoCheck.removeChild(checked);
        obj.checked = false;
        todoCheck.style.background = 'none';
        todoCheck.style.border = '.5px solid hsl(234, 11%, 52%)';
        saveTodos();
        countCompleted();
    }});


    //cross image that deletes the todo
    cancel.addEventListener('click', function(e){
    todos = todos.filter((t) => t !== obj);
    e.target.parentElement.remove();
    countCompleted();
    saveTodos();
    });


    //event listener for completed
    document.querySelector('.completed').addEventListener('click', ()=>{
        document.querySelectorAll('.list').forEach(()=>{
            if(obj.checked == false){
            todo.style.display = 'none';
            }
            else{
                todo.style.display = 'flex';
            };
        });    
    }); 


    //event listener for active
    document.querySelector('.active').addEventListener('click', ()=>{
        document.querySelectorAll('.todo').forEach(()=>{
            if(obj.checked == true){
                todo.style.display = 'none';
            };
            if(obj.checked == false){
                todo.style.display = 'flex';
            };
        })
    });

        
    //event listener for all
    document.querySelector('.all').addEventListener('click', () => {
        todo.style.display = 'flex';
    });

    //event listener for clear completed 
    document.querySelector('.cCompleted').addEventListener('click', ()=>{
           for(var i=0; i<todos.length; i++){
            if(todos[i].checked === true){
                todos.splice(i, 1);
                saveTodos();
                console.log(todos);
                }
            }; 
            if(todoText.classList == 'strike' ){
                todo.remove();
            }
            else{
                todo.style.display ='flex';
            }
        });
};        

    
        
        

//items left counter
function countCompleted() {
    count.innerHTML = todos.filter((t) => t.checked == false).length +' items left';
    saveTodos();
    
};

//adding a date style
var options = {weekday: 'long', month:'long', day:'numeric'};
var today = new Date();
document.querySelector('.date').innerHTML = today.toLocaleDateString('en-us', options);






//theme function
function changeTheme(){
    var lightDark = document.querySelector('.theme');
     var bgChange = document.querySelector('.bg');
 
     bgChange.classList.toggle('bg-change');
 
    if(bgChange.classList.contains('bg-change')){
     
     lightDark.setAttribute('src', 'images/icon-moon.svg');
     document.querySelector('#light').setAttribute('href', 'style1.css');
    }
    else{
        
     lightDark.setAttribute('src', 'images/icon-sun.svg');
     document.querySelector('#light').removeAttribute('href');
    }
 };
 

























//making the todos draggable

// var elem = null;
// function isBefore(el1, el2){
//     for (
//         var cur = el1.previousSibling;
//         cur && cur.nodeType !== 9;
//         cur = cur.previousSibling)
//         if (cur === el2){
//             return true;
//         }else{
//             return false;
//         }
// }
//     todo.draggable = true;
//     todo.addEventListener('dragstart',(e) => {
//         e.dataTransfer.effectAllowed = 'move';
//         e.dataTransfer.setData("text",null);
//         elem = e.target;
//     });
//     todo.addEventListener('dragover',(e)=>{
//         var el1
//         e.preventDefault();
//         if(e.target.classList.contains('todo')){
//             el1 = e.target;
//         }
//         else{
//             el1 = e.target.parentElement;
//         }
//         if(isBefore(elem, el1)){
//             el1.parentNode.insertBefore(elem,el1);
//         }
//         else{
//             el1.parentNode.insertAfter(elem,el1.nextSibling);
//         }
//         saveTodos();
//     });
//     todo.addEventListener('dragend',(e)=>{
//         if(todo.nextSibling){
//             let index1 = todos.findIndex((t) => t.value === todo.nextSibling.querySelector('p').textContent)
//             todos.splice(index1, 0, {
//                 value: value,
//                 checked: todo.querySelector('input').checked,
//             });
//         }
//         else{
//             todos.push(
//                 {value: value,
//                 checked: todo.querySelector('input').checked});
//         }    
//     });