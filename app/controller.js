import {view} from './view.js'
import {model} from './model.js'

function Controller (model, view) {
  this.model = model;
  this.view = view;
}

function addChildNode (value) {
  view.$child = document.createElement('child');

  if (view.$contentContainer.childNodes.length > 10) {
    view.$errorMessage.innerHTML = "입력 갯수를 초과하셨습니다"
    return;
  }

  view.$child.innerHTML = value;
  model.storage.push(value);
  view.$child.classList.add("graphNode");
  view.$child.style.height = value + 5 + 'px';
  view.$contentContainer.appendChild(view.$child);
} 

function handleKeyUp(event) {

  event.stopImmediatePropagation();

  if (view.$typed.value === '') return;

  if (event.key === 'Enter') { 
    addChildNode(view.$typed.value);

    this.value = null;
  }
}

function sortStorage(storeageArray) {
  for (let i = 0; i < storeageArray.length - 1; i++) {
    let swap;
    for (let j= 0; j <storeageArray.length - 1 -i; j++) {
      if (storeageArray[j] > storeageArray[j + 1]) {
        swap = storeageArray[j];
        storeageArray[j] = storeageArray[j + 1];
        storeageArray[j + 1] = swap;
      }
    }

    if (!swap) break;
  }
}

function addNewChild(number) {
  view.$contentContainer.innerHTML = '';
  view.$newChild = document.createElement('child');
  view.$newChild.innerHTML = number;
  view.$newChild.classList.add("graphNode");
  view.$newChild.style.height = number + 5 + 'px';
  view.$contentContainer.appendChild(view.$newChild);
}

function handleClick(event) {
  event.stopImmediatePropagation();

  const childNodesLength = view.$contentContainer.childNodes.length;

  if (childNodesLength < 5) {
    view.$errorMessage.innerHTML = '입력 갯수가 너무 작습니다';
    return;
  }

  view.$errorMessage.innerHTML = '';
  
  sortStorage(model.storage);
}

view.$typed.addEventListener('keypress', handleKeyUp);
view.$bubbleSortButton.addEventListener('click', handleClick);

export const controller = new Controller(model, view);
