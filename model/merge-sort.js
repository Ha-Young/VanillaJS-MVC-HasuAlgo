import delay from "../model/delay";
import divideCloudsInCanvas from "../view/divide-clouds-in-canvas";
import swapCloudsInCanvas from "../view/swap-clouds-in-canvas";

async function getMergeSortedArray(left, right) {
  let beforeMerge = [...left, ...right];
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

  swapCloudsInCanvas(result, beforeMerge);
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

  divideCloudsInCanvas(left, right);
  await delay(700);

  let leftVal;
  let rightVal;
  let result;

  await divide(left).then(response => leftVal = response);
  await divide(right).then(response => rightVal = response);
  
  await getMergeSortedArray(leftVal, rightVal).then(response => result = response);

  return result;
}

export default function mergeSort(array) {
  divide(array);
}
