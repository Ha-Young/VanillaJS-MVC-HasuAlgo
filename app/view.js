function View() {
  this.ITEM_CLASS_NAME = 'sortItems';
  this.$resultView = document.querySelector('.resultView');
  this.$form = document.querySelector('form');
  this.$inputValue = document.querySelector('.inputValue');
}

const COMPARE = 'compare';
const PIVOT = 'pivot';
const DONE = 'done';
const CHANGE = 'change';

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
    div.classList.remove(COMPARE, CHANGE);
    div.style.transform = 'none';
    tempStorage.appendChild(div);
  });

  this.$resultView.innerHTML = tempStorage.innerHTML;
};

View.prototype.start = async function () {
  this.$resultView.childNodes.forEach(item => item.classList.add('border'));
  await wait();
};

View.prototype.pivot = async function (index) {
  const $items = this.getCurrentDOM();

  $items.forEach((item, i) => {
    item.classList.remove(PIVOT);
    if (index === i) item.classList.add(PIVOT);
  });

  await wait();
};

View.prototype.compare = async function (leftIndex, rightIndex) {
  const $items = this.getCurrentDOM();

  if ($items[leftIndex].classList.contains(DONE)) {
    return;
  }

  if ($items[rightIndex].classList.contains(DONE)) {
    return;
  }

  $items[leftIndex].classList.add(COMPARE);
  $items[rightIndex].classList.add(COMPARE);
  await wait();
};

View.prototype.swapBubble = async function (left, right, list) {
  const $items = this.getCurrentDOM();
  const differ = $items[right].getBoundingClientRect().x - $items[left].getBoundingClientRect().x;
  const bubbleHeight = '50px';

  document.createElement('div').innerHTML = `<script>
      less.modifyVars({ '@compare': 'blue' });
    </script>`;
  $items[left].style.transform = `translateX(${differ}px)`;
  $items[right].style.transform = `translateX(-${differ}px)`;
  await wait();
  this.reRender(list);
};

View.prototype.done = async function (index) {
  const $item = this.getCurrentElement(index);
  $item.classList.remove(COMPARE, PIVOT);
  $item.classList.add(DONE);
  await wait();
};

View.prototype.finishSort = async function () {
  const $items = this.getCurrentDOM();

  $items.forEach((item) => {
    item.classList.remove(COMPARE, PIVOT, CHANGE);
    item.classList.add(DONE);
  });

  await wait();
  this.showRestart();
};

View.prototype.showRestart = function () {
  this.$inputValue.disabled = false;
  this.$form.querySelector('input[type=submit]').value = 'restart';
};

View.prototype.move = async function (index, prevIndex) {
  const $items = this.getCurrentDOM();
  $items[index].classList.add(COMPARE);
  $items[prevIndex].classList.remove(COMPARE);
  await wait();
};

View.prototype.swapQuick = async function (left, right, list) {
  const $items = this.getCurrentDOM();
  const differ = $items[right].getBoundingClientRect().x - $items[left].getBoundingClientRect().x;

  $items[left].style.transform = `translateX(${differ}px)`;
  $items[right].style.transform = `translateX(-${differ}px)`;
  await wait();
  this.reRender(list);
};

View.prototype.getCurrentDOM = function () {
  return Array.from(this.$resultView.childNodes);
};

View.prototype.getCurrentElement = function (index) {
  return Array.from(this.$resultView.childNodes)[index];
};

View.prototype.getCurrentList = function () {
  const $items = this.getCurrentDOM();
  const currentList = [];
  $items.forEach(item => currentList.push(item.innerText));
  return currentList;
};

function wait(interval = 1) {
  return new Promise((resolve) => setTimeout(resolve, interval * 1000));
}

export default View;
