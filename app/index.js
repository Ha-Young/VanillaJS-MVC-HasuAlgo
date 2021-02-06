import '../assets/styles/index.less';
import Model from './model.js';
import Controller from './controller.js';
import View from './view.js';

function Todo () {
  this.model = new Model();
  this.controller = new Controller();
  this.view = new View();
}

const todo = new Todo();

todo.controller.getData();
