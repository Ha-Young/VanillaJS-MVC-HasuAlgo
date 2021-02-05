function Controller(Model, View) {
  this.model = Model;
  this.view = View;
}

Controller.prototype.submitHandler = function () {
  try {
    const $inputValue = document.querySelector('.inputValue');
    const sortType = document.querySelector('select').value;
    const numberList = $inputValue.value.trim().split(',').map(elem => parseInt(elem, 10));
    $inputValue.value = '';
    // checkValidation(numberList);

    this.view.render(numberList);
    this.sortingStart(sortType, numberList.slice());
    this.startVisualizing(sortType);
  } catch(err) {
    document.querySelector('.resultView').textContent = err.message;
  }
};

Controller.prototype.sortingStart = function (sortType, list) {
  if (sortType === 'bubble') {
    this.bubbleSort(sortType, list);
  } else if (sortType === 'quick') {
    this.quickSort(0, list.length - 1, list);
  }
};

Controller.prototype.startVisualizing = async function (sortType) {
  const task = this.model.findNextTask();

  if (!task) return;

  if (task.type === 'start') {
    await this.view.start();
  } else if (task.type === 'compare') {
    await this.view.compare(task.sourceIndex, task.targetIndex);
  } else if (task.type === 'pivot') {
    await this.view.pivot(task.sourceIndex);
  } else if (task.type === 'swap') {
    await this.view.swapBubble(task.sourceIndex, task.targetIndex, task.list);
  } else if (task.type === 'single item done') {
    await this.view.singleItemDone(task.sourceIndex);
  } else if (task.type === 'finish') {
    await this.view.finishSort();
  }

  await this.startVisualizing(sortType);
};


Controller.prototype.bubbleSort = function (sortType, list, length = list.length - 1) {
  let hasChanged = false;

  this.model.createTask('start');

  for (let i = 1; i < list.length; i++) {
    this.model.createTask('compare', i - 1, i);

    if (list[i - 1] > list[i]) {
      hasChanged = true;
      [list[i - 1], list[i]] = [list[i], list[i - 1]];
      this.model.createTask('swap', i - 1, i, list.slice());
    }
  }
  this.model.createTask('single item done', length);

  hasChanged? this.bubbleSort(sortType, list, length - 1) : this.model.createTask('finish');
};

Controller.prototype.quickSort = async function (start, end, list) {
  this.model.createTask('start');

  const part2 = await this.partition(start, end, list);

  if (start < part2 - 1) {
    this.quickSort(start, part2 - 1, list);
  }
  if (part2 < end) {
    this.quickSort(part2, end, list);
  }
};

Controller.prototype.partition = async function (start, end, list) {
  const index = Math.floor((start + end) / 2);
  const pivot = list[index];

  this.model.createTask('pivot', index);

  while (start < end) {
    this.model.createTask('compare', start, index);
    while (list[start] < pivot) {
      start++;
      this.model.createTask('move', start, start - 1);
    }
    while (list[end] > pivot) {
      end--;
      this.model.createTask('move', end, end + 1);
    }

    if (start <= end) {
      [list[start], list[end]] = [list[end], list[start]];
      this.model.createTask('swap', start, end, list.slice());
      start++;
      end--;
    }
    return start;
  }
};

function checkValidation(list) {
  if (!list.every(elem => !!elem === true)) {
    throw Error('Insert Numbers...');
  } else if (list.length < 5) {
    throw Error('Need at least 5 numbers...');
  } else if (list.length > 10) {
    throw Error('Need at most 10 numbers...');
  }
}

export default Controller;
