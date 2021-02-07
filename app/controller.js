function Controller(Model, View) {
  this.model = Model;
  this.view = View;
  const $form = document.querySelector('form');
  $form.addEventListener('submit', this.submitHandler.bind(this));
}

const taskType = {
  start: 'start',
  compare: 'compare',
  pivot: 'pivot',
  move: 'move',
  swapBubble: 'swapBubble',
  swapQuick: 'swapQuick',
  done: 'single item done',
  finish: 'finish',
};

const sortType = {
  bubble: 'bubble',
  quick: 'quick',
};

Controller.prototype.submitHandler = function (event) {
  try {
    event.preventDefault();

    const $inputValue = document.querySelector('.inputValue');
    const $sortType = document.querySelector('select').value;
    const numberList = omitOverlapAndConvertToArray($inputValue.value);

    $inputValue.value = '';
    $inputValue.disabled = true;
    checkValidation(numberList);

    this.view.render(numberList);
    this.startSorting($sortType, numberList.slice());
    this.startVisualizing();
  } catch (err) {
    document.querySelector('.resultView').textContent = err.message;
  }
};

Controller.prototype.startSorting = function ($sortType, list) {
  if ($sortType === sortType.bubble) {
    this.model.createTask(taskType.start);
    this.bubbleSort(list);
  } else if ($sortType === sortType.quick) {
    this.quickSort(list);
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
  } else if (task.type === taskType.move) {
    await this.view.move(task.sourceIndex, task.targetIndex);
  } else if (task.type === taskType.swapBubble) {
    await this.view.swapBubble(task.sourceIndex, task.targetIndex, task.list);
  } else if (task.type === taskType.swapQuick) {
    await this.view.swapQuick(task.sourceIndex, task.targetIndex, task.list);
  } else if (task.type === taskType.done) {
    await this.view.done(task.sourceIndex);
  } else if (task.type === taskType.finish) {
    await this.view.finishSort();
  }

  await this.startVisualizing();
};

Controller.prototype.bubbleSort = function (list, index) {
  let hasChanged = false;
  const finishedIndex = index ? index : list.length - 1;

  for (let i = 1; i < list.length; i++) {
    this.model.createTask(taskType.compare, i - 1, i);

    if (list[i - 1] > list[i]) {
      hasChanged = true;
      [list[i - 1], list[i]] = [list[i], list[i - 1]];
      this.model.createTask(taskType.swapBubble, i - 1, i, list.slice());
    }
  }

  this.model.createTask(taskType.done, finishedIndex);

  hasChanged
    ? this.bubbleSort(list, finishedIndex - 1)
    : this.model.createTask(taskType.finish);
};

Controller.prototype.quickSort = function (list) {
  this.model.createTask(taskType.start);

  this.recurseQs(0, list.length - 1, list);

  this.model.createTask(taskType.finish);
};

Controller.prototype.recurseQs = function (start, end, list) {
  const partIndex = this.partition(start, end, list);

  if (start < partIndex - 1) {
    this.recurseQs(start, partIndex - 1, list);
  }

  if (partIndex < end) {
    this.recurseQs(partIndex, end, list);
  }
};

Controller.prototype.partition = function (start, end, list) {
  const index = Math.floor((start + end) / 2);
  const pivot = list[index];

  this.model.createTask(taskType.pivot, index);

  while (start <= end) {
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
      if (start !== end) {
        this.model.createTask(taskType.swapQuick, start, end, list.slice());
      }
      start++;
      end--;
    }
  }

  return start;
};

function checkValidation(list) {
  if (list.length < 5) {
    throw Error('Need at least 5 numbers...');
  } else if (list.length > 10) {
    throw Error('Need at most 10 numbers...');
  }
}

function omitOverlapAndConvertToArray(string) {
  const list = string.trim().split(',')
    .map((elem) => parseInt(elem, 10))
    .filter((elem) => elem === 0 || !isNaN(elem));

  return list;
}

export default Controller;
