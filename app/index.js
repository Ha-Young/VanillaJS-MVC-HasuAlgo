import '../assets/styles/index.less';
import Controller from '../modules/controller.js';
import Model from '../modules/model.js';
import View from '../modules/view.js';
import Template from '../utils/template.js';

function init() {
  const model = new Model();
  const template = new Template();
  const view = new View(template);
  const controller = new Controller(model, view);
}

init();
