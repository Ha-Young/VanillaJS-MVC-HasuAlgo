import { BubbleController } from "../controlles/control";

export const BubbleView = function(template) {
  this._template = template;
  this._$visual = document.querySelector('.visual');
  this._$form = document.querySelector('form');
  this._$userValue = document.querySelector('.user-value');
  this._$deleteBtn = document.querySelector('.delete');
  this._$startBtn = document.querySelector('.start');
  this._$resetBtn = document.querySelector('.reset');
}

BubbleView.prototype.addItem = function(input) {
  const $box = document.createElement('div');
  $box.className = 'sort-box';
  $box.innerText = input;
  this._$visual.appendChild($box);
}

BubbleView.prototype.deleteItem = function() {
  this._$visual.removeChild(this._$visual.lastChild);
}

BubbleView.prototype.resetItem = function(n) {
  for (let i = 0; i < n; i++) {
    this._$visual.removeChild(this._$visual.lastChild);
  }
}

BubbleView.prototype.swap = function(a, b) {
  console.log(a,b);
  
  const $boxs = document.querySelectorAll('.sort-box');
  this._$visual.insertBefore($boxs[b], $boxs[a])
}

BubbleView.prototype.stay = function() {
  console.log('stay');
}
