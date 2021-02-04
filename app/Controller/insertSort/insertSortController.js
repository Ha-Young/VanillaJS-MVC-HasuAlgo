import {beforeSorting, moveBar, exchange, wait, finishMove} from '../../View/view';

const pivotMovingUp = 0;
const pivotMovingYDistance = 100;

export default async function insertionSort (numbersObjArray) {
  for (let i = 1; i < numbersObjArray.length; i++) {
    let pivotIndex = i;
    await beforeSorting(numbersObjArray[pivotIndex], pivotMovingUp, 1700, 'beforeSorting');
    await moveBar(numbersObjArray[pivotIndex], numbersObjArray[pivotIndex].cordinateX, pivotMovingYDistance);
    if (numbersObjArray[i].value < numbersObjArray[i-1].value) {
      for (let j = i-1; j >= 0; j--) {
        if (numbersObjArray[j+1].value < numbersObjArray[j].value) {
          await exchange(numbersObjArray[j+1], numbersObjArray[j]);
          const temp = numbersObjArray[j+1];
          numbersObjArray[j+1] = numbersObjArray[j];
          numbersObjArray[j] = temp;
          pivotIndex = j;
        } else {
          break;
        }
      }
    }
    
    await moveBar(numbersObjArray[pivotIndex], numbersObjArray[pivotIndex].cordinateX, pivotMovingUp);
  }

  return numbersObjArray;
}