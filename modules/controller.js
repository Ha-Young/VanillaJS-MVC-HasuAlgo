import Model from './model.js';
import View from './view.js';
import Template from '../utils/template.js'

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
  }

  initialize(sortType, maxHeight) {
    this.view.clearContent();

    if (sortType === "Merge Sort") {
      return;
    }

    const model = this.model;
    const maxInData = model.findMaxNum();
    let standard = 1;

    if (maxInData > maxHeight) {
      standard *= (maxHeight / maxInData);
    } else if (maxInData < 100) {
      standard = 5;
    }

    for (let i = 0; i < this.model.numberArray.length; i++) {
      this.view.generateBlocks(standard * this.model.numberArray[i], this.model.numberArray[i], i);
    }
  }

  async bubbleSort() {
    const numberArray = this.model.numberArray;
    for (let i = 0; i < numberArray.length; i++) {
      for (let j = 0; j < numberArray.length - i - 1; j++) {
        this.view.changeColor(j);
        this.view.changeColor(j + 1);
        await this.view.wait(1000);

        if (numberArray[j] > numberArray[j + 1]) {
          this.model.swap(j, j + 1);
          await this.view.swapBlocks(j, j + 1);
        }

        this.view.removeColor(j);
        this.view.removeColor(j + 1);
      }

      this.view.changeColor(numberArray.length - i - 1, "sorted");
      await this.view.wait(500);
    }
  }
}
