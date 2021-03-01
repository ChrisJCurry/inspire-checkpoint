//import ValuesController from "./Controllers/ValuesController.js";
import TodosController from './Controllers/TodosController.js'
import WeatherController from './Controllers/WeatherController.js'
import QuotesController from './Controllers/QuotesController.js'
import BackgroundController from './Controllers/BackgroundController.js'
import ClockController from './Controllers/ClockController.js';

class App {
  //valuesController = new ValuesController();
  todosController = new TodosController();
  weatherController = new WeatherController();
  quotesController = new QuotesController();
  backgroundController = new BackgroundController();
  clockController = new ClockController();
}

window["app"] = new App();
