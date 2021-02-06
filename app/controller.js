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

async function swapInView(rightElement, leftElement, swapList, delay) {
  await view._swapElements(rightElement, leftElement, swapList, delay);
}

function init() {
  const $inputBox = document.getElementById('inputBox');
  const $submitButton = document.getElementById('submitButton');
  const $playButton = document.getElementById('playButton');
  const $reloadButton = document.getElementById('reloadButton');
  const $fastButton = document.getElementById('fastButton');
  const $slowButton = document.getElementById('slowButton');
  const $selectBox = document.getElementById('selectBox');

  const selectOptions = {
    bubbleSort: 'bubbleSort',
    quickSort: 'quickSort'
  }

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
    if ($selectBox.options[$selectBox.selectedIndex].text === selectOptions['bubbleSort']) {
      sortingMethod = selectOptions['bubbleSort'];
      return;
    }

    if ($selectBox.options[$selectBox.selectedIndex].text === selectOptions['quickSort']) {
      sortingMethod = selectOptions['quickSort'];
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
    model._setFaster();
  });

  $slowButton.addEventListener('click', function () {
    model._setSlower();
  });

  $reloadButton.addEventListener('click', function () {
    $submitButton.disabled = false;
    $playButton.disabled = false;
    view.canPaint = false;
    model.isStop = true;
    
    setTimeout(() => {
      model._resetBoard();
      view._clearText();
    }, 250);
  });
}

init();

export { swapInView, changeViewStyle, showViewText };
