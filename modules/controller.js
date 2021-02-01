import Model from './model.js';
import View from './view.js';
import Template from '../utils/template.js'

export default class Controller {
  "use strict";

  constructor(Model, View) {
    this.model = Model;
    this.view = View;
  }

  bubbleSort() {
    const model = this.model;

    if (model.sortType === "Bubble Sort") {
      for (let i = 0; i < model.numberArray.length; i++) {
        for (let j = 0; j < model.numberArray.length; j++) {
          if (model.numberArray[i] > model.numberArray[j]) {
            model.swap(i, j);
            // ((i,j) => {
            //   this.view.update(i,j);
            // })(i,j);
          }
        }
      }
    }
  }

  initialize(node) {
    this.view.render(node);
  }
}