export { Controller };

class Controller {

  constructor(model, view) {
    this.model = model;
    this.view = view;

  }

  handleAddData(data) {
    this.model.addData(data);
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

  handleRenderGraph() {
    this.view.inputButton.addEventListener("click", () => {
      if (this.checkData() && this.checkSort()) {
        this.view.clearGraph();
        this.view.renderGraph(this.model.unsortedArray);
        this.handleAddClass(this.view.validation, "hidden");
        this.handleRemoveClass(this.view.sortButton, "invisible");
        this.startSort();
      }
    });
  }

  animationDelayTime(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time)
    })
  }

  showRestartClearButtons() {
    this.handleRemoveClass(this.view.sortRestartButton, "invisible");
    this.handleRemoveClass(this.view.sortClearButton, "invisible");

    this.view.sortRestartButton.addEventListener("click", () => {
      this.handleAddData(this.view.inputValue);
      this.view.clearGraph();
      this.view.renderGraph(this.model.unsortedArray);
      this.startSort();
    });
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

  checkSort() {
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

  startSort() {
    this.view.sortButton.addEventListener("click", () => {
      const sortName = this.checkSort();

      if (sortName === "Bubble") {
        this.doBubbleSort(this.model.unsortedArray);
      }
      if (sortName === "Quick") {
        this.doQuickSort(this.model.unsortedArray, 0, this.model.unsortedArray.length - 1);
      }
      this.handleAddClass(this.view.sortButton, "invisible");
    });
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
            this.handleAddClass(graphs[j+1], "confirmed");
            await this.animationDelayTime(500);
          }

        } else {
          await this.view.selectGraph(graphs[j], graphs[j + 1], "stopped");
          await this.view.deselectGraph(graphs[j], graphs[j + 1], "stopped");
        }
      }
      this.handleAddClass(graphs[dataArray.length - i - 1], "confirmed");
      await this.animationDelayTime(500);
    }
    this.showRestartClearButtons();
  }

  async doQuickSort(dataArray, start, end) {
    if (start >= end) return;

    const pivotIndex = await this._divide(dataArray, start, end);

    await this.doQuickSort(dataArray, start, pivotIndex - 1);
    await this.doQuickSort(dataArray, pivotIndex + 1, end);

    this.showRestartClearButtons();
  }

  async _divide(dataArray, start, end) {
    const graphs = this.view.graphBars;
    const pivotValue = dataArray[end];
    let pivotIndex = start;

    this.handleAddClass(graphs[end], "pivot");
    await this.animationDelayTime(500);

    for (let i = start; i < end; i++) {
      if (dataArray[i] <= pivotValue) {
        this._swapElement(dataArray, pivotIndex, i);

        if (pivotIndex !== i) {
          await this.view.selectGraph(graphs[pivotIndex], graphs[i], "selected");
          await this.view.swapGraph(graphs[pivotIndex], graphs[i], pivotIndex, i);
          await this.view.deselectGraph(graphs[pivotIndex], graphs[i], "selected");
        } else {
          this.handleAddClass(graphs[i], "stopped");
          await this.animationDelayTime(500);
          this.handleRemoveClass(graphs[i], "stopped");
          await this.animationDelayTime(500);
        }

        pivotIndex++;
      } else {
        this.handleAddClass(graphs[i], "stopped");
        await this.animationDelayTime(500);
        this.handleRemoveClass(graphs[i], "stopped");
        await this.animationDelayTime(500);
      }
    }

    this._swapElement(dataArray, pivotIndex, end);

    await this.view.selectGraph(graphs[pivotIndex], graphs[end], "selected");
    await this.view.swapGraph(graphs[pivotIndex], graphs[end], pivotIndex, end);
    await this.view.deselectGraph(graphs[pivotIndex], graphs[end], "selected");
    this.handleRemoveClass(graphs[pivotIndex], "pivot");
    await this.animationDelayTime(500);
    this.handleAddClass(graphs[pivotIndex], "confirmed");
    await this.animationDelayTime(500);

    return pivotIndex;
  }

  _swapElement(array, start, end) {
    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;
  }
}
