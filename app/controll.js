export default function Controll(model, view) {
  this.model = model;
  this.view = view;

  this.view.activateEvent("mainForm", "submit", (function (event) {
    event.preventDefault();

    const MAIN_INPUT_INDEX = 0;
    const SORT_SELECT_INDEX = 1;
    const inputedNums = event.target[MAIN_INPUT_INDEX].value;
    const sortType = event.target[SORT_SELECT_INDEX].value;

    const setResult = this.model.set("submittedData", { inputedNums, sortType });

    if (setResult) {
      this.drawGraph();
    }
  }).bind(this))

  this.drawGraph = function () {
    
  }
}

