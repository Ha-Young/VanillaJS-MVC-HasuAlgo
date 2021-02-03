import { transform } from "lodash";
import MYAPP from "./myapp";

export default class View {
  renderGraphs(userInputData, id) {
    const graphTable = MYAPP.table.graph;
    graphTable.innerHTML = null;
    console.log("id is", id);

    for (let i = 0; i < userInputData.length; i++) {
      const graphPercent = userInputData[i];
      const $graph = document.createElement("div");
      $graph.classList.add("graph-item");
      $graph.style.width = "10%";
      $graph.style.height = `${graphPercent}%`;
      $graph.dataset.id = userInputData[i];
      if (userInputData[i] === id) {
        console.log("is that?????");
        console.log(userInputData[i], id);
        $graph.classList.add("sorted-graph");
      }
      graphTable.appendChild($graph);

      //if (id === )
    }
  }

  clearAllColor(graphs) {
    for (let i = 0; i < graphs.children.length; i++) {
      graphs.children[i].classList.remove("current-graph");
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

  renderSortedGraphColor(id) {
    return new Promise((resolve) => {
      console.log(id);
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
}
