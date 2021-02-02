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
      number.textContent = array[i];
      graph.appendChild(number);
      this.graphList.appendChild(graph);
    }
  }

  swapGraph(leftGraph, rightGraph, leftIndex, rightIndex) {
    const graphStyle = window.getComputedStyle(leftGraph);
    const width = Number(graphStyle.width.replace('px', ''));
    const margin = Number(graphStyle.marginLeft.replace('px', ''));

    let leftMove = width + (margin * 2);
    let rightMove = -(width + (margin * 2));

    return new Promise ((resolve) => {
      setTimeout(() => {
        makeTransform(leftGraph, leftMove);
        makeTransform(rightGraph, rightMove);
        const oldGraph = leftGraph;
        this.graphs[leftIndex] = rightGraph;
        this.graphs[rightIndex] = oldGraph;
        resolve("swap done!");
      }, 500);
    });

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

  selectGraph(leftGraph, rightGraph, classname) {
    return new Promise((resolve) => {
      setTimeout(() => {
        leftGraph.classList.add(classname);
        rightGraph.classList.add(classname);
        resolve("select Done")
      }, 500);
    });
  }

  deselectGraph(leftGraph, rightGraph, classname) {
    return new Promise((resolve) => {
      setTimeout(() => {
        leftGraph.classList.remove(classname);
        rightGraph.classList.remove(classname);
        resolve("deselect Done")
      }, 500);
    });
  }

  confirmGraph(graph, classname) {
    return new Promise((resolve) => {
      setTimeout(() => {
        graph.classList.add(classname);
        resolve("confirm Done")
      }, 500);
    });
  }
}
