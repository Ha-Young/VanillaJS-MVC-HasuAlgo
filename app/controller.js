export { Controller };
import { View } from './view';
import { GraphData } from './model';

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
    this.model.dataArray = this.model.data.replace(/ /g, '').split(",").map((num) => Number(num));

    if (isNaN(this.model.filteredData)) {
      this.view.changeValidation(this.view.validationText["isNaN"]);
      return false;
    }

    if (this.model.dataArray.length > 10) {
      this.view.changeValidation(this.view.validationText["over10"]);
      return false;
    }

    if (this.model.dataArray.length < 5) {
      this.view.changeValidation(this.view.validationText["under5"]);
      return false;
    }

    for (let i = 0; i < this.model.dataArray.length; i++) {
      if (this.model.dataArray[i] > 50) {
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
    if (this.view.options[1].selected) {
      return true;
    }
  }

  doBubbleSort(dataArray) {
    (async () => {
      const graphs = Array.prototype.slice.call(document.querySelectorAll(".graph-list li"));
      this.view.graphs = graphs;
      debugger;
      for (let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < dataArray.length - i - 1; j++) {
          if (dataArray[j] > dataArray[j+1]) {
            const big = dataArray[j];
            dataArray[j] = dataArray[j+1];
            dataArray[j+1] = big;
            await this.view.selectGraph(this.view.graphs[j], this.view.graphs[j+1], "selected");
            await this.view.swapGraph(this.view.graphs[j], this.view.graphs[j+1], j, j+1);
            await this.view.deselectGraph(this.view.graphs[j], this.view.graphs[j+1], "selected");
            if ((j + 1) === dataArray.length - i - 1) {
              await this.view.confirmGraph(this.view.graphs[j+1], "confirmed");
            }
          } else {
            await this.view.selectGraph(this.view.graphs[j], this.view.graphs[j+1], "stopped");
            await this.view.deselectGraph(this.view.graphs[j], this.view.graphs[j+1], "stopped");
          }
        }
        await this.view.confirmGraph(this.view.graphs[dataArray.length - i - 1], "confirmed");
      }
    })();
  }
}
