import Controller from "../app/Controller/index";
import Model from "../app/Model/index";
import View from "../app/View/index";

function App() {
  this.model = new Model();
  this.view = new View();
  new Controller(this.model, this.view);
}

export default App;
