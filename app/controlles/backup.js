import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

export const BubbleController = function() {
  this._$userInput = document.querySelector('.user-value');
  this._$start = document.querySelector('.start');
  this._$delete = document.querySelector('.delete');
  this._$reset = document.querySelector('.reset');
  this._bubbleView = new BubbleView();
  this._test = [];
}

BubbleController.prototype.addItem = function(b) {
  if (b.key === 'Enter') {
    this._test.push("12");
    console.log(this._test);
    this._$userInput.value = '';
    
    this._bubbleView.addItem(this._$userInput.value);
  }
}

BubbleController.prototype.deleteItem = function() {
  this._test.pop();
  this._bubbleView.deleteItem();
}

BubbleController.prototype.resetItem = function() {
  const leng = this._test.length;
  
  for (let i = 0; i < leng; i++) {
    this._test.pop();
  }

  this._$userInput.value = '';
  this._bubbleView.resetItem(leng);
}

BubbleController.prototype.runSort = function() {
  const refineValue = test.map(n => {
    return Number(n);
  });
  console.log(test);
  const bubbleModel = new BubbleModel(refineValue);
  bubbleModel.execute();
}

BubbleController.prototype.runEvents = function() {
  console.log(this._test);
  this._$userInput.addEventListener('keyup', this.addItem);
  this._$delete.addEventListener('click', this.deleteItem);
  this._$start.addEventListener('click', this.runSort);
  this._$reset.addEventListener('click', this.resetItem);
}
