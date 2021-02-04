// Load application styles
import '../assets/styles/index.less';
import '../assets/styles/normalize.less';

// ================================
// START YOUR APP HERE
// ================================

import { View } from './view';
import { Model } from './model.js';
import { Controller } from './controller';

function Graph() {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
}

const graph = new Graph();

graph.controller.handleRenderGraph();
