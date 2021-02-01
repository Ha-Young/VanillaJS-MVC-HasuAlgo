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
  $form.addEventListener("submit", function(e) {
    e.preventDefault();

    const sortType = $sortSelection.options[$sortSelection.selectedIndex].text;
    const numbers = $numbers.value;
    const numberArray = numbers.split(",");

    if (numberArray.length < 5 || numberArray.length > 10) {
      window.alert("out of range");
    }

    if (numberArray.some(element => element === "," || element === "")) {
      window.alert("Not valid");
    }

    const model = new Model(sortType, numberArray);
    const maxNum = model.findMaxNum();
    const template = new Template();
    const view = new View(template.generateNumberBlocks(numberArray, maxNum));
    const controller = new Controller(model, view);

    console.log(sortType);
    console.log(numberArray)
    console.log(controller);

    controller.initialize($content);
  });
}

init();
