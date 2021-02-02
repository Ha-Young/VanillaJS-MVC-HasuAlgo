import { swap } from './model.js';

async function bubbleSort(array) {
  const sortBox = document.getElementById('sortBox');
  let sortChildren = sortBox.children;
  let sortElements = document.querySelectorAll('.block');
  let sortingList = array;
  let swapValue;

  for (let i = 0; i < sortingList.length - 1; i++) {
    for (let j = 0; j < sortingList.length - 1 - i; j++) {
      sortChildren[j].style.backgroudColor = '#2ecc71';
      sortChildren[j + 1].style.backgroudColor = '#2ecc71';

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      if (sortingList[j] > sortingList[j + 1]) {
        swap(sortChildren[j + 1], sortChildren[j]);

        swapValue = sortingList[j];
        sortingList[j] = sortingList[j + 1];
        sortingList[j + 1] = swapValue;

        sortBox.insertBefore(sortChildren[j + 1], sortChildren[j]);
      }

      sortChildren[j].style.backgroudColor = '#e67e22';
      sortChildren[j + 1].style.backgroudColor = '#e67e22';

    }
    if (!swapValue) {
      break;
    }


    sortElements[sortingList.length - i - 1].style.backgroudColor = '#9b59b6';
  }
}

function checkValue(string) {
  const stringList = string.split(',');
  const sortingList = [];

  if (!string.length) {
    alert('value를 넣어주세요');
    return;
  }

  for (let i = 0; i < stringList.length; i++) {
    if (isNaN(Number(stringList[i])) || Number(stringList[i]) <= 0) {
      alert('입력 값이 잘못 되었습니다.');
      return;
    }

    sortingList.push(Number(stringList[i]));
  }

  return sortingList;
}

export { checkValue, bubbleSort };
