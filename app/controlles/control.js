import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

const $userInput = document.querySelector('.user-value');
const $visual = document.querySelector('.visual');
const $start = document.querySelector('.start');
const $delete = document.querySelector('.delete');
const $reset = document.querySelector('.reset');
const test = [];

function makeItem(b) {
  if (b.key === 'Enter') {
    const $box = document.createElement('div');
    $box.className = 'sort-box';
    $box.innerText = $userInput.value;
    
    $visual.append($box);
    test.push($userInput.value);
    $userInput.value = '';
  }
}

function deleteItem() {
  $visual.removeChild($visual.lastChild);
  test.pop();
}

function resetItem() {
  const leng = test.length;

  for (let i = 0; i < leng; i++) {
    test.pop();
    $visual.removeChild($visual.lastChild);
    $userInput.value = '';
  }
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
  $reset.addEventListener('click', resetItem);
}

init();
