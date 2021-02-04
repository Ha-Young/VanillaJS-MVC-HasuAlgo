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

    this.view.bind("startSort", () => {
      this.startAnimation();
    });
  }

  setInitialState = (selection, input) => {
    this.model.create(selection, input, (data) => {
      this.view.render("clearBlocks");
      this.view.render("generateBlocks", data);
    });
  }

  startAnimation = () => {
    if (this.view.checkBlocksSorted()) {
      this.view.render("clearBlocks");
      this.model.reset();
      this.view.render("generateBlocks", this.model.getData());
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
        console.log("------");
    }
  }
}
