import delay from "../model-functions/delay";
import swapCloudsInCanvas from "../view-functions/swap-clouds-in-canvas";

async function getMergeSortedArray(left, right) {
  // let beforeMerge = [...left, ...right];
  let result = [];
  let leftArray = Array.from(left);
  let rightArray = Array.from(right);
  let numberFromLeft = leftArray ? leftArray.shift() : null;
  let numberFromRight = rightArray ? rightArray.shift() : null;

  while (numberFromLeft && numberFromRight) {
    if (numberFromLeft > numberFromRight) {
      result.push(numberFromRight);
      numberFromRight = rightArray.shift();
    } else {
      result.push(numberFromLeft);
      numberFromLeft = leftArray.shift();
    }
  }
  
  if (numberFromLeft) {
    result.push(numberFromLeft);
    result.push(...leftArray);
  }
  
  if (numberFromRight) {
    result.push(numberFromRight);
    result.push(...rightArray);
  }
  
  return result;
}

async function divide(array) {
  if (array.length === 1) {
    return array;
  }

  const left = Array.from(array);
  const mid = left.length / 2;
  const right = left.splice(mid);

  this.view.divideCloudsInCanvas(left, right);
  await delay();

  let leftVal;
  let rightVal;
  let unMerged;
  let merged;

  await divide.call(this, left).then(response => leftVal = response);
  await divide.call(this, right).then(response => rightVal = response);
  
  await getMergeSortedArray.call(this, leftVal, rightVal).then(response => merged = response);

  unMerged = [...leftVal, ...rightVal];
  swapCloudsInCanvas(merged, unMerged);
  await delay();

  return merged;
}

export default function mergeSort(array) {
  divide.call(this, array);
}
