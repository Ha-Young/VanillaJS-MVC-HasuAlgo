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
  const SELECT_COMMNET = 'Please select sorting mode';
  const BUBBLESORT_COMMENT = 'Bubble sort';
  const QUICKSORT_COMMENT = 'Quick sort';
  const UNSELECT_COMMENT = 'You must be select the sorting mode';

  const $inputBox = document.getElementById('inputBox');
  const $submitButton = document.getElementById('submitButton');
  const $playButton = document.getElementById('playButton');
  const $reloadButton = document.getElementById('reloadButton');
  const $fastButton = document.getElementById('fastButton');
  const $slowButton = document.getElementById('slowButton');
  const $selectBox = document.getElementById('selectBox');
  const $sidebarButton = document.getElementById('sidebarButton');
  const $sideDisplay = document.getElementById('sideDisplay');
  const $guideButton = document.getElementById('guideButton');
  const $userGuide = document.getElementById('userGuide');

  const selectOptions = {
    bubbleSort: 'bubbleSort',
    quickSort: 'quickSort',
    none: 'none'
  };
  const styleClassName = {
    hidden: 'hidden'
  };

  let sortingList;
  let sortingMethod;

  function clickEffect(event) {
    const divElement = document.createElement("div");

    divElement.className = "clickEffect";
    divElement.style.top = event.clientY + "px";
    divElement.style.left = event.clientX + "px";
    document.body.appendChild(divElement);

    divElement.addEventListener('animationend',function () {
      divElement.parentElement.removeChild(divElement);
    }.bind(this));
  }

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
      view._showText(BUBBLESORT_COMMENT);

      sortingMethod = selectOptions['bubbleSort'];
      return;
    }

    if ($selectBox.options[$selectBox.selectedIndex].text === selectOptions['quickSort']) {
      view._showText(QUICKSORT_COMMENT);

      sortingMethod = selectOptions['quickSort'];
      return;
    }

    view._showText(UNSELECT_COMMENT);

    sortingMethod = selectOptions['none'];
  });

  $playButton.addEventListener('click', function () {
    if (sortingList) {
      $playButton.disabled = true;

      if (sortingMethod === 'bubbleSort') {
        model._bubbleSort();
        return;
      }

      if (sortingMethod === 'quickSort') {
        model._quickSort();
        return;
      }

      view._showText(SELECT_COMMNET);

      $playButton.disabled = false;
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

  $sidebarButton.addEventListener('click', function () {
    view._changeBlockStyle(styleClassName['hidden'], [$sideDisplay]);
  });

  $guideButton.addEventListener('click', function () {
    view._changeBlockStyle(styleClassName.hidden, [$userGuide]);
  });

  document.addEventListener('click', clickEffect);
}

init();

export { swapInView, changeViewStyle, showViewText };
