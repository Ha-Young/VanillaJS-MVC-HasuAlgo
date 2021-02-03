// Load application styles
import '../assets/styles/index.less';
import Controller from '../modules/controller.js';
import Model from '../modules/model.js';
import View from '../modules/view.js';
import Template from '../utils/template.js';

// ================================
// START YOUR APP HERE
// ================================
const $form = document.querySelector("form");
const $sortSelection = $form.querySelector(".sort-selection");
const $numbers = $form.querySelector(".numbers");
const $content = document.querySelector(".content");

function init() {
  // $form.addEventListener("submit", function (e) {
  //   e.stopImmediatePropagation();
  //   e.preventDefault();

  //   const sortType = $sortSelection.options[$sortSelection.selectedIndex].text;
  //   const numbers = $numbers.value;
  //   let numberArray = numbers.split(",");

  //   if (numberArray.length < 5 || numberArray.length > 10) {
  //     window.alert("out of range");
  //     return;
  //   }

  //   if (numberArray.some(element => element.match(/[^0-9]/g))) {
  //     window.alert("Not valid");
  //   }

  //   numberArray = numberArray.map(element => parseInt(element, 10));

  //   const model = new Model(sortType, numberArray);
  //   const maxNum = model.findMaxNum();
  //   const template = new Template();
  //   const view = new View(template.generateNumberBlocks(numberArray, maxNum), $content);
  //   const controller = new Controller(model, view);
  //   let maxHeight = sortType === "Merge Sort" ? 20 : 800;
  //   controller.initialize(sortType, maxHeight);
  //   controller.bubbleSort();
  // });
  const model = new Model();
  const template = new Template();
  const view = new View(template);
  const controller = new Controller(model, view);
}

init();
