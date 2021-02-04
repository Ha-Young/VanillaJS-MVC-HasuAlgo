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

  handleSwapGraph(leftBar, rightBar, leftBarIndex, rightBarIndex) {
    this.view.swapGraph(leftBar, rightBar, leftBarIndex, rightBarIndex);
  }

  handleSelectGraph(leftBar, rightBar, className) {
    this.view.selectGraph(leftBar, rightBar, className)
  }

  animationDelayTime(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time)
    })
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
        return;
      }
      if (sortName === "Quick") {
        this.doQuickSort(this.model.unsortedArray, 0, this.model.unsortedArray.length - 1);
      }
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

          this.view.selectGraph(graphs[j], graphs[j + 1], "selected");
          await this.animationDelayTime(500);
          this.view.swapGraph(graphs[j], graphs[j + 1], j, j + 1);
          await this.animationDelayTime(500);
          this.view.deselectGraph(graphs[j], graphs[j + 1], "selected");
          await this.animationDelayTime(500);

          if ((j + 1) === dataArray.length - i - 1) {
            this.handleAddClass(graphs[j+1], "confirmed");
            await this.animationDelayTime(500);
          }
        } else {
          this.view.selectGraph(graphs[j], graphs[j + 1], "stopped");
          await this.animationDelayTime(500);
          this.view.deselectGraph(graphs[j], graphs[j + 1], "stopped");
          await this.animationDelayTime(500);
        }
      }
      this.handleAddClass(graphs[dataArray.length - i - 1], "confirmed");
      await this.animationDelayTime(500);
    }
    this.model.sortedArray = this.model.unsortedArray.slice();
  }

  async doQuickSort(dataArray, start, end) {
    const self = this;
    const graphs = this.view.graphBars;

    if (start >= end) return;

    const pivotIndex = await divide(dataArray, start, end);

    await this.doQuickSort(dataArray, start, pivotIndex - 1);
    await this.doQuickSort(dataArray, pivotIndex + 1, end);

    async function divide(dataArray, start, end) {
      const pivotValue = dataArray[end];
      let pivotIndex = start;

      await self.view.paintGraph(graphs[end], "pivot");

      for (let i = start; i < end; i++) {
        if (dataArray[i] <= pivotValue) {
          swapElement(dataArray, pivotIndex, i);

          if (pivotIndex !== i) {
            await self.view.selectGraph(graphs[pivotIndex], graphs[i], "selected");
            await self.view.swapGraph(graphs[pivotIndex], graphs[i], pivotIndex, i);
            await self.view.deselectGraph(graphs[pivotIndex], graphs[i], "selected");
          } else {
            await self.view.paintGraph(graphs[i], "stopped");
            await self.view.unpaintGraph(graphs[i], "stopped");
          }

          pivotIndex++;
        } else {
          await self.view.paintGraph(graphs[i], "stopped");
          await self.view.unpaintGraph(graphs[i], "stopped");
        }
      }

      swapElement(dataArray, pivotIndex, end);

      await self.view.selectGraph(graphs[pivotIndex], graphs[end], "selected");
      await self.view.swapGraph(graphs[pivotIndex], graphs[end], pivotIndex, end);
      await self.view.deselectGraph(graphs[pivotIndex], graphs[end], "selected");
      await self.view.unpaintGraph(graphs[pivotIndex], "pivot");
      await self.view.paintGraph(graphs[pivotIndex], "confirmed");

      return pivotIndex;
    }

    function swapElement(array, start, end) {
      const temp = array[start];
      array[start] = array[end];
      array[end] = temp;
    }
  }
}
