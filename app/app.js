// Load application styles
import '../assets/styles/index.less';
import Model from './model.js';
import View from './view.js';
import Controll from './controll.js';

(function () {
  'use strict';

  function SortingVisualizer() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controll(this.model, this.view);

  }

  const app = new SortingVisualizer();
})()
