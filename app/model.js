import { swapInView, changeViewStyle, showViewText } from './controller.js';

export default function Model() {
  this.START_COMMENT = '정렬 시작';
  this.ENDING_COMMENT = '다 끝났습니다';
  this.CORRECT_VALUE_COMMENT = '정렬할 준비가 되었습니다 시작 버튼을 눌러주세요';
  this.OUT_OF_RANGE_ERROR_COMMENT = '5개 이상 10개 이하의 값을 입력하세요';
  this.INPUT_TYPE_ERROR_COMMENT = '정렬은 숫자로만 합시다. 0은 정렬 대상이 아닙니다.';
  this.LIMIT_LOW_TIME = 2500;
  this.LIMIT_HIGH_TIME = 300;
  this.TIME_INTERVAL = 200;
  this.DELAY = 1000;

  this.$sortBox = document.getElementById('sortBox');
  this.$commentBox = document.getElementById('commentBox');

  this.sortChildren = this.$sortBox.children;
  this.sortingList = [];
  this.isStop = false;
  this.styleClassName = {
    select: 'selected',
    finish: 'finish'
  };
}

Model.prototype._quickSort = async function (start = 0, end = this.sortingList.length - 1) {
  showViewText(this.START_COMMENT);

  changeViewStyle(this.styleClassName['select'], this.sortChildren[start], this.sortChildren[end]);

  if (start >= end) {
    return;
  }

  if (this.isStop) {
    return;
  }

  let borderIndex = await this._getQuickSortIndex(this.sortingList, start, end);

	await this._quickSort(start, borderIndex - 1);
  await this._quickSort(borderIndex, end);

	return this.sortingList;
};

Model.prototype._getQuickSortIndex = async function (array, start, end) {
  const pivotIndex = Math.floor((start + end) / 2);
  const pivotValue = array[pivotIndex];

	while (start <= end) {
		while (array[start] < pivotValue) {
      start = start + 1;
    }

		while (array[end] > pivotValue) {
      end = end - 1;
    }

		if (start <= end) {
      let swapValue = array[start];

      array[start] = array[end];
      array[end] = swapValue;

      await swapInView(this.sortChildren[start], this.sortChildren[end], array, this.DELAY);

			start = start + 1;
			end = end - 1;
		}
	}

	return start;
};

Model.prototype._bubbleSort = async function () {
  let swapValue;

  showViewText(this.START_COMMENT);

  for (let i = 0; i < this.sortChildren.length; i++) {
    for (let j = 0; j < this.sortChildren.length - 1 - i; j++) {
      if (this.isStop) {
        return;
      }

      changeViewStyle(this.styleClassName['select'], this.sortChildren[j], this.sortChildren[j + 1]);

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, this.DELAY);
      });

      if (this.sortingList[j] > this.sortingList[j + 1]) {
        swapValue = this.sortingList[j];
        this.sortingList[j] = this.sortingList[j + 1];
        this.sortingList[j + 1] = swapValue;

        await swapInView(this.sortChildren[j + 1], this.sortChildren[j], this.sortingList, this.DELAY);
      } else {
        changeViewStyle(this.styleClassName['select'], this.sortChildren[j], this.sortChildren[j + 1]);
      }
    }

    if (!swapValue) {
      break;
    }
  }

  showViewText(this.ENDING_COMMENT);
};

Model.prototype._setFaster = function () {
  this.DELAY -= this.TIME_INTERVAL;

  if (this.DELAY < this.LIMIT_HIGH_TIME) {
    this.DELAY = this.LIMIT_HIGH_TIME;
  }
};

Model.prototype._setSlower = function () {
  this.DELAY += this.TIME_INTERVAL;

  if (this.DELAY > this.LIMIT_LOW_TIME) {
    this.DELAY = this.LIMIT_LOW_TIME;
  }
};

Model.prototype._checkValue = function (string) {
  const stringList = string.split(',');

  if (stringList.length < 5 || stringList.length > 10) {
    showViewText(this.OUT_OF_RANGE_ERROR_COMMENT);
    return;
  }

  for (let i = 0; i < stringList.length; i++) {
    if (isNaN(Number(stringList[i])) || Number(stringList[i]) <= 0) {
      showViewText(this.INPUT_TYPE_ERROR_COMMENT);

      this.sortingList = [];
      return;
    }
    
    showViewText(this.CORRECT_VALUE_COMMENT);

    this.sortingList.push(Number(stringList[i]));
  }
  
  return this.sortingList;
};

Model.prototype._resetBoard = function () {
  while (this.$sortBox.hasChildNodes()) {
    this.$sortBox.removeChild(this.$sortBox.firstChild);
  }

  this.sortingList = [];
  this.isStop = false;

  showViewText('');

  return;
};
