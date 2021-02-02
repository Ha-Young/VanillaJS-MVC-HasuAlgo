import { swap } from './model.js';

export default function Controller() {
  this.sortBox = document.getElementById('sortBox');
  this.sortChildren = this.sortBox.children;
  this.sortingList = [];
}

Controller.prototype._bubbleSort = async function (array) {
  let swapValue;
  const sortingList = array;

  for (let i = 0; i < sortingList.length; i++) {
    for (let j = 0; j < sortingList.length - 1 - i; j++) {
      this.sortChildren[j].classList.toggle('selected');
      this.sortChildren[j + 1].classList.toggle('selected');

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      if (sortingList[j] > sortingList[j + 1]) {
        swap(this.sortChildren[j + 1], this.sortChildren[j]);

        swapValue = sortingList[j];
        sortingList[j] = sortingList[j + 1];
        this.sortingList[j + 1] = swapValue;

        this.sortBox.insertBefore(this.sortChildren[j + 1], this.sortChildren[j]);
      }

      this.sortChildren[j].classList.toggle('selected');
      this.sortChildren[j + 1].classList.toggle('selected');
    }

    if (!swapValue) {
      break;
    }

    this.sortChildren[this.sortChildren.length - i - 1].classList.add('finish');
  }
}

Controller.prototype._checkValue = function (string) {
  const stringList = string.split(',');

  if (!string.length) {
    alert('value를 넣어주세요');
    return;
  }

  for (let i = 0; i < stringList.length; i++) {
    if (isNaN(Number(stringList[i])) || Number(stringList[i]) <= 0) {
      alert('입력 값이 잘못 되었습니다.');
      return;
    }

    this.sortingList.push(Number(stringList[i]));
  }

  return this.sortingList;

}
