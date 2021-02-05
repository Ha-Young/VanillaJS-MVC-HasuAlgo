// Load application styles
import '../assets/styles/index.less';
import Model from './model';
import View from './view';
import Controller from './controller';

// ================================
// START YOUR APP HERE
// ================================
const visualSort = new VisualSort();

function VisualSort () {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
};

visualSort.controller.addEvent();
