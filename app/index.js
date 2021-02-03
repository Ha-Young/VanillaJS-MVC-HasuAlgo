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

graph.controller.clickEvent(graph.view.inputButton, function() {
  const resultCheckData = graph.controller.checkData();
  const resultCheckSort = graph.controller.checkSort();

  if (resultCheckData && resultCheckSort) {
    graph.view.clearGraph();
    graph.view.renderGraph(graph.model.unsortedArray);
    graph.view.removeClass(graph.view.sortButton, "invisible");
  }
});

graph.controller.clickEvent(graph.view.sortButton, function() {
  graph.controller.doBubbleSort(graph.model.sortedArray);
  graph.view.addClass(graph.view.sortButton, "invisible");
  graph.view.removeClass(graph.view.sortRestartButton, "invisible");
  graph.view.removeClass(graph.view.sortClearButton, "invisible");
});

graph.controller.clickEvent(graph.view.sortRestartButton, function() {
  graph.view.clearGraph();
  graph.view.renderGraph(graph.model.unsortedArray);
  graph.controller.doBubbleSort(graph.model.sortedArray);
});

graph.controller.clickEvent(graph.view.sortClearButton, function() {
  graph.view.clearGraph();
  graph.view.addClass(graph.view.sortRestartButton, "invisible");
  graph.view.addClass(graph.view.sortClearButton, "invisible");
})
