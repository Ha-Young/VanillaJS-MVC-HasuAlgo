import {beforeSorting, moveBar, exchange, delay} from '../../View/view';

const pivotMovingUp = 0;
const othersMovingYDistance = -80;

export default async function quickSort (numbersObjArray) {
  if (numbersObjArray.length <= 1) {
    return numbersObjArray;
  }

  let pivotIndex;
  let leftArray = [];
  let rightArray = [];
  do {
    pivotIndex = Number.parseInt((Math.random() * (numbersObjArray.length)));
  } while (pivotIndex === 0)
  
  const pivot = numbersObjArray[pivotIndex];

  beforeSorting(pivot, pivotMovingUp, 1700, 'beforeSorting');
  for (let i = 0; i < numbersObjArray.length; i++) {
    if (pivotIndex === i) continue;
    moveBar(numbersObjArray[i], numbersObjArray[i].cordinateX, othersMovingYDistance);
  }
  await delay(1700);

  for (let i = 0; i < numbersObjArray.length; i++) {
    if (pivotIndex === i) continue;
    
    if (numbersObjArray[i].value < pivot.value && i > pivotIndex) {
      await exchange(pivot, numbersObjArray[i]);
      swapInArray(numbersObjArray, pivotIndex, i);
      pivotIndex = i;
      i = -1;
    } else if (numbersObjArray[i].value === pivot.value && i > pivotIndex) {
      await exchange(pivot, numbersObjArray[i]);
      swapInArray(numbersObjArray, pivotIndex, i);
      pivotIndex = i;
      i = -1;
    } else if (numbersObjArray[i].value > pivot.value && i < pivotIndex) {
      await exchange(pivot, numbersObjArray[i]);
      swapInArray(numbersObjArray, pivotIndex, i);
      pivotIndex = i;
      i = -1;
    }
  }

  // FIX ME : 굳이 for로 돌리지 않아도 되는건 foreach나 map으로
  for (let i = 0; i < pivotIndex; i++) {
    leftArray.push(numbersObjArray[i]);
  }
  for (let i = pivotIndex+1; i < numbersObjArray.length; i++) {
    rightArray.push(numbersObjArray[i]);
  }

  for (let i = 0; i < numbersObjArray.length; i++) {
    moveBar(numbersObjArray[i], numbersObjArray[i].cordinateX, pivotMovingUp);
  }
  await delay(1000);
  
  leftArray = await quickSort(leftArray);
  rightArray = await quickSort(rightArray);
  leftArray.push(pivot);
  const resultArray = leftArray.concat(rightArray);
  return resultArray;
}

function swapInArray (numbersObjArray, pivotIndex, targetIndex) {
  const temp = numbersObjArray[pivotIndex];
  numbersObjArray[pivotIndex] = numbersObjArray[targetIndex];
  numbersObjArray[targetIndex] = temp;
}