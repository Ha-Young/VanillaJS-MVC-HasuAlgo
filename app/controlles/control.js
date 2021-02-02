import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

const $userInput = document.querySelector('.user-value');
const $visual = document.querySelector('.visual');
const $start = document.querySelector('.start');
const $delete = document.querySelector('.delete');
const test = [];

function makeItem(b) {
  if (b.key === 'Enter') {
    const $box = document.createElement('div');
    $box.className = 'sort-box';
    $box.innerText = $userInput.value;
    
    $visual.append($box);
    test.push($userInput.value);
    $userInput.value = '';
    
    return;
  }
  
  if (b.key === 'Backspace') {
    $visual.removeChild($visual.lastChild);
    test.pop();
    $userInput.value = '';
  }
}

function deleteItem() {

}

function runSort() {
  const refineValue = test.map(n => {
    return Number(n);
  });
  console.log(test);
  const bubble = new BubbleModel(refineValue);
  bubble.execute();
}

function init() {
  $userInput.addEventListener('keyup', makeItem);
  $delete.addEventListener('click', deleteItem);
  $start.addEventListener('click', runSort);
}

init();
