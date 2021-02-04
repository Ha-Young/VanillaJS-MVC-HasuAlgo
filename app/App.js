import { initialTemplate } from './templates/initialTemplate';
import Model from './Model';
import Controller from './Controller';
import View from './View';

export function setTmeplate(template) {
  document.querySelector(".sorting-algorithms").innerHTML = template;
}

function App() {
  setTmeplate(initialTemplate());
  const model = new Model();
  const view = new View();
  new Controller(model, view);
}

export default App;
