// Load application styles
import '../assets/styles/index.less';
import Model from './model';
import View from './view';
import Controller from './controller';

// ================================
// START YOUR APP HERE
// ================================

console.log('여기서 작업하세요!');

function VisualSort () {
  this.model = new Model(); // new Model(data)?
  this.view = new View(); // new View(template)?
  this.controller = new Controller(this.model, this.view); //controller method
};

const visualSort = new VisualSort();
visualSort.controller.addEvent();

//window.addEventListener('load', () => visualSort.controller.addViewEvent);
//window.addEventListener('load', () => visualSort.controller.addModelEvent);
