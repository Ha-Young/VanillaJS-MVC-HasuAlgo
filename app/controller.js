export { Controller };

class Controller {

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.handleEventListener(view);
  }

  handleAddData(data) {
    this.model.addData(data);
    console.log(this.model);
  }

  handleAddClass(target, className) {
    this.view.addClass(target, className);
  }

  handleRemoveClass(target, className) {
    this.view.removeClass(target, className);
  }

  handleChangeValidation(name) {
    const text = this.view.validationText;
    this.view.changeValidation(text[name]);
  }

  handleEventListener(view) {
    const inputButton = view.inputButton;
    const sortButton = view.sortButton;
    const restartButton = view.sortRestartButton;
    const clearButton = view.sortClearButton;

    inputButton.addEventListener("click", this.handleRenderGraph);
    sortButton.addEventListener("click", this.startSort);
    restartButton.addEventListener("click", () => {
      this.handleRenderGraph();
      this.startSort();
      this.controlRestartClearButtons();
    });
    clearButton.addEventListener("click", () => {
      view.clearGraph();
      this.controlRestartClearButtons();
    });
  }

  handleRenderGraph = () => {
    const sortButton = this.view.sortButton;

    if (this.checkData() && this.checkSort()) {
      this.view.clearGraph();
      this.view.renderGraph(this.model.unsortedArray);
      this.handleAddClass(this.view.validation, "hidden");
      this.handleRemoveClass(sortButton, "invisible");
    }
  }

  controlRestartClearButtons() {
    if (this.view.sortRestartButton.classList.contains("invisible")) {
      this.handleRemoveClass(this.view.sortRestartButton, "invisible");
      this.handleRemoveClass(this.view.sortClearButton, "invisible");
      return;
    }
    this.handleAddClass(this.view.sortRestartButton, "invisible");
    this.handleAddClass(this.view.sortClearButton, "invisible");
  }

  checkData() {
    this.handleAddData(this.view.inputValue);

    if (isNaN(this.model.filteredData)) {
      this.handleChangeValidation("isNaN");
      return false;
    }

    if (this.model.unsortedArray.length > 10) {
      this.handleChangeValidation("over10");
      return false;
    }

    if (this.model.unsortedArray.length < 5) {
      this.handleChangeValidation("under5");
      return false;
    }

    for (let i = 0; i < this.model.unsortedArray.length; i++) {
      if (this.model.unsortedArray[i] > 50) {
        this.handleChangeValidation("over50");
        return false;
      }
    }

    return true;
  }

  checkSort = () => {
    const select = this.view.selectbox;
    const sortName = select.options[select.selectedIndex].value;

    switch (sortName) {
      case "SELECT" :
        this.handleChangeValidation("sort");
        break;
      case "BUBBLE SORT" :
        return "Bubble";
      case "QUICK SORT" :
        return "Quick";
    }
  }

  startSort = () => {
    const sortName = this.checkSort();
    if (sortName === "Bubble") {
      this.doBubbleSort(this.model.unsortedArray);
    }
    if (sortName === "Quick") {
      (async () => {
        await this.doQuickSort(this.model.unsortedArray, 0, this.model.unsortedArray.length - 1);
        this.view.confirmGraph();
        this.controlRestartClearButtons()
      })();
    }
    this.handleAddClass(this.view.sortButton, "invisible");
  }

  async doBubbleSort(dataArray) {
    const graphs = this.view.graphBars;

    for (let i = 0; i < dataArray.length; i++) {
      for (let j = 0; j < dataArray.length - i - 1; j++) {
        if (dataArray[j] > dataArray[j+1]) {
          const bigNumber = dataArray[j];

          dataArray[j] = dataArray[j+1];
          dataArray[j+1] = bigNumber;

          await this.view.selectGraph(graphs[j], graphs[j + 1], "selected");
          await this.view.swapGraph(graphs[j], graphs[j + 1], j, j + 1);
          await this.view.deselectGraph(graphs[j], graphs[j + 1], "selected");

          if ((j + 1) === dataArray.length - i - 1) {
            await this.view.paintGraph(graphs[j +1 ], "confirmed");
          }

        } else {
          await this.view.selectGraph(graphs[j], graphs[j + 1], "stopped");
          await this.view.deselectGraph(graphs[j], graphs[j + 1], "stopped");
        }
      }
      await this.view.paintGraph(graphs[dataArray.length - i - 1], "confirmed");
    }
    this.controlRestartClearButtons();
  }

  async doQuickSort(dataArray, start, end) {
    if (start >= end) return;

    const pivotIndex = await this._divide(dataArray, start, end);

    await this.doQuickSort(dataArray, start, pivotIndex - 1);
    await this.doQuickSort(dataArray, pivotIndex + 1, end);
  }

  async _divide(dataArray, start, end) {
    const graphs = this.view.graphBars;
    const pivotValue = dataArray[end];
    let pivotIndex = start;

    await this.view.paintGraph(graphs[end], "pivot");

    for (let i = start; i < end; i++) {
      if (dataArray[i] <= pivotValue) {
        this._swapElement(dataArray, pivotIndex, i);

        if (pivotIndex !== i) {
          await this.view.selectGraph(graphs[pivotIndex], graphs[i], "selected");
          await this.view.swapGraph(graphs[pivotIndex], graphs[i], pivotIndex, i);
          await this.view.deselectGraph(graphs[pivotIndex], graphs[i], "selected");
        } else {
          await this.view.paintGraph(graphs[i], "stopped");
          await this.view.unpaintGraph(graphs[i], "stopped");
        }

        pivotIndex++;
      } else {
        await this.view.paintGraph(graphs[i], "stopped");
        await this.view.unpaintGraph(graphs[i], "stopped");
      }
    }

    this._swapElement(dataArray, pivotIndex, end);

    await this.view.selectGraph(graphs[pivotIndex], graphs[end], "selected");
    await this.view.swapGraph(graphs[pivotIndex], graphs[end], pivotIndex, end);
    await this.view.deselectGraph(graphs[pivotIndex], graphs[end], "selected");

    await this.view.unpaintGraph(graphs[pivotIndex], "pivot");
    await this.view.paintGraph(graphs[pivotIndex], "confirmed");

    return pivotIndex;
  }

  _swapElement = (array, start, end) => {
    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;
  }
}
