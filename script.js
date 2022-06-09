function display_date(){
    let date = new Date
    let day = date.getDay();
    let day2 = date.getDate();
    let year = date.getFullYear();
    let days = ['sunday','monday','tuesday','wednesday','thursday',"friday","saturday"]
    document.getElementById('date').innerHTML = `${days[day]} ${day2} ${year}` ;
}

setInterval(1000,display_date());

const list = document.getElementById('list');
const input =  document.getElementById('input');
const Line_through = 'Line_through'
const uncheck = `bi-circle`;
const check = `bi-check-circle-fill`;

let id ; 
let  LIST;

//create a task

function addTodo(todo,id,done,trash){
    if(trash){
        return;
    }

    const Done = done ? check : uncheck;
    const att = done ? "check": "normal";
    const Line = done ? Line_through : "";
    const text = `
    <li class="item">
    <span class="${att}" job="complete">
    <i class="bi ${Done}" id="${id}" job="complete"></i>
    </span>
    
      <span class="${Line}">${todo}</span>

    <span class="trash" id="${id}" job="delete" >
    <i class="bi bi-trash" job="delete"></i>
    </span>
    </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position,text);

}



//load tasks
function loadTodo(array){
    array.forEach(function(item){
        addTodo(item.name,item.id,item.done,item.trash)
    });
}
//restore
let data = localStorage.getItem("Todo");
if (data){
        LIST = JSON.parse(data);
        loadTodo(LIST);
        id = LIST.length;

    }else{
        LIST = [];
        id = 0;
    }

    
//clear LIST
function clear(){
    localStorage.clear();
    location.reload();
}

document.getElementById('btn').addEventListener('click',()=>{
    clear()
})

//add items(tasks) to do the list

document.addEventListener('keyup',function(e){
    
    if(e.keyCode == 13){
        const todo = input.value;
        if (todo){
            addTodo(todo,id,false,false);
            LIST.push(
                {
                    name : todo,
                    id : id ,
                    done : false,
                    trash : false

                }
            );
            id++;
        }
        input.value = "";
        localStorage.setItem("Todo",JSON.stringify(LIST));
        
    }
})



function completeTodo(elmnt){
    elmnt.classList.toggle(check);
    elmnt.classList.toggle(uncheck);
    elmnt.parentNode.parentNode.getElementsByTagName('span')[1].classList.toggle(Line_through);
    LIST[elmnt.id].done = LIST[elmnt.id].done ? false : true;
    
}

function removeTodo(elmnt){
    let del = elmnt.parentNode.parentNode;
    LIST[elmnt.parentNode.id].trash = true;
    del.remove();
    
}

list.addEventListener('click',function(event){
    let element = event.target;
    const elementJob = event.target.attributes.job.value;
    if (elementJob == "complete"){
        completeTodo(element);
    }else if(elementJob == "delete") {
        removeTodo(element);

    }
    
   localStorage.setItem("Todo",JSON.stringify(LIST));

    

})
    
