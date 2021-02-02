// Load application styles
import '../assets/styles/index.less';
import { createBlock, swapElement } from './view.js';
import { checkValue, bubbleSort } from './controller.js';

// ================================
// START YOUR APP HERE
// ================================
const inputBox = document.getElementById('inputBox');
let sortingList;

inputBox.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    const inputValue = inputBox.value;

    sortingList = checkValue(inputValue);
    createBlock(sortingList);
  }
});

function swap(smallValue, largeValue) {
  swapElement(smallValue, largeValue);
}

const sortBox = document.getElementById('sortBox');

sortBox.addEventListener('click', function(event) {
  bubbleSort(sortingList);
});

export { swap };
