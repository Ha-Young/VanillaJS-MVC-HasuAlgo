import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

export const BubbleController = function() {
  
}

const bubbleView = new BubbleView();
const $userInput = document.querySelector('.user-value');
const $start = document.querySelector('.start');
const $delete = document.querySelector('.delete');
const $reset = document.querySelector('.reset');
const test = [];

function addItem(b) {
  if (b.key === 'Enter') {
    let value = $userInput.value;

    test.push(value);
    $userInput.value = '';
    
    bubbleView.addItem(value);
  }
}

function deleteItem() {
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

function runSort() {
  const refineValue = test.map(n => {
    return Number(n);
  });
  console.log(test);
  const bubbleModel = new BubbleModel(refineValue);
  
  bubbleModel.execute();
}

function init() {
  $userInput.addEventListener('keyup', addItem);
  $delete.addEventListener('click', deleteItem);
  $start.addEventListener('click', runSort);
  $reset.addEventListener('click', resetItem);
}

init();
