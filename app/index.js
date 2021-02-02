// Load application styles
import Controller from './controller';
import Model from './model';
import View from './view';
import Templates from './templates';

import '../assets/styles/index.less';

const model = new Model();
const template = new Templates();

const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(model, view);
