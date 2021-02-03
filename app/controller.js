import MYAPP from "./myapp";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.storage = this.model.get();
  }

  run() {
    let isClicked = false;
    MYAPP.button.start.addEventListener("click", () => {
      if (!isClicked && MYAPP.table.input.value) {
        this.init();
        this.sort();
        isClicked = true;
      }
    });
  }

  init() {
    const userInputValue = MYAPP.table.input.value;
    this.model.set(userInputValue);
    this.view.renderGraphs(this.storage);
  }

  async sort() {
    const numberGraphs = MYAPP.table.graph.children.length;
    const graph = MYAPP.table.graph.children;
    const graphTable = MYAPP.table.graph;

    for (let i = 0; i < numberGraphs; i++) {
      let swapped;
      for (let j = 0; j < numberGraphs - 1 - i; j++) {
        const left = graph[j];
        const right = graph[j + 1];
        const leftValue = Number(left.dataset.id);
        const rightValue = Number(right.dataset.id);

        this.view.clearAllColor(graphTable);
        await this.view.renderDefaultColor(left, right);

        if (leftValue > rightValue) {
          await this.view.renderSwapAnimation(left, right);
          this.model.swapIndex(j, j + 1);
          await this.view.renderGraphs(this.storage);
          swapped = true;
        }

        if (j === numberGraphs - 2 - i) {
          const sortedGraph = graph[numberGraphs - i - 1];
          console.log("in");
          console.log(sortedGraph);
          await this.view.renderGraphs(
            this.storage,
            Number(sortedGraph.dataset.id)
          );
        }
      }

      //await this.view.renderSortedGraphColor();

      console.log(
        `${i}회전한 결과는 ${this.graphTable}---------------------------`
      );

      if (!swapped) {
        //this.view.clearAllColor(graphTable);
        return;
      }
    }
  }
}
