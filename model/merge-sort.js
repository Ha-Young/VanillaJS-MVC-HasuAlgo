import { delay } from "../model/delay";
import divideNumbersInCanvas from "../view/divide-numbers-in-canvas";

function swapMergedItems(changed, origin) {
  origin.forEach((each, index) => {
    const eachNode = document.querySelector(`[data-value="${each}"]`);
    const newIndex = changed.findIndex(item => item === each);
    const indexGap = index - newIndex;

    const nodeCssMatrix = new WebKitCSSMatrix(getComputedStyle(eachNode).transform);
    const positionX = nodeCssMatrix.m41;
    const positionY = nodeCssMatrix.m42;

    eachNode.style.transform = `translate(${-indexGap * 100 + positionX}px, ${positionY + 50 }px)`;
  })
}

async function getMergeSorted(left, right) {
  let origin = [].concat(left, right);
  let result = [];
  let leftArr = left;
  let rightArr = right;
  let leftNumber = leftArr ? leftArr.shift() : null;
  let rightNumber = right ? right.shift() : null;

  while (leftNumber && rightNumber) {
    if (leftNumber > rightNumber) {
      result.push(rightNumber);
      rightNumber = rightArr.shift();
    } else {
      result.push(leftNumber);
      leftNumber = leftArr.shift();
    }
  }
  
  if (leftNumber) {
    result.push(leftNumber)
    result = result.concat(leftArr);
  }
  if (rightNumber) {
    result.push(rightNumber);
    result = result.concat(rightNumber);
  }

  swapMergedItems(result, origin);
  await delay(700);
  return result;
}

async function divide(array) {
  if (array.length === 1) {
    return array;
  }

  const left = Array.from(array);
  const mid = left.length / 2;
  const right = left.splice(mid);

  divideNumbersInCanvas(left, right);
  await delay(700);

  let leftVal;
  let rightVal;
  let result;

  await divide(left).then(e => leftVal = e);
  await divide(right).then(e => rightVal = e);
  await getMergeSorted(leftVal, rightVal).then(val => result = val);

  return result;
}

export default function mergeSort(array) {
  divide(array);
}
