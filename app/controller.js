import {view} from './view.js'
import {model} from './model.js'

function Controller (model, view) {
  this.model = model;
  this.view = view;
}

async function sortStorage(storeageArray) {

  for (let i = 0; i < storeageArray.length; i++) {
    for (var j= 0; j <storeageArray.length - 1 -i; j++) {
      if (storeageArray[j] > storeageArray[j + 1]) {
        const moveValue = ((1200 - (50 * (storeageArray.length + 1))) / storeageArray.length) + 50;
        let swap = storeageArray[j];

        storeageArray[j] = storeageArray[j + 1];
        storeageArray[j + 1] = swap;
 
        await moveGraph(view.$graphNodes[j], view.$graphNodes[j + 1], moveValue);
        await changeGraph(view.$graphNodes[j], view.$graphNodes[j + 1]);
      }
    }

    await changeColor(view.$graphNodes[storeageArray.length - i - 1]);
  }
}

function moveGraph(leftnode, rightNode, moveValue) {
  return new Promise((resolve) => {
    setTimeout(() => {

      leftnode.style.transform = `translateX(${moveValue}px)`;
      rightNode.style.transform = `translateX(${-moveValue}px)`;

      resolve();
    }, 1000);
  });
}

function changeGraph(leftNode, rightNode) {
  return new Promise((resolve) => {
    setTimeout(() => {

      view.$contentContainer.insertBefore(rightNode, leftNode);

      resolve();
    }, 1000);
  });
}

function changeColor(node) {
  return new Promise((resolve) => {
    setTimeout(() => {

      node.style.background = 'green';
      resolve();
    }, 1000);
  });
}

function handleKeyUp(event) {

  event.stopImmediatePropagation();

  if (view.$typed.value === '') return;

  if (event.key === 'Enter') { 
    view.addChildNode(view.$typed.value);
    model.storage.push(Number(view.$typed.value));
    this.value = null;
  }
}

function handleBubbleClick(event) {
  event.stopImmediatePropagation();

  const childNodesLength = view.$contentContainer.childNodes.length;

  if (childNodesLength < 5) {
    view.$errorMessage.innerHTML = '입력 갯수가 너무 작습니다';
    return;
  }

  view.$errorMessage.innerHTML = '';
  
  sortStorage(model.storage);
}

function handleRestartClick(event) {
  event.stopImmediatePropagation();

  model.storage = [];

  while (view.$contentContainer.hasChildNodes()) {
    view.$contentContainer.removeChild(view.$contentContainer.firstChild);
  }
}

export const controller = new Controller(model, view);
export {handleBubbleClick, handleKeyUp, handleRestartClick}
