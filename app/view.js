function View() {
  this.ITEM_CLASS_NAME = 'sortItems';
  this.$resultView = document.querySelector('.resultView');
  this.$form = document.querySelector('form');
  this.$inputValue = document.querySelector('.inputValue');
  this.COMPARE = 'compare';
  this.PIVOT = 'pivot';
  this.DONE = 'done';
  this.MOVE = 'move';
  this.CHANGE = 'change';
}

View.prototype.render = function (list) {
  this.$resultView.innerHTML = '';

  list.forEach((elem) => {
    const div = document.createElement('div');
    div.textContent = elem;
    this.$resultView.appendChild(div);
  });
};

View.prototype.reRender = function (list) {
  const $items = this.getCurrentDOM();
  const tempStorage = document.createElement('div');

  list = list? list : this.getCurrentList();

  list.forEach(number => {
    const div = $items.find(item => item.innerText === String(number));
    // debugger;
    div.classList.remove(this.COMPARE, this.CHANGE);
    div.style.transform = 'none';
    tempStorage.appendChild(div);
  });

  this.$resultView.innerHTML = tempStorage.innerHTML;
};

View.prototype.start = async function () {
  this.$resultView.childNodes.forEach(item => item.classList.add('border'));
  await makeInterval();
};

View.prototype.pivot = async function (index) {
  const $items = this.getCurrentDOM();

  $items.forEach((item, i) => {
    item.classList.remove(this.PIVOT);
    if (index === i) item.classList.add(this.PIVOT);
  });
  await makeInterval();
};

View.prototype.compare = async function (leftIndex, rightIndex) {
  const $items = this.getCurrentDOM();

  if ($items[leftIndex].classList.contains(this.DONE)) {
    return;
  }

  if ($items[rightIndex].classList.contains(this.DONE)) {
    return;
  }

  $items[leftIndex].classList.add(this.COMPARE);
  $items[rightIndex].classList.add(this.COMPARE);
  await makeInterval();
};

View.prototype.swapBubble = async function (left, right, list) {
  const $items = this.getCurrentDOM();
  const differ = $items[right].getBoundingClientRect().x - $items[left].getBoundingClientRect().x;

  $items[left].style.transform = `translateX(${differ}px)`;
  $items[right].style.transform = `translateX(-${differ}px)`;
  await makeInterval();

  this.reRender(list);
};

View.prototype.done = async function (index) {
  const $item = this.getCurrentElement(index);
  $item.classList.remove(this.COMPARE, this.PIVOT);
  $item.classList.add(this.DONE);
  await makeInterval();
};

View.prototype.finishSort = async function () {
  const $items = this.getCurrentDOM();

  $items.forEach((item) => {
    item.classList.remove(this.COMPARE, this.PIVOT, this.CHANGE);
    item.classList.add(this.DONE);
  });

  await makeInterval();
  this.showRestart();
};

View.prototype.showRestart = function () {
  this.$inputValue.disabled = false;
  this.$form.querySelector('input[type=submit]').value = 'restart';
};

View.prototype.move = async function (index, prevIndex) {
  const $items = this.getCurrentDOM();
  $items[index].classList.add(this.COMPARE);
  $items[prevIndex].classList.remove(this.COMPARE);
  await makeInterval();
};

View.prototype.swapQuick = async function (left, right, list) {
  const $items = this.getCurrentDOM();
  const differ = $items[right].getBoundingClientRect().x - $items[left].getBoundingClientRect().x;

  $items[left].style.transform = `translateX(${differ}px)`;
  $items[right].style.transform = `translateX(-${differ}px)`;
  await makeInterval();

  this.reRender(list);
};

View.prototype.getCurrentDOM = function () {
  return Array.prototype.slice.call(this.$resultView.childNodes);
};

View.prototype.getCurrentElement = function (index) {
  return Array.prototype.slice.call(this.$resultView.childNodes)[index];
};

View.prototype.getCurrentList = function () {
  const $items = this.getCurrentDOM();
  const currentList = [];

  $items.forEach(item => currentList.push(item.innerText));

  return currentList;
};

function makeInterval(interval = 1) {
  return new Promise((resolve) => setTimeout(resolve, interval * 1000));
}

export default View;
