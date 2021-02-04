export { Controller };

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  clickEvent(target, callback) {
    target.addEventListener("click", callback);
  }

  getInputValue() {
    return this.view.input.value;
  }

  checkData() {
    this.model.data = this.getInputValue();
    this.model.filteredData = this.model.data.replaceAll(',', '').replace(/ /g, '');
    this.model.unsortedArray = this.model.data.replace(/ /g, '').split(",").map((num) => Number(num));
    this.model.sortedArray = this.model.unsortedArray.slice();

    if (isNaN(this.model.filteredData)) {
      this.view.changeValidation(this.view.validationText["isNaN"]);
      return false;
    }

    if (this.model.unsortedArray.length > 10) {
      this.view.changeValidation(this.view.validationText["over10"]);
      return false;
    }

    if (this.model.unsortedArray.length < 5) {
      this.view.changeValidation(this.view.validationText["under5"]);
      return false;
    }

    for (let i = 0; i < this.model.unsortedArray.length; i++) {
      if (this.model.unsortedArray[i] > 50) {
        this.view.changeValidation(this.view.validationText["over50"]);
        return false;
      }
    }
    return true;
  }

  checkSort() {
    if (this.view.options[0].selected) {
      this.view.changeValidation(this.view.validationText["sort"]);
      return false;
    }
    if (this.view.options[1].selected) return 1;
    if (this.view.options[2].selected) return 2;
  }

  async doBubbleSort(dataArray) {
    const graphs = this.view.graphs;

    for (let i = 0; i < dataArray.length; i++) {
      for (let j = 0; j < dataArray.length - i - 1; j++) {
        if (dataArray[j] > dataArray[j+1]) {
          const bigNumber = dataArray[j];

          dataArray[j] = dataArray[j+1];
          dataArray[j+1] = bigNumber;

          await this.view.selectGraph(graphs[j], graphs[j+1], "selected");
          await this.view.swapGraph(graphs[j], graphs[j+1], j, j+1);
          await this.view.deselectGraph(graphs[j], graphs[j+1], "selected");

          if ((j + 1) === dataArray.length - i - 1) {
            await this.view.paintGraph(graphs[j+1], "confirmed");
          }
        } else {
          await this.view.selectGraph(graphs[j], graphs[j+1], "stopped");
          await this.view.deselectGraph(graphs[j], graphs[j+1], "stopped");
        }
      }
      await this.view.paintGraph(graphs[dataArray.length - i - 1], "confirmed");
    }
    this.model.sortedArray = this.model.unsortedArray.slice();
  }

  async doQuickSort(dataArray, start, end) {
    const self = this;
    const graphs = this.view.graphs;

    if (start >= end) return;

    const pivotIndex = await divide(dataArray, start, end);
    await this.doQuickSort(dataArray, start, pivotIndex - 1);
    await this.doQuickSort(dataArray, pivotIndex + 1, end);

    async function divide(dataArray, start, end) {
      let pivotIndex = start;
      const pivotValue = dataArray[end];
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
