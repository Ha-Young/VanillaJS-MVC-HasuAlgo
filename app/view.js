import { transform } from "lodash";
import MYAPP from "./myapp";

export default class View {
  renderGraphs(userInputData, sortedGraphs) {
    const graphTable = MYAPP.table.graph;
    graphTable.innerHTML = null;

    for (let i = 0; i < userInputData.length; i++) {
      const graphPercent = userInputData[i];
      const $graph = document.createElement("div");
      $graph.classList.add("graph-item");
      $graph.style.width = "10%";
      $graph.style.height = `${graphPercent}%`;
      $graph.dataset.id = userInputData[i];
      $graph.textContent = `${graphPercent}`;

      if (sortedGraphs) {
        for (const sortedValue of sortedGraphs) {
          if (userInputData[i] === sortedValue) {
            $graph.classList.add("sorted-graph");
          }
        }
      }
      graphTable.appendChild($graph);
    }
  }

  clearAllColor(graphs) {
    for (let i = 0; i < graphs.children.length; i++) {
      graphs.children[i].classList.remove("current-graph");
    }
  }

  renderAllColor(graphs) {
    for (let i = 0; i < graphs.children.length; i++) {
      graphs.children[i].classList.add("sorted-graph");
    }
  }

  renderDefaultColor(left, right) {
    return new Promise((resolve) => {
      left.classList.add("current-graph");
      right.classList.add("current-graph");
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  renderFirstGraph(graphs) {
    return new Promise((resolve) => {
      graphs[0].classList.add("sorted-graph");
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  renderSwapAnimation(left, right) {
    const finalLeftStyle =
      left.getBoundingClientRect().left - right.getBoundingClientRect().left;
    const finalRightStyle =
      right.getBoundingClientRect().left - left.getBoundingClientRect().left;

    left.animate(
      { transform: `translate(${finalRightStyle}px)` },
      { duration: 800, fill: "forwards" }
    );

    right.animate(
      { transform: `translate(${finalLeftStyle}px)` },
      { duration: 800, fill: "forwards" }
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  changeButtonState(selectedType) {
    if (selectedType === 'Bubble') {
      MYAPP.button.bubbleSort.style.backgroundColor = '#7FCDCE';
      MYAPP.button.bubbleSort.style.width = "80px";
    }

    if (selectedType === 'Quick') {
      MYAPP.button.quickSort.style.backgroundColor = '#7FCDCE';
      MYAPP.button.quickSort.style.width = "80px";
    }
  }

  renderPivotColor(pivot) {
    console.log(pivot);
    return new Promise(resolve => {
      pivot.classList.add("pivot-graph");
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
