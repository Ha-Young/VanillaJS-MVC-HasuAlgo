import View, { viewInstance } from './view.js'
import {modelInstance} from './model.js'

function Controller (model, view) {
}

function addChildNode (value) {
  viewInstance.$child = document.createElement('child');
  if (viewInstance.$contentContainer.childNodes.length > 10) {
    viewInstance.$errorMessage.innerHTML = "입력 갯수를 초과하셨습니다"
    return;
  }

  viewInstance.$child.innerHTML = value;
  modelInstance.storage.push(value);
  viewInstance.$child.classList.add("graphNode");
  viewInstance.$child.style.height = value + 5 + 'px';
  viewInstance.$contentContainer.appendChild(viewInstance.$child);
} 

function handleKeyUp(event) {

  event.stopImmediatePropagation();

  if (event.key === 'Enter') { 
    addChildNode(viewInstance.$typed.value);

    this.value = null;
  }
}

function sortStorage(storeageArray) {
  for (let i = 0; i < storeageArray.length - 1; i++) {
    for (let j= 1; j <storeageArray.length; j++) {

    }
  }
}

function handleClick(event) {
  event.stopImmediatePropagation();

  const childNodesLength = viewInstance.$contentContainer.childNodes.length;

  if (childNodesLength < 6) {
    viewInstance.$errorMessage.innerHTML = '입력 갯수가 너무 작습니다';
    return;
  }

  viewInstance.$errorMessage.innerHTML = '';

  console.log('work');
  
  const sortedResult = sortStorage(modelInstance.storage);
}

viewInstance.$typed.addEventListener('keypress', handleKeyUp);
viewInstance.$bubbleSortButton.addEventListener('click', handleClick);

export default Controller
