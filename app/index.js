// Load application styles
import '../assets/styles/index.less';
import Model from './model';
import View from './view';
import Controller from './controller';

  class VisualSort {
    constructor() {
       this.model = new Model();
       this.view = new View();
       this.controller = new Controller(this.model, this.view);
    }
  }

  const visualSort = new VisualSort();

  visualSort.controller.addEvent();
