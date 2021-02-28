//import ValuesController from "./Controllers/ValuesController.js";
import TodosController from './Controllers/TodosController.js'
import WeatherController from './Controllers/WeatherController.js'

class App {
  //valuesController = new ValuesController();
  todosController = new TodosController();
  weatherController = new WeatherController();
}

window["app"] = new App();
