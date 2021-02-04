function Controller(Model, View) {
  this.model = Model;
  this.view = View;
  this.INTERVAL = 1;
}

Controller.prototype.submitHandler = function () {
  try {
    const $inputValue = document.querySelector('.inputValue');
    const numberList = makeNumber($inputValue.value);
    // checkValidation(numberList);

    $inputValue.value = '';

    const sortType = document.querySelector('select').value;
    this.model.saveModel(sortType, numberList);
    this.view.render(numberList);
    this.asyncRecursion(sortType, numberList);
  } catch(err) {
    document.querySelector('.resultView').textContent = err.message;
  }
}

Controller.prototype.asyncRecursion = async function (sortType, list) {
  if (sortType === 'bubble') {
    const hasChanged = await this.bubbleSort(list);
    if (hasChanged) await this.asyncRecursion(sortType, list);
  }
}

Controller.prototype.bubbleSort = async function (list) {
  let hasChanged = false;

  for (let i = 1; i < list.length; i++) {
    const BUBBLE_SORT = list[i - 1] > list[i];
    if (BUBBLE_SORT) {
      hasChanged = await this.moveSlowly(i - 1, i, list);
      [list[i - 1], list[i]] = [list[i], list[i - 1]];
    }
  }
  return hasChanged;
}

Controller.prototype.moveSlowly = async function (bigNumber, smallNumber, list) {
  await makeInterval(this.INTERVAL);
  await this.view.bubbleChange(bigNumber, smallNumber, this.INTERVAL);
  this.view.render(list);
  return await this.view.changeDom(bigNumber, smallNumber);
}

function makeNumber(inputString) {
  return inputString.trim().split(',')
    .map(elem => parseInt(elem, 10));
}

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
    setTimeout(() => resolve(true), x * 1000);
  });
}

export default Controller;
