import {view} from './view.js'
import {model} from './model.js'

function Controller (model, view) {
  this.model = model;
  this.view = view;
}

async function sortStorage(storeageArray) {
  for (let i = 0; i < storeageArray.length; i++) {
    let swap;
    for (let j= 0; j <storeageArray.length - 1 -i; j++) {
      if (storeageArray[j] > storeageArray[j + 1]) {
        swap = storeageArray[j];
        storeageArray[j] = storeageArray[j + 1];
        storeageArray[j + 1] = swap;
        let $childNodes = document.querySelectorAll('.graphNode');
        await changeGraph($childNodes[j + 1], $childNodes[j]);
        console.log(i ,j);
      }
    }

    if (!swap) break;
  }
}

function changeGraph(lefetNode, rightNode) {
  return new Promise((resolve) => {
    setTimeout(() => {
      view.$contentContainer.insertBefore(lefetNode, rightNode);

      resolve();
    }, 1000);
  });
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

function handleKeyUp(event) {

  event.stopImmediatePropagation();

  if (view.$typed.value === '') return;

  if (event.key === 'Enter') { 
    view.addChildNode(view.$typed.value);
    model.storage.push(Number(view.$typed.value));
    this.value = null;
  }
}

export const controller = new Controller(model, view);
export {handleClick, handleKeyUp}
