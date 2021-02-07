import { swapInView, changeViewStyle, showViewText } from './controller.js';

export default function Model() {
  this.START_COMMENT = 'Start sorting';
  this.DURING_COMMENT = 'Sorting';
  this.ENDING_COMMENT = 'Its done!';
  this.CORRECT_VALUE_COMMENT = 'If you selected sorting mode, press the start button';
  this.OUT_OF_RANGE_ERROR_COMMENT = 'Please enter 5 or more and 10 or less';
  this.INPUT_TYPE_ERROR_COMMENT = 'Lets sort by numbers only. 0 is not for sorting';
  this.LOW_LIMIT_LENGTH = 5;
  this.HIGH_LIMIT_LENGTH = 10;
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
    SELECT: 'selected',
    FINISH: 'finish',
    PIVOK: 'pivok'
  };
}

Model.prototype._quickSort = async function (start = 0, end = this.sortingList.length - 1) {
  showViewText(this.START_COMMENT);

  changeViewStyle(this.styleClassName.SELECT, this.sortChildren[start], this.sortChildren[end]);

  if (start >= end) {
    return;
  }

  if (this.isStop) {
    return;
  }

  const borderIndex = await this._divideConquerQuickSortElements(this.sortingList, start, end);

	await this._quickSort(start, borderIndex - 1);
  await this._quickSort(borderIndex, end);

	return this.sortingList;
};

Model.prototype._divideConquerQuickSortElements = async function (array, start, end) {
  const pivotIndex = Math.floor((start + end) / 2);
  const pivotValue = array[pivotIndex];

  showViewText(this.DURING_COMMENT);

	while (end >= start) {
    changeViewStyle(this.styleClassName.PIVOK, this.sortChildren[pivotIndex]);

		while (pivotValue > array[start]) {
      start = start + 1;
    }

		while (array[end] > pivotValue) {
      end = end - 1;
    }

		if (end >= start) {
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
    showViewText(this.DURING_COMMENT);

    for (let j = 0; j < this.sortChildren.length - 1 - i; j++) {
      if (this.isStop) {
        return;
      }

      changeViewStyle(this.styleClassName.SELECT, this.sortChildren[j], this.sortChildren[j + 1]);

      await new Promise(resolve => {
        setTimeout(resolve, this.DELAY);
      });

      if (this.sortingList[j] > this.sortingList[j + 1]) {
        swapValue = this.sortingList[j];
        this.sortingList[j] = this.sortingList[j + 1];
        this.sortingList[j + 1] = swapValue;

        await swapInView(this.sortChildren[j + 1], this.sortChildren[j], this.sortingList, this.DELAY);
      } else {
        changeViewStyle(this.styleClassName.SELECT, this.sortChildren[j], this.sortChildren[j + 1]);
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

  if (this.LIMIT_HIGH_TIME > this.DELAY) {
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

  if (this.LOW_LIMIT_LENGTH > stringList.length || stringList.length > this.HIGH_LIMIT_LENGTH) {
    showViewText(this.OUT_OF_RANGE_ERROR_COMMENT);
    return;
  }

  for (let i = 0; i < stringList.length; i++) {
    if (isNaN(Number(stringList[i])) || 0 >= Number(stringList[i])) {
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
  this.$sortBox.textContent = '';

  this.sortingList = [];
  this.isStop = false;

  showViewText('');

  return;
};
