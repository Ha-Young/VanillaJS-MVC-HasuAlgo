// Load application styles
import Controller from './controller';
import Model from './model';
import View from './view';

import '../assets/styles/index.less';

console.log('여기서 작업하세요!');
const model = new Model();
const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(model, view);
