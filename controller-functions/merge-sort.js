import delay from "../model-functions/delay";
import divideCloudsInCanvas from "../view-functions/divide-clouds-in-canvas";
import swapCloudsInCanvas from "../view-functions/swap-clouds-in-canvas";

async function getMergeSortedArray(left, right) {
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

export default async function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  const left = Array.from(array);
  const mid = left.length / 2;
  const right = left.splice(mid);

  divideCloudsInCanvas(left, right);
  await delay();

  let leftVal = await mergeSort(left);
  let rightVal = await mergeSort(right);
  let unMerged = [...leftVal, ...rightVal];
  let merged = await getMergeSortedArray(leftVal, rightVal);

  swapCloudsInCanvas(merged, unMerged);
  await delay();

  return merged;
}
