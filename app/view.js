import { remove } from "lodash";
export { View };

class View {

  constructor() {
    this.validation = document.querySelector(".validation-text");

    this.selectbox = document.getElementById("sort-selection");
    this.options = this.selectbox.getElementsByTagName("option");

    this.graphList = document.querySelector(".graph-list");
    this.graphBars = Array.prototype.slice.call(this.graphList.getElementsByTagName("li"));

    this.inputButton = document.querySelector(".input-button");
    this.input = document.querySelector(".input-value");
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

  addClass(target, className) {
    target.classList.add(className);
  }

  removeClass(target, className) {
    target.classList.remove(className);
  }

  get inputValue() {
    return this.input.value;
  }

  changeValidation(text) {
    this.validation.classList.remove("hidden");
    this.validation.textContent = text;
  }

  setGraphStyle() {
    const tempBar = document.createElement("li");
    this.graphList.appendChild(tempBar);
    this.graphBarStyle = window.getComputedStyle(this.graphList.querySelector("li"));

    this.graphBarStyleWidth = Number(this.graphBarStyle.width.replace('px', ''));
    this.graphBarStyleHeight = Number(this.graphBarStyle.height.replace('px', ''));
    this.graphBarStyleMargin = Number(this.graphBarStyle.marginLeft.replace('px', ''));

    this.graphList.querySelector("li").remove();
  }

  clearGraph() {
    while(this.graphList.hasChildNodes()) {
      this.graphList.removeChild(this.graphList.firstChild);
    }
  }

  renderGraph(array) {
    this.clearGraph();
    this.setGraphStyle();

    for (let i = 0; i < array.length; i++) {
      const graph = document.createElement("li");
      const number = document.createElement("span");
      const max = Math.max(...array);

      graph.style.height = this.graphBarStyleHeight * (array[i] / max) + "px";
      graph.removeAttribute("data-translate");
      number.textContent = array[i];
      graph.appendChild(number);
      this.graphList.appendChild(graph);
    }

    this.graphBars = Array.prototype.slice.call(this.graphList.getElementsByTagName("li"));
  }

  swapGraph(leftBar, rightBar, leftBarIndex, rightBarIndex) {
    const width = this.graphBarStyleWidth;
    const margin = this.graphBarStyleMargin;
    const gap = Math.abs(rightBarIndex - leftBarIndex);
    const oldGraph = leftBar;

    let leftMove = (width + (margin * 2)) * gap;
    let rightMove = -(width + (margin * 2)) * gap;

    return new Promise((resolve) => {
      setTimeout(() => {
        this._makeTransform(leftBar, leftMove);
        this._makeTransform(rightBar, rightMove);
        this.graphBars[leftBarIndex] = rightBar;
        this.graphBars[rightBarIndex] = oldGraph;
        resolve("done");
      }, 500)
    });
  }

  _makeTransform(node, value) {
    const position = Number(node.getAttribute("data-translate"));

    if (position) {
      const newTranslate = position + value;
      node.style.transform = `translateX(${newTranslate}px)`;
      node.setAttribute("data-translate", newTranslate);
      return;
    }

    node.style.transform = `translateX(${value}px)`;
    node.setAttribute("data-translate", value);
  }

  selectGraph(leftBar, rightBar, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        leftBar.classList.add(className);
        rightBar.classList.add(className);
        resolve("done");
      }, 500);
    });
  }

  deselectGraph(leftBar, rightBar, className) {
    return new Promise((resolve) => {
      setTimeout(() => {
        leftBar.classList.remove(className);
        rightBar.classList.remove(className);
        resolve("done");
      }, 500);
    });
  } 
}
