
import { ProxyState } from '../AppState.js'
import todosService from '../Services/TodosService.js'
function _drawTodos() {
    let todoList = ProxyState.todosList;
    let template = ""
    if (todoList != null) {
        template += /*html*/`
        <div class="bg-primary">
            <form onsubmit="app.todosController.addTodo(event)" class="d-flex">
                <input type="text" class="form-control squared-borders" required="true" maxLength="25" name="newTodoInput" placeholder="Enter new Todo here..."/>
                <button class="btn btn-success form-control w-25" type="submit">+</button>
            </form>
        </div>
        `

        todoList.forEach(t => template += t.Template)
    } else {
        template += "Todo list failed to load"
    }

    let amountOfTodos = 0
    let amountOfTodosCompleted = 0
    todoList.forEach(t => amountOfTodos++)
    todoList.forEach(t => t.completed ? amountOfTodosCompleted++ : "")
    //template += `<button>hey</button>`
    document.getElementById("todos-list").innerHTML = `<h1 class="stroke-sm"><span class=${amountOfTodosCompleted == 0 ? "text-danger" : "text-success"}>${amountOfTodosCompleted}</span>/<span class=${amountOfTodosCompleted == amountOfTodos ? "text-success" : "text-danger"}>${amountOfTodos}</span></h1>`
    document.getElementById("todos-list").innerHTML += template;
}

export default class TodosController {
    constructor() {
        _drawTodos()
        ProxyState.on("todosList", _drawTodos)
    }

    addTodo(event) {
        event.preventDefault()

        console.log(ProxyState.todosList.length)

        if (ProxyState.todosList.length >= ProxyState.maxTasks) {
            window.alert("Too many tasks! Delete some to add more.")
            return;
        }

        let form = event.target
        let todoText = form.newTodoInput.value
        let newTodo = {
            description: todoText
        }

        //console.log(newTodo, todoText)
        try {
            todosService.addTodo(newTodo)
        } catch (err) {
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