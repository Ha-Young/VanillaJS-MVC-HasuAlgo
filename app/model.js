import { swap } from './controller.js';

export default function Model() {
  this.$sortBox = document.getElementById('sortBox');
  this.$commentBox = document.getElementById('commentBox');
  this.sortChildren = this.$sortBox.children;
  this.sortingList = [];
  this.storage = [];
  this.delay = 1000;
  this.isStop = false;
}

Model.prototype._bubbleSort = async function (array) {
  const sortingList = array;
  let swapValue;

  this.storage.push(array);

  for (let i = 0; i < sortingList.length; i++) {
    for (let j = 0; j < sortingList.length - 1 - i; j++) {
      if (this.isStop) {
        while (this.$sortBox.hasChildNodes()) {
          this.$sortBox.removeChild(this.$sortBox.firstChild);
        }

        this.sortingList = [];
        this.isStop = false;
        return;
      }

      this.sortChildren[j].classList.toggle('selected');
      this.sortChildren[j + 1].classList.toggle('selected');

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, this.delay);
      });

      if (sortingList[j] > sortingList[j + 1]) {
        await swap(this.sortChildren[j + 1], this.sortChildren[j]);

        swapValue = sortingList[j];
        sortingList[j] = sortingList[j + 1];
        this.sortingList[j + 1] = swapValue;
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

Model.prototype._setTime = function (standard) {
  const LIMIT_LOW_TIME = 1500;
  const LIMIT_HIGH_TIME = 300;
  const TIME_INTERVAL = 200;

  if (standard === 'slow') {
    if (this.delay > LIMIT_LOW_TIME) {
      this.delay = LIMIT_LOW_TIME;
      return;
    }

    this.delay += TIME_INTERVAL;
  } else {
    if (this.delay < LIMIT_HIGH_TIME) {
      this.delay = LIMIT_HIGH_TIME;
      return;
    }

    this.delay -= TIME_INTERVAL;
  }
}

Model.prototype._checkValue = function (string) {
  const stringList = string.split(',');

  if (stringList.length < 5 || stringList.length > 10) {
    this.$commentBox.textContent = '5개 이상 10개 이하의 값을 입력하세요';
    return;
  }

  for (let i = 0; i < stringList.length; i++) {
    if (isNaN(Number(stringList[i])) || Number(stringList[i]) <= 0) {
      this.$commentBox.textContent = '정렬은 숫자로만 합시다';
      return;
    }

    this.sortingList.push(Number(stringList[i]));
  }

  return this.sortingList;
}

Model.prototype._resetBoard = function () {
  this.isStop = true;

  if (!this.isStop) {
    while (this.$sortBox.hasChildNodes()) {
      this.$sortBox.removeChild(this.$sortBox.firstChild);
    }

    this.sortingList = [];
  }
}
