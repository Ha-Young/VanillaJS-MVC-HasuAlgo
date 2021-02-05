import { swap, moveToChangeFunction } from './controller.js';

export default function Model() {
  this.$sortBox = document.getElementById('sortBox');
  this.$commentBox = document.getElementById('commentBox');
  this.sortChildren = this.$sortBox.children;
  this.sortingList = [];
  this.isStop = false;
  this.delay = 1000;
}

Model.prototype._quickSort = async function (array, start = 0, end = array.length - 1) {
  if (start >= end) {
    return; 
  }

  if (this.isStop) {
    return this._resetBoard();
  }

  let borderIndex = await this._getQuickSortIndex(array, start, end);

	await this._quickSort(array, start, borderIndex - 1);
  await this._quickSort(array, borderIndex, end);

	return array;
}

Model.prototype._getQuickSortIndex = async function (array, start, end) {
  const pivotValue = array[ Math.floor((start + end) / 2) ];

	while (start <= end) {
		while (array[start] < pivotValue) {
      start = start + 1; 
    }

		while (array[end] > pivotValue) {
      end = end - 1;
    }

		if (start <= end) {
      let tmp = array[start];

      array[start] = array[end];
      array[end] = tmp;

      await swap(this.sortChildren[start], this.sortChildren[end], array, this.delay);

			start = start + 1;
			end = end - 1;
		}
	}

	return start;
}

Model.prototype._bubbleSort = async function () {
  let swapValue;

  for (let i = 0; i < this.sortChildren.length; i++) {
    for (let j = 0; j < this.sortChildren.length - 1 - i; j++) {
      if (this.isStop) {
        return this._resetBoard();
      }

      moveToChangeFunction(this.sortChildren[j], this.sortChildren[j + 1], 'selected');

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, this.delay);
      });

      if (this.sortingList[j] > this.sortingList[j + 1]) {
        swapValue = this.sortingList[j];
        this.sortingList[j] = this.sortingList[j + 1];
        this.sortingList[j + 1] = swapValue;

        await swap(this.sortChildren[j + 1], this.sortChildren[j], this.sortingList, this.delay);
      } else {
        moveToChangeFunction(this.sortChildren[j], this.sortChildren[j + 1], 'selected');
      }
    }

    if (!swapValue) {
      break;
    }
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
  while (this.$sortBox.hasChildNodes()) {
    this.$sortBox.removeChild(this.$sortBox.firstChild);
  }

  this.sortingList = [];
  this.isStop = false;

  return;
}
