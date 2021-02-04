// Load application styles
import '../assets/styles/index.less';
import View from './view.js';
import Model from './model.js';

// ================================
// START YOUR APP HERE
// ================================

const view = new View();
const model = new Model();

const $inputBox = document.getElementById('inputBox');
const $submitButton = document.getElementById('submitButton');
const $playButton = document.getElementById('playButton');
const $pauseButton = document.getElementById('pauseButton');
const $replayButton = document.getElementById('replayButton');
const $fastButton = document.getElementById('fastButton');
const $slowButton = document.getElementById('slowButton');
let sortingList;

$submitButton.addEventListener('click', function () {
  const inputValue = $inputBox.value;

  sortingList = model._checkValue(inputValue);

  if (sortingList) {
    $submitButton.disabled = true;
    view._createBlock(sortingList);
  }
});

$playButton.addEventListener('click', function () {
  if (sortingList) {
    $playButton.disabled = true;
    model._bubbleSort(sortingList);
  }
});

$fastButton.addEventListener('click', function () {
  model._setTime("fast");
});

$slowButton.addEventListener('click', function () {
  model._setTime("slow");
})

$replayButton.addEventListener('click', function () {
  $submitButton.disabled = false;
  $playButton.disabled = false;

  model._resetBoard();
})

async function swap(smallValue, largeValue) {
  await view._swapElements(smallValue, largeValue);
}

export { swap };
