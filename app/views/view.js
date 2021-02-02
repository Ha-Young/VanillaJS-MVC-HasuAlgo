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
  const $boxs = document.querySelectorAll('.sort-box');
  const rightBoxLocation = $boxs[b].getBoundingClientRect().left;
  const leftBoxLocation = $boxs[a].getBoundingClientRect().left;
  const distance = rightBoxLocation - leftBoxLocation;
  
  $boxs[a].classList.add('move-right');
  $boxs[b].classList.add('move-left');
  $boxs[a].classList.remove('move-right');
  $boxs[b].classList.remove('move-left');
  
}

BubbleView.prototype.move = function() {
  
}

BubbleView.prototype.stay = function() {
  console.log('stay');
}
