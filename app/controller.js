import { swap } from './model.js';

export default function Controller() {
  this.$sortBox = document.getElementById('sortBox');
  this.$commentBox = document.getElementById('commentBox');
  this.sortChildren = this.$sortBox.children;
  this.sortingList = [];
  this.time = 1000;
}

Controller.prototype._bubbleSort = async function (array) {
  const sortingList = array;
  let swapValue;

  for (let i = 0; i < sortingList.length; i++) {
    for (let j = 0; j < sortingList.length - 1 - i; j++) {
      this.sortChildren[j].classList.toggle('selected');
      this.sortChildren[j + 1].classList.toggle('selected');

      await new Promise(resolve => {
        console.log(this.time);
        setTimeout(() => {
          resolve();
        }, this.time);
      });

      if (sortingList[j] > sortingList[j + 1]) {
        swap(this.sortChildren[j + 1], this.sortChildren[j]);

        swapValue = sortingList[j];
        sortingList[j] = sortingList[j + 1];
        this.sortingList[j + 1] = swapValue;

        await new Promise(resolve => {
          setTimeout(() => {
            this.$sortBox.insertBefore(this.sortChildren[j + 1], this.sortChildren[j]);
            resolve();
          }, this.time);
        });
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

  if (stringList < 5 || stringList > 10) {
    this.$commentBox.textContent = "5개 이상 10개 이하의 값을 입력하세요";
    return;
  }

  for (let i = 0; i < stringList.length; i++) {
    if (isNaN(Number(stringList[i])) || Number(stringList[i]) <= 0) {
      this.$commentBox.textContent = "정렬은 숫자로만 합시다..";
      return;
    }

    this.sortingList.push(Number(stringList[i]));
  }

  return this.sortingList;
}

Controller.prototype._setTime = function (standard) {
  const LIMIT_HIGH_TIME = 2000;
  const LIMIT_LOW_TIME = 100;
  const TIME_INTERVAL = 200;

  if (standard === "slow") {
    this.time += TIME_INTERVAL;
    this.time > LIMIT_HIGH_TIME  ? LIMIT_HIGH_TIME : this.time;
    return;
  }

  this.time -= TIME_INTERVAL;
  this.time < LIMIT_LOW_TIME ? LIMIT_LOW_TIME : this.time;
}
