// Load application styles
import '../assets/styles/index.less';
import View from './view.js';
import Model from './model.js';

// ================================
// START YOUR APP HERE
// ================================

const view = new View();
const model = new Model();

function changeViewStyle(className, ...args) {
  view._changeBlockStyle(className, args);
}

function showViewText(text) {
  view._showText(text);
}

async function swapInView(smallValue, largeValue, swapList, delay) {
  await view._swapElements(smallValue, largeValue, swapList, delay);
}

function init() {
  const $inputBox = document.getElementById('inputBox');
  const $submitButton = document.getElementById('submitButton');
  const $playButton = document.getElementById('playButton');
  const $replayButton = document.getElementById('replayButton');
  const $fastButton = document.getElementById('fastButton');
  const $slowButton = document.getElementById('slowButton');
  const $selectBox = document.getElementById('selectBox');

  let sortingList;
  let sortingMethod;

  $submitButton.addEventListener('click', function () {
    const inputValue = $inputBox.value;

    sortingList = model._checkValue(inputValue);

    if (sortingList) {
      $submitButton.disabled = true;

      view._createBlock(sortingList);
    }
  });

  $selectBox.addEventListener('change', function () {
    if ($selectBox.options[$selectBox.selectedIndex].text === 'bubble sort') {
      sortingMethod = 'bubbleSort';
      return;
    }

    if ($selectBox.options[$selectBox.selectedIndex].text === 'quick sort') {
      sortingMethod = 'quickSort';
      return;
    }
  });

  $playButton.addEventListener('click', function () {
    if (sortingList) {
      $playButton.disabled = true;

      if (sortingMethod === 'bubbleSort') {
        model._bubbleSort();
      }

      if (sortingMethod === 'quickSort') {
        model._quickSort();
      }
    }
  });

  $fastButton.addEventListener('click', function () {
    model._setTime("fast");
  });

  $slowButton.addEventListener('click', function () {
    model._setTime("slow");
  });

  $replayButton.addEventListener('click', function () {
    $submitButton.disabled = false;
    $playButton.disabled = false;
    model.isStop = true;
  });
}

init();

export { swapInView, changeViewStyle, showViewText };
