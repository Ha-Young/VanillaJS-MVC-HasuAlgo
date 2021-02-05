function Controller(Model, View) {
  this.model = Model;
  this.view = View;
  this.INTERVAL = 1;
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
    this.asyncRecursion(sortType, numberList);
  } catch(err) {
    document.querySelector('.resultView').textContent = err.message;
  }
};

Controller.prototype.sortingStart = function (sortType, list) {
  if (sortType === 'bubble') {
    this.bubbleSort(sortType, list);
  } else if (sortType === 'quick') {

  }
};

Controller.prototype.bubbleSort = function (sortType, list) {
  let hasChanged = false;

  this.model.createTask('start');

  for (let i = 1; i < list.length; i++) {
    this.model.createTask('compare', i - 1, i);

    if (list[i - 1] > list[i]) {
      hasChanged = true;
      [list[i - 1], list[i]] = [list[i], list[i - 1]];
      this.model.createTask('swap', i - 1, i, list.slice());
    }

    this.model.createTask('single item done', list.length - i - 1);
  }

  hasChanged? this.bubbleSort(sortType, list) : this.model.createTask('finish');
};

Controller.prototype.asyncRecursion = async function (sortType) {
  const task = this.model.findNextTask();

  if (!task) return;

  if (task.type === 'start') {
    await makeInterval(this.INTERVAL);
  } else if (task.type === 'compare') {


  } else if (task.type === 'swap') {
    await this.view.swapBubble(task.sourceIndex, task.targetIndex, this.INTERVAL);
    this.view.render(task.list);
  } else if (task.type === 'single item done') {


  } else if (task.type === 'finish') {

  }

  await this.asyncRecursion(sortType);
};

Controller.prototype.quickSort = async function (start, end, list) {
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

  while (start < end) {
    while (list[start] < pivot) start++; // async + css
    while (list[end] > pivot) end--; // async + css

    if (start <= end) {
      await this.moveSlowly(start, end, list);
      [list[start], list[end]] = [list[end], list[start]];
      this.view.render(list);
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

function makeInterval(x) {
  return new Promise(resolve => {
    setTimeout(resolve, x * 1000);
  });
}

export default Controller;
