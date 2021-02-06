import delay from "../model/delay";
import divideCloudsInCanvas from "../view/divide-clouds-in-canvas";
import swapCloudsInCanvas from "../view/swap-clouds-in-canvas";

async function getMergeSortedArray(left, right) {
  let origin = [...left, ...right];
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

  swapCloudsInCanvas(result, origin);
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

  await divide(left).then(e => leftVal = e);
  await divide(right).then(e => rightVal = e);
  await getMergeSortedArray(leftVal, rightVal).then(val => result = val);

  return result;
}

export default function mergeSort(array) {
  divide(array);
}
