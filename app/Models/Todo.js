export default class Todo {
    constructor(data, description) {
        this._id = data.id || data._id;
        this.completed = data.completed || false;
        this.user = data.user;
        this.description = description || data.description;
    }

    
    get Template() {
        let template = /*html*/`
                    <div class="card no-select ${this.completed ? "bg-completed" : ""}">
                        <div class="d-flex justify-content-between">
                            <input type="checkbox"  ${this.completed ? "checked" : ''} class="align-self-center ml-3" onclick="app.todosController.finishTodo('${this._id}')"/>
                            <h4 class=${this.completed ? "completed" : "" }>${this.description}</h4>
                            <button class="btn btn-danger" onclick="app.todosController.removeTodo('${this._id}')">x</button>
                        </div>
                    </div>  
        `

        return template;
    }
}