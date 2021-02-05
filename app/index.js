// Load application styles
import '../assets/styles/index.less';
import Model from './Model';
import Controller from './Controller';
import View from './View';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

controller.init();
