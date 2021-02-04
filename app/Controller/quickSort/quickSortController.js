import {beforeSorting, moveBar, exchange, wait} from '../../View/view';

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
  beforeSorting(pivot, pivotMovingUp, 2000, 'beforeSorting');
  for (let i = 0; i < numbersObjArray.length; i++) {
    if (pivotIndex === i) continue;
    moveBar(numbersObjArray[i], numbersObjArray[i].cordinateX, othersMovingYDistance);
  }
  await wait(1500);

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
  for (let i = 0; i < numbersObjArray.length; i++) {
    moveBar(numbersObjArray[i], numbersObjArray[i].cordinateX, pivotMovingUp);
  }
  await wait(1000);
  
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