import { remove } from "lodash";
export { View };

class View {

  constructor() {
    this.validation = document.querySelector(".validation-text");

    this.selectbox = document.getElementById("sort-selection");
    this.options = this.selectbox.getElementsByTagName("option");

    this.graphList = document.querySelector(".graph-list");
    this.graphs = [...this.graphList.childNodes];

    this.inputButton = document.querySelector(".input-button");
    this.input= document.querySelector(".input-value");
    this.sortButton = document.querySelector(".sort-start-button");
    this.sortRestartButton = document.querySelector(".sort-restart-button");
    this.sortClearButton = document.querySelector(".sort-clear-button");

    this.validationText = {
      isNaN: "Only Number",
      over10: "Only under 10 elements",
      under5: "Over 5 elements",
      over50: "only under 50 numbers",
      sort: "Select sort",
    }
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element;
  }

  addClass(target, className) {
    target.classList.add(className);
  }

  removeClass(target, className) {
    target.classList.remove(className);
  }

  changeValidation(text) {
    this.validation.classList.remove("hidden");
    this.validation.textContent = text;
  }

  renderGraph(array) {
    if (this.graphs.length) {
      for (let i = 0; i < this.graphs.length; i++) {
        this.graphs[i].remove();
      }
    }

    for (let i = 0; i < array.length; i++) {
      const graph = document.createElement("li");
      const number = document.createElement("span");
      const max = Math.max(...array);

      graph.style.height = 250 * (array[i] / max) + "px";
      graph.removeAttribute("data-position");
      number.textContent = array[i];
      graph.appendChild(number);
      this.graphList.appendChild(graph);
    }
  }

  clearGraph() {
    while(this.graphList.hasChildNodes()) {
      this.graphList.removeChild(this.graphList.firstChild);
    }
  }

  swapGraph(leftBar, rightBar, leftBarIndex, rightBarIndex) {
    const graphStyle = window.getComputedStyle(leftBar);
    const width = Number(graphStyle.width.replace('px', ''));
    const margin = Number(graphStyle.marginLeft.replace('px', ''));

    let leftMove = width + (margin * 2);
    let rightMove = -(width + (margin * 2));

    makeTransform(leftBar, leftMove);
    makeTransform(rightBar, rightMove);
    const oldGraph = leftBar;
    this.graphs[leftBarIndex] = rightBar;
    this.graphs[rightBarIndex] = oldGraph;

    function makeTransform(node, value) {
      const position = Number(node.getAttribute("data-position"));
      if (position) {
        const newPos = position + value;
        node.style.transform = `translateX(${newPos}px)`;
        node.setAttribute("data-position", newPos);
        return;
      }
      node.style.transform = `translateX(${value}px)`;
      node.setAttribute("data-position", value);
    }
  }

  selectGraph(leftBar, rightBar, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        leftBar.classList.add(className);
        rightBar.classList.add(className);
        resolve("select Done")
      }, 500);
    });
  }

  deselectGraph(leftBar, rightBar, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        leftBar.classList.remove(className);
        rightBar.classList.remove(className);
        resolve("deselect Done")
      }, 500);
    });
  }

  confirmGraph(graph, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        graph.classList.add(className);
        resolve("confirm Done")
      }, 500);
    });
  }
}
