function View() {
  this.ITEM_CLASS_NAME = 'sortItems';
  this.$resultView = document.querySelector('.resultView');
}

View.prototype.render = function(list) {
  this.$resultView.innerHTML = '';
  list.forEach(elem => {
    const div = document.createElement('div');
    div.textContent = elem;
    div.classList.add(this.ITEM_CLASS_NAME);
    this.$resultView.appendChild(div);
  });
};

View.prototype.reRender = function(list) {
  const $items = this.getCurrentDOM();
  const tempStorage = document.createElement('div');

  list.forEach(item => {
    const div = $items.find(elem => item === parseInt(elem.innerText, 10));
    div.classList.remove('compare', 'pivot');
    div.style.transform = 'none';
    tempStorage.appendChild(div);
  });

  this.$resultView.innerHTML = tempStorage.innerHTML;
}

View.prototype.getCurrentDOM = function () {
  return Array.prototype.slice.call(this.$resultView.childNodes);
};

View.prototype.start = async function () {
  await makeInterval();
}

View.prototype.pivot = async function (index) {
  const $items = this.getCurrentDOM();
  $items[index].classList.add('pivot');

  await makeInterval();
};

View.prototype.compare = async function (leftIndex, rightIndex) {
  const $items = this.getCurrentDOM();

  if ($items[leftIndex].classList.contains('done')) {
    return;
  }
  if ($items[rightIndex].classList.contains('done')) {
    return;
  }

  $items[leftIndex].classList.add('compare');
  $items[rightIndex].classList.add('compare');
  await makeInterval();
};

View.prototype.move = async function (index, prevIndex) {
  const $items = this.getCurrentDOM();
  $items[index].classList.add('compare');
  $items[prevIndex].classList.remove('compare');

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

View.prototype.singleItemDone = async function (index) {
  const $item = this.getCurrentDOM()[index];
  $item.classList.remove('compare', 'pivot');
  $item.classList.add('done');
  await makeInterval(0);
}

View.prototype.finishSort = async function () {
  const $items = this.getCurrentDOM();
  $items.forEach(item => item.classList.remove('compare', 'pivot'));
  await makeInterval();
}

function makeInterval(interval = 1) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), interval * 1000);
  });
}

export default View;
