import {ProxyState} from '../AppState.js'
import Todo from '../Models/Todo.js'
import {sandBoxApi} from './AxiosService.js'

class TodosService {
    constructor() {
        this.getTodos()
    }

    async getTodos() {
        try {
            const res = await sandBoxApi.get("ChrisJCurry/todos")
            ProxyState.todosList = res.data.map(t => new Todo(t))
            //console.log("data: ", res.data)
        }catch(err) {
            console.error(err)
        }
    }

    async addTodo(newTodo) {
        try {
            const res = await sandBoxApi.post("ChrisJCurry/todos/", newTodo)
            ProxyState.todosList = [...ProxyState.todosList, new Todo(res.data)]
        }catch(err) {
            console.error(err)
        }
    }

    async removeTodo(todoId) {
        try {
            await sandBoxApi.delete("ChrisJCurry/todos/"+todoId)
            this.getTodos()
            if(ProxyState.activeTodo == null) {
            }
        }catch(err) {
            console.error(err)
        }
    }

    async finishTodo(todoId) {
        try {
            let currTodo = ProxyState.todosList.find(t => t._id == todoId)

            if(currTodo!= null) {
                currTodo.completed = !currTodo.completed;
            }

            await sandBoxApi.put('ChrisJCurry/todos/'+todoId, currTodo)

            ProxyState.todosList = ProxyState.todosList
        }catch(err) {
            console.error(err)
        }
    }
}

const todosService = new TodosService()
export default todosService; 