function Controller(Model, View) {
  this.model = Model;
  this.view = View;
}

const taskType = {
  start: 'start',
  compare: 'compare',
  pivot: 'pivot',
  move: 'move',
  swap: 'swap',
  done: 'single item done',
  finish: 'finish'
};

const sortType = {
  bubble: 'bubble',
  quick: 'quick'
};

Controller.prototype.submitHandler = function () {
  try {
    const $inputValue = document.querySelector('.inputValue');
    const $sortType = document.querySelector('select').value;
    const numberList = convertToArray($inputValue.value);

    $inputValue.value = '';
    $inputValue.disabled = true;
    // checkValidation(numberList);

    this.view.render(numberList);
    this.startSorting($sortType, numberList.slice());
    this.startVisualizing();
  } catch(err) {
    document.querySelector('.resultView').textContent = err.message;
  }
};

Controller.prototype.startSorting = function ($sortType, list) {
  if ($sortType === sortType.bubble) {
    this.bubbleSort(list);
  } else if ($sortType === sortType.quick) {
    this.quickSort(0, list.length - 1, list);
  }
};

Controller.prototype.startVisualizing = async function () {
  const task = this.model.findNextTask();

  if (!task) return;

  if (task.type === taskType.start) {
    await this.view.start();
  } else if (task.type === taskType.compare) {
    await this.view.compare(task.sourceIndex, task.targetIndex);
  } else if (task.type === taskType.pivot) {
    await this.view.pivot(task.sourceIndex);
  } else if (task.type === taskType.swap) {
    await this.view.swapBubble(task.sourceIndex, task.targetIndex, task.list);
  } else if (task.type === taskType.done) {
    await this.view.singleItemDone(task.sourceIndex);
  } else if (task.type === taskType.finish) {
    await this.view.finishSort();
  }

  await this.startVisualizing();
};

Controller.prototype.bubbleSort = function (list, index) {
  let hasChanged = false;
  const finishedIndex = index? index - 1 : list.length - 1;

  this.model.createTask(taskType.start);

  for (let i = 1; i < list.length; i++) {
    this.model.createTask(taskType.compare, i - 1, i);

    if (list[i - 1] > list[i]) {
      hasChanged = true;
      [list[i - 1], list[i]] = [list[i], list[i - 1]];
      this.model.createTask(taskType.swap, i - 1, i, list.slice());
    }
  }

  this.model.createTask(taskType.done, finishedIndex);

  hasChanged
    ? this.bubbleSort(list, finishedIndex)
    : this.model.createTask(taskType.finish);
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

  this.model.createTask(taskType.pivot, index);

  while (start < end) {
    this.model.createTask(taskType.compare, start, end);

    while (list[start] < pivot) {
      start++;
      this.model.createTask(taskType.move, start, start - 1);
    }

    while (list[end] > pivot) {
      end--;
      this.model.createTask(taskType.move, end, end + 1);
    }

    if (start <= end) {
      [list[start], list[end]] = [list[end], list[start]];
      this.model.createTask(taskType.swap, start, end, list.slice());
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

function convertToArray(string) {
  const list = string.trim().split(',').map(elem => parseInt(elem, 10));
  return list.filter(elem => !!elem === true);
}

export default Controller;
