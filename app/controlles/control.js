import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

const bubbleView = new BubbleView();
const $userInput = document.querySelector('.user-value');
const $start = document.querySelector('.start');
const $delete = document.querySelector('.delete');
const $reset = document.querySelector('.reset');
const test = [];

function addItem(b) {
  let value = $userInput.value;

  if (b.key === 'Enter' && value !== '') {
    test.push(value);
    $userInput.value = '';
    
    bubbleView.addItem(value);
  }
}

function deleteItem() {
  if (!test.length) {
    $userInput.value = '';
    return;
  }
  
  test.pop();
  bubbleView.deleteItem();
}

function resetItem() {
  const leng = test.length;
  
  for (let i = 0; i < leng; i++) {
    test.pop();
  }

  $userInput.value = '';
  bubbleView.resetItem(leng);
}

function startSort() {
  if (!test.length) {
    $userInput.value = '';
    return;
  }

  const refineValue = test.map(n => {
    return Number(n);
  });
  
  const bubbleModel = new BubbleModel(refineValue);
  bubbleModel.execute();
}

function init() {
  $userInput.addEventListener('keyup', addItem);
  $delete.addEventListener('click', deleteItem);
  $start.addEventListener('click', startSort);
  $reset.addEventListener('click', resetItem);
}

init();
