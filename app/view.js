import { transform } from 'lodash';
import MYAPP from './myapp';

export default class View {
  renderGraphs(modelStorage, sortedGraphs) {
    const graphTable = MYAPP.table.graph;
    this.clearAllGraphs(graphTable);

    for (let i = 0; i < modelStorage.length; i++) {
      const graphPercent = modelStorage[i];
      const $graph = document.createElement('div');
      $graph.classList.add('graph-item');
      $graph.style.width = '10%';
      $graph.style.height = `${graphPercent}%`;
      $graph.dataset.id = modelStorage[i];
      $graph.textContent = `${graphPercent}`;

      if (sortedGraphs) {
        for (const sortedValue of sortedGraphs) {
          if (modelStorage[i] === sortedValue) {
            $graph.classList.add('sorted-graph');
          }
        }
      }
      graphTable.appendChild($graph);
    }
  }

  clearAllGraphs(table) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }

  renderFirstGraphColor(graphs) {
    console.log(graphs);
    graphs[0].classList.add('sorted-graph');
  }

  clearAllColor(graphs) {
    for (let i = 0; i < graphs.children.length; i++) {
      graphs.children[i].classList.remove('current-graph');
    }
  }

  renderAllColor(graphs) {
    for (let i = 0; i < graphs.children.length; i++) {
      graphs.children[i].classList.add('sorted-graph');
    }
  }

  renderCurrentColor(left, right) {
    left.classList.add('current-graph');
    right.classList.add('current-graph');
  }

  renderSwapAnimation(left, right) {
    const finalLeftStyle = left.getBoundingClientRect().left - right.getBoundingClientRect().left;
    const finalRightStyle = right.getBoundingClientRect().left - left.getBoundingClientRect().left;

    left.animate(
      { transform: `translate(${finalRightStyle}px)` },
      { duration: 800, fill: 'forwards' }
    );

    right.animate(
      { transform: `translate(${finalLeftStyle}px)` },
      { duration: 800, fill: 'forwards' }
    );
  }

  changeButtonState(selectedType) {
    if (selectedType === 'BUBBLE') {
      MYAPP.button.bubbleSort.style.backgroundColor = '#7FCDCE';
      MYAPP.button.bubbleSort.style.width = '80px';
    }

    if (selectedType === 'QUICK') {
      MYAPP.button.quickSort.style.backgroundColor = '#7FCDCE';
      MYAPP.button.quickSort.style.width = '80px';
    }
  }

  renderPivotColor(pivot) {
    pivot.classList.add('pivot-graph');
  }

  renderErrorMsg(reason) {
    MYAPP.table.error.textContent = reason;
    MYAPP.table.error.classList.add('fadeIn');
  }
}
