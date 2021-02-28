
import {ProxyState} from '../AppState.js'
import todosService from '../Services/TodosService.js'
function _drawTodos() {
    let todoList = ProxyState.todosList;
    let template = ""
    if(todoList != null) {
        template += /*html*/`
        <div class="bg-primary">
            <form onsubmit="app.todosController.addTodo(event)" class="d-flex">
                <input type="text" class="form-control squared-borders" required="true" name="newTodoInput" placeholder="Enter new Todo here..."/>
                <button class="btn btn-success form-control w-25" type="submit">+</button>
            </form>
        </div>
        `

        todoList.forEach(t => template += t.Template)
    } else {
        template += "Todo list failed to load"
    }
    
    
    //template += `<button>hey</button>`
    document.getElementById("todos-list").innerHTML = template;
}

export default class TodosController {
    constructor() {
        _drawTodos()
        ProxyState.on("todosList", _drawTodos)
    }

    addTodo(event) {
        
        event.preventDefault()
        let form = event.target
        let todoText = form.newTodoInput.value
        let newTodo = {
            description: todoText
        }
        
        //console.log(newTodo, todoText)
        try {
            todosService.addTodo(newTodo)
        } catch(err) {
            console.error(err)
        }
    }

    removeTodo(todoId) {
        todosService.removeTodo(todoId)
    }

    finishTodo(todoId) {
        todosService.finishTodo(todoId)
    }
}