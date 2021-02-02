export { View };

class View {

  constructor() {
    this.validation = document.querySelector(".validation-text");

    this.selectbox = document.getElementById("sort-selection");
    this.options = this.selectbox.getElementsByTagName("option");

    this.graphList = document.querySelector(".graph-list");
    this.graphs = document.querySelectorAll(".graph-list li");

    this.inputButton = document.querySelector(".input-button");
    this.input= document.querySelector(".input-value");

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
    for (let i = 0; i < this.graphs.length; i++) {
      this.graphs[i].remove();
    }

    for (let i = 0; i < array.length; i++) {
      const graph = document.createElement("li");
      const number = document.createElement("span");
      const max = Math.max(...array);

      graph.setAttribute("data-value", array[i]);
      graph.style.height = 250 * (array[i] / max) + "px";
      number.textContent = array[i];
      graph.appendChild(number);
      this.graphList.appendChild(graph);
    }
  }
}
