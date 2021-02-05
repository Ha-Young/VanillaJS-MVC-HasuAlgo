export { Controller };

class Controller {

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.handleEventListener(view);
  }

  handleAddData(data) {
    this.model.addData(data);
  }

  handleAddTask(name, leftBarIndex, rightBarIndex) {
    const task = this.model.createTask(name, leftBarIndex, rightBarIndex);
    this.model.addTask(task);
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
    const inputBox = view.inputBox;
    const sortButton = view.sortButton;
    const sortRestartButton = view.sortRestartButton;
    const clearButton = view.sortClearButton;

    inputBox.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleRenderGraph(event);
      this.handleAddClass(sortRestartButton, "invisible");
      this.handleAddClass(clearButton, "invisible");
    });
    sortButton.addEventListener("click", this.startSort);
    sortRestartButton.addEventListener("click", (event) => {
      this.handleRenderGraph(event);
      this.startSort();
      view.controlRestartClearButtons();
    });
    clearButton.addEventListener("click", () => {
      view.clearGraph();
      view.controlRestartClearButtons();
    });
  }

  handleRenderGraph = (event) => {
    const sortButton = this.view.sortButton;
    const sortRestartButton = this.view.sortRestartButton;

    if (event.target === sortRestartButton) {
      this.model.sortedArray = this.model.unsortedArray.slice();
      this.view.clearGraph();
      this.view.renderGraph(this.model.sortedArray);
      return;
    }

    if (this.checkData() && this.checkSort()) {
      this.view.clearGraph();
      this.view.renderGraph(this.model.sortedArray);
      this.handleAddClass(this.view.validation, "hidden");
      this.handleRemoveClass(sortButton, "invisible");
    }
  }

  async executeTask(tasks) {
    const currentTask = tasks[0];

    if (!tasks.length) {
      this.view.controlRestartClearButtons();
      return;
    }

    this.handleAnimateGraph(currentTask);
    tasks.shift();
    await this.delay(300);
    this.executeTask(tasks);
  }

  delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  handleAnimateGraph(task) {
    const graphs = this.view.graphBars;

    switch (task.name) {
      case "select" :
        this.view.selectGraph(graphs[task.leftBarIndex], graphs[task.rightBarIndex], "selected");
        break;
      case "swap" :
        this.view.swapGraph(graphs[task.leftBarIndex], graphs[task.rightBarIndex], task.leftBarIndex, task.rightBarIndex);
        break;
      case "deselect" :
        this.view.deselectGraph(graphs[task.leftBarIndex], graphs[task.rightBarIndex], "selected");
        break;
      case "stop two bars" :
        this.view.selectGraph(graphs[task.leftBarIndex], graphs[task.rightBarIndex], "stopped");
        break;
      case "continue two bars" :
        this.view.deselectGraph(graphs[task.leftBarIndex], graphs[task.rightBarIndex], "stopped");
        break;
      case "stop one bar" :
        this.view.addClass(graphs[task.leftBarIndex], "stopped");
        break;
      case "continue one bar" :
        this.view.removeClass(graphs[task.leftBarIndex], "stopped");
        break;
      case "confirm" :
        this.view.addClass(graphs[task.leftBarIndex], "confirmed");
        break;
      case "pivot" :
        this.view.addClass(graphs[task.leftBarIndex], "pivot");
        break;
      case "unpainted pivot" :
        this.view.removeClass(graphs[task.leftBarIndex], "pivot");
        break;
      case "finish" :
        this.view.finishGraph();
    }
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
      this.doBubbleSort(this.model.sortedArray);
    }
    if (sortName === "Quick") {
      this.doQuickSort(this.model.sortedArray, 0, this.model.sortedArray.length - 1);
    }
    this.executeTask(this.model.tasks);
    this.handleAddClass(this.view.sortButton, "invisible");
  }

  doBubbleSort(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      for (let j = 0; j < dataArray.length - i - 1; j++) {
        if (dataArray[j] > dataArray[j+1]) {
          const bigNumber = dataArray[j];

          dataArray[j] = dataArray[j+1];
          dataArray[j+1] = bigNumber;

          this.handleAddTask("select", j, j + 1)
          this.handleAddTask("swap", j, j + 1);
          this.handleAddTask("deselect", j, j + 1);

          if ((j + 1) === dataArray.length - i - 1) {
            this.handleAddTask("confirm", j + 1);
          }

        } else {
          this.handleAddTask("stop two bars", j, j + 1);
          this.handleAddTask("continue two bars", j, j + 1);
        }
      }
      this.handleAddTask("confirm", dataArray.length - i - 1);
    }
  }

  doQuickSort(dataArray, start, end) {
    if (start >= end) return;

    const pivotIndex = this._divide(dataArray, start, end);

    this.doQuickSort(dataArray, start, pivotIndex - 1);
    this.doQuickSort(dataArray, pivotIndex + 1, end);
  }

  _divide(dataArray, start, end) {
    const pivotValue = dataArray[end];
    let pivotIndex = start;

    this.handleAddTask("pivot", end);

    for (let i = start; i < end; i++) {
      if (dataArray[i] <= pivotValue) {
        this._swapElement(dataArray, pivotIndex, i);

        if (pivotIndex !== i) {
          this.handleAddTask("select", pivotIndex, i)
          this.handleAddTask("swap", pivotIndex, i);
          this.handleAddTask("deselect", pivotIndex, i);
        } else {
          this.handleAddTask("stop one bar", i);
          this.handleAddTask("continue one bar", i);
        }
        pivotIndex++;
      } else {
        this.handleAddTask("stop one bar", i);
        this.handleAddTask("continue one bar", i);
      }
    }

    this._swapElement(dataArray, pivotIndex, end);

    this.handleAddTask("select", pivotIndex, end)
    this.handleAddTask("swap", pivotIndex, end);
    this.handleAddTask("deselect", pivotIndex, end);
    this.handleAddTask("unpainted pivot", pivotIndex);
    this.handleAddTask("confirm", pivotIndex);

    return pivotIndex;
  }

  _swapElement = (array, start, end) => {
    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;
  }
}
