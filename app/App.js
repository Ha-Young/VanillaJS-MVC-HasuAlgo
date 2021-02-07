import Model from './Model';
import Controller from './Controller';
import View from './View';

function App() {
  const model = new Model();
  const view = new View();
  new Controller(model, view);
}

export default App;
