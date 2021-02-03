import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

const bubbleView = new BubbleView();
const $userInput = document.querySelector('.user-value');
const $start = document.querySelector('.start');
const $delete = document.querySelector('.delete');
const $reset = document.querySelector('.reset');
const test = [];

export const BubbleController = function() {
}

BubbleController.prototype.addItem = function(b) {
  let value = $userInput.value;

  if (b.key === 'Enter' && value !== '') {
    test.push(value);
    $userInput.value = '';
    
    bubbleView.addItem(value);
  }
}

BubbleController.prototype.deleteItem = function() {
  if (!test.length) {
    $userInput.value = '';
    return;
  }
  
  test.pop();
  bubbleView.deleteItem();
}

BubbleController.prototype.resetItem = function() {
  const leng = test.length;
  
  for (let i = 0; i < leng; i++) {
    test.pop();
  }

  $userInput.value = '';
  bubbleView.resetItem(leng);
}
BubbleController.prototype.startSort = function() {
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

BubbleController.prototype.startMove = function(a, b) {
  bubbleView.move(a, b);
}

BubbleController.prototype.init = function() {
  $userInput.addEventListener('keyup', this.addItem);
  $delete.addEventListener('click', this.deleteItem);
  $start.addEventListener('click', this.startSort);
  $reset.addEventListener('click', this.resetItem);
}
