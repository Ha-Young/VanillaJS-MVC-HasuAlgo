// Load application styles
import Controller from './controller';
import Model from './model';
import View from './view';

import '../assets/styles/index.less';

const model = new Model();
const view = new View();

/**
 * @type {Controller}
 */
const controller = new Controller(model, view);

controller.setStartView();
