import {beforeSorting, moveBar, moveBarNoWait, exchange} from '../../View/view';

const pivotMovingUp = 0;
const pivotMovingYDistance = 350;

// insertionSort는 하나의 흐름만 담당 다시 올라가거나 내려가서 비교하고 교체할때 까지만
export default async function insertionSort (numObjArray, pivotObj, anotherObj) {
  let testPromise = new Promise(async function (resolve, reject) {
    console.log("new Start", pivotObj, anotherObj)

    await beforeSorting(pivotObj, pivotObj.cordinateX, 0);

    // pivot 내리기
    await moveBar(pivotObj, pivotObj.cordinateX, pivotMovingYDistance);
    console.log(pivotObj.index);
    if (!anotherObj || !(anotherObj.value > pivotObj.value)) {
      // false면 pivot을 그 자리에 올리고 index를 하나씩 올리고 종료
      console.log('lessBigger');
      await moveBar(pivotObj, pivotObj.cordinateX, 0);
      resolve();
    }

    resolve([pivotObj, anotherObj]);

  });
  testPromise.then(async function(result) {
      if (!result) {
        return;
      }

      const [pivotObj, anotherObj] = result;
      console.log('then!!!!!');

      await exchange(pivotObj, anotherObj);

      return true;
    })
    .catch(function(result) {
      console.log('catched');
    });
    
    return testPromise;
}