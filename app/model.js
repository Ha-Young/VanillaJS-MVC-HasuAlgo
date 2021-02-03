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
const $submitButton = document.getElementById('submitButton');
const $playButton = document.getElementById('playButton');
const $stopButton = document.getElementById('stopButton');
const $replayButton = document.getElementById('replayButton');
const $fastButton = document.getElementById('fastButton');
const $slowButton = document.getElementById('slowButton');
let sortingList;

$inputBox.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    const inputValue = $inputBox.value;

    sortingList = controller._checkValue(inputValue);
    view._createBlock(sortingList);
  }
});

$submitButton.addEventListener('click', function () {
  const inputValue = $inputBox.value;

  sortingList = controller._checkValue(inputValue);
  view._createBlock(sortingList);
});

$playButton.addEventListener('click', function () {
  controller._bubbleSort(sortingList);
});

$fastButton.addEventListener('click', function () {
  controller._setTime("down");
});

$slowButton.addEventListener('click', function () {
  controller._setTime("up");
})

function swap(smallValue, largeValue) {
  view._swapElement(smallValue, largeValue);
}

export { swap };
