// Load application styles
import '../assets/styles/index.less';
import Model from '../app/model.js';
import Controller from '../app/controller.js';
import View from '../app/view.js';

// ================================
// START YOUR APP HERE
// ================================


function init() {
  const model = new Model();
  const view = new View();
  const controller = new Controller(view, model);
}

init();