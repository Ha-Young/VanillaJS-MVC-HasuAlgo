// Load application styles
import '../assets/styles/index.less';
import Model from './model.js';
import View from './view.js';
import Control from './control.js';

(function () {
  'use strict';

  function SortingVisualizer() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Control(this.model, this.view);
  }

  const app = new SortingVisualizer();
})()
