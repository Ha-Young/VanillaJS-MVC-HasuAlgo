import {beforeSorting, moveBar, exchange, wait, finishMove} from '../../View/view';

const pivotMovingUp = 0;
const pivotMovingYDistance = 100;

// insertionSort는 하나의 흐름만 담당 다시 올라가거나 내려가서 비교하고 교체할때 까지만
export default async function insertionSort (numbersObjArray) {
  let testPromise = new Promise(async function (resolve, reject) {

    // 여기서 for문을 돌리고 끝내자
    for (let i = 1; i < numbersObjArray.length; i++) {
      let pivotIndex = i;
      // 동작 : 이것이 피봇이다!! 라는 동작 설정
      await beforeSorting(numbersObjArray[i], pivotMovingUp, 2000, 'beforeSorting');
      // 동작 : i번 피봇을 내림
      await moveBar(numbersObjArray[i], numbersObjArray[i].cordinateX, pivotMovingYDistance);
      // 바로 전에께 크면 시작 : 시작 조건
      if (numbersObjArray[i].value < numbersObjArray[i-1].value) {
        // 교환 시작
        for (let j = i-1; j >= 0; j--) {
          console.log('change loop', j);
          // pivot < one front
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
      console.log(numbersObjArray[pivotIndex]);
      // 다 끝났으니 피봇을 올리고 다음 피봇으로!
      await moveBar(numbersObjArray[pivotIndex], numbersObjArray[pivotIndex].cordinateX, pivotMovingUp);
    }

    resolve(numbersObjArray);
  });

  testPromise.then(async (result) => {
      // 동작 : 완료된 동작! 처음부터 차례대로 점프!
      finishMove(result, 0, 300, 'last');
      await wait(2000);
    })
    .catch(function(result) {
      console.log('catched');
    });

    return testPromise;
}