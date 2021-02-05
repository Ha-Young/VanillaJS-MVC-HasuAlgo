// Load application styles
import  '../assets/styles/index.less';
import Controller from './controller';
import Model from './model';
import View from './view';

// ================================
// START YOUR APP HERE
// ================================

function App() {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
}

const app = new App();

const $form = document.querySelector('form');
$form.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  app.controller.submitHandler();
}
