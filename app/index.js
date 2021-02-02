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
  this.data = new Model();
  this.view = new View();
  this.controller = new Controller(this.data, this.view);
}

const graph = new Graph();

graph.controller.clickEvent(graph.view.inputButton, function() {
  const resultCheckData = graph.controller.checkData();
  const resultCheckSort = graph.controller.checkSort();

  if (resultCheckData && resultCheckSort) {
    graph.view.renderGraph(graph.data.dataArray);
    graph.controller.clickEvent(graph.view.sortButton, function() {
      graph.controller.doBubbleSort(graph.data.dataArray);
    });
  }
});
