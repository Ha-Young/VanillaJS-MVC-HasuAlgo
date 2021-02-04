/*
function quickSort (array) {
  if (array.length <= 1) {
    return array;
  }
  
  let pivotIndex;
  let leftArray = [];
  let rightArray = [];
  do {
    pivotIndex = Number.parseInt((Math.random() * (array.length)));
  } while (pivotIndex === 0)
  
  const pivot = array[pivotIndex];  
  for (let i = 0; i < array.length; i++) {
    if (pivotIndex === i) continue;
    
    if (array[i] >= pivot) {
      //right
      rightArray.push(array[i]);
    } else {
      //left
      leftArray.push(array[i]);
    }
  }
  
  leftArray = quickSort(leftArray);
  rightArray = quickSort(rightArray);
  leftArray.push(pivot);
  return leftArray.concat(rightArray);
}
*/

import {beforeSorting, moveBar, exchange} from '../../View/view';
import NumModel from './../../Model/model';

const pivotMovingUp = 0;
const othersMovingYDistance = -80;

export default async function quickSort (numbersObjArray) {
  console.log('quick sort array start', numbersObjArray);
  if (numbersObjArray.length <= 1) {
    console.log('base case here');
    return numbersObjArray;
  }

  console.log('not returned!!!@@!@@!!@!@!');
  
  let pivotIndex;
  let leftArray = [];
  let rightArray = [];
  do {
    pivotIndex = Number.parseInt((Math.random() * (numbersObjArray.length)));
  } while (pivotIndex === 0)
  
  const pivot = numbersObjArray[pivotIndex];
  console.log('pivot is ', pivot.value);

  // 동작 : 피봇은 튀고 나머지는 위로 올라간다
  await new Promise((resolve, reject) => {
    beforeSorting(pivot, pivotMovingUp, 2000, 'beforeSorting');
    for (let i = 0; i < numbersObjArray.length; i++) {
      if (pivotIndex === i) continue;
      moveBar(numbersObjArray[i], numbersObjArray[i].cordinateX, othersMovingYDistance);
    }
    setTimeout(() => {
      resolve();
    }, 4000);
  });

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

  for (let i = 0; i < pivotIndex; i++) {
    leftArray.push(numbersObjArray[i]);
  }
  for (let i = pivotIndex+1; i < numbersObjArray.length; i++) {
    rightArray.push(numbersObjArray[i]);
  }

  // 동작 : 타겟이 되어 올라갔던 애들이 모두 내려온다
  await new Promise((resolve, reject) => {
    for (let i = 0; i < numbersObjArray.length; i++) {
      moveBar(numbersObjArray[i], numbersObjArray[i].cordinateX, pivotMovingUp);
    }
    setTimeout(() => {
      resolve();
    }, 4000);
  });
  
  leftArray = await quickSort(leftArray);
  rightArray = await quickSort(rightArray);
  leftArray.push(pivot);
  const resultArray = leftArray.concat(rightArray);
  // 동작 : resultArray가 다 되었다는 애니메이션
  return resultArray;
}

function swapInArray (numbersObjArray, pivotIndex, targetIndex) {
  const temp = numbersObjArray[pivotIndex];
  numbersObjArray[pivotIndex] = numbersObjArray[targetIndex];
  numbersObjArray[targetIndex] = temp;
}