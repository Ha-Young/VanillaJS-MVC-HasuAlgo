import '../assets/styles/index.less';
import Controller from './controller.js';
import View from './view.js';
import Model from './model.js';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
