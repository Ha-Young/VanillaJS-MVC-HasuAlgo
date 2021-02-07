export default class Controller {
  "use strict";
  /**
   * Takes a model and view and acts as the controller between them
   *
   * @constructor
   * @param {object} model The model instance
   * @param {object} view The view instance
   */
  constructor(Model, View) {
    this.model = Model;
    this.view = View;
    this.viewEvents = ["formSubmit", "startSort"];

    this.view.bind(this.viewEvents[0], (selection, input) => {
      this.setInitialState(selection, input);
    });

    this.view.bind(this.viewEvents[1], () => {
      this.startAnimation();
    });
  }

  setInitialState = (selection, input) => {
    this.model.create(selection, input, (data) => {
      this.view.render.clearBlocks();
      this.view.render.generateBlocks(data);
    });
  }

  startAnimation = () => {
    if (this.view.checkBlocksSorted()) {
      this.view.render.clearBlocks();
      this.model.reset();
      this.view.render.generateBlocks(this.model.getData());
    }

    const sortType = this.model.getSortType();

    switch (sortType) {
      case "Bubble Sort":
        this.model.bubbleSort(this.view);
        break;
      case "Insertion Sort":
        break;
      case "Quick Sort":
        this.model.quickSort(this.view);
        break;
      case "Merge Sort":
        break;
      default:
        alert("Sorry for Inconvinience.\nPlease select the type of the sort.");
    }
  }
}
