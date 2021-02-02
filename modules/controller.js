import Model from './model.js';
import View from './view.js';
import Template from '../utils/template.js'

export default class Controller {
  "use strict";

  constructor(Model, View) {
    this.model = Model;
    this.view = View;
  }

  // bubbleSort() {
  //   const model = this.model;
  //   this.view.render();

  //   if (model.sortType === "Bubble Sort") {
  //     for (let c = 0; c < model.numberArray.length; c++) {
  //       for (let i = 0; i < model.numberArray.length - 1; i++) {
  //         if (model.numberArray[i] > model.numberArray[i + 1]) {
  //           const oldArray = [...model.numberArray];
  //           const swapped = model.swap(i, i + 1);
  //           console.log(swapped);

  //           ((swapped,i,j) => {
  //             setTimeout(this.view.update.bind(this.view, swapped[i], swapped[j]), c*1000);
  //           })(swapped, i, i+1);

  //         }
  //         //return;
  //       }
  //     }

  //     this.view.cleanBlocks();
  //   }
  // }

  initialize(sortType, maxHeight) {
    if (sortType === "Merge Sort") {
      return;
    }

    const model = this.model;
    const maxInData = model.findMaxNum();
    // const $numberBlock = document.createElement("div");
    // $numberBlock.classList.add("number-block");
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
    //debugger;
    //const $numberBlocks = document.querySelectorAll(".number-block");
    const numberArray = this.model.numberArray;
    for (let i = 0; i < numberArray.length; i++) {
      for (let j = 0; j < numberArray.length - i - 1; j++) {
        this.view.changeColor(j);
        this.view.changeColor(j + 1);

        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        })

        if (numberArray[j] > numberArray[j + 1]) {
          this.model.swap(j, j + 1);
          await this.view.swapBlocks(numberArray[j], numberArray[j + 1]);
        }

        this.view.changeColor(j);
        this.view.changeColor(j + 1);

        debugger;
      }

      this.view.changeColor(numberArray.length - i - 1, "sorted");
    }
  }
}