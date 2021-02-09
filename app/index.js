import '../assets/styles/index.less';
import Controller from '../modules/controller.js';
import Model from '../modules/model.js';
import View from '../modules/view.js';

function init() {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
}

init();
