import Model from './model.js';
import View from './view.js';
import Template from '../utils/template.js'

export default class Controller {
  "use strict";

  constructor(Model, View) {
    this.model = Model;
    this.view = View;

    this.view.bind("formSubmit", (selection, input) => {
      this.setInitialState(selection, input);
    });
  }

  setInitialState(selection, input) {
    //clearContent 동작안하는거 고쳐야함
    //this.view.clearContent();
    const sortType = this.model.create(selection, input, (data) => {
      this.view.render("generateBlocks", data);
    });

    switch (sortType) {
      case "Bubble Sort":
        this.model.bubbleSort(this.view.pickBlocks, this.view.swapBlocks.bind(this.view),
          this.view.releaseBlocks.bind(this.view),
          this.view.releaseBlocksAsync.bind(this.view), this.view.decideSorted);
        break;
      case "Insertion Sort":
        break;
      case "Quick Sort":
        break;
      case "Merge Sort":
        break;
      default:
        console.log("------");
    }
  }
}
