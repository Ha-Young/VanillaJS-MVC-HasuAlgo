// Load application styles
import '../assets/styles/index.less';
import View from './view.js';
import Controller from './controller.js';

// ================================
// START YOUR APP HERE
// ================================

const view = new View();
const controller = new Controller();

const $inputBox = document.getElementById('inputBox');
let sortingList;

$inputBox.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    const inputValue = $inputBox.value;

    sortingList = controller._checkValue(inputValue);
    view._createBlock(sortingList);
  }
});

function swap(smallValue, largeValue) {
  view._swapElement(smallValue, largeValue);
}

const $submitButton = document.getElementById('submitButton');

$submitButton.addEventListener('click', function(event) {
  controller._bubbleSort(sortingList);
});

export { swap };
