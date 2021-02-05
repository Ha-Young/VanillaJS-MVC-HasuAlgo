function View() {
  this.ITEM_CLASS_NAME = 'sortItems';
  this.$resultView = document.querySelector('.resultView');
  this.INTERVAL = 1;
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

View.prototype.getCurrentDOM = function () {
  return Array.prototype.slice.call(this.$resultView.childNodes);
};

View.prototype.pivot = async function (index) {
  const $items = this.getCurrentDOM();
  $items[index].classList.add('pivot');

  await makeInterval(this.INTERVAL);
};

View.prototype.compare = async function (leftIndex, rightIndex) {
  const $items = this.getCurrentDOM();
  $items[leftIndex].classList.add('compare');
  $items[rightIndex].classList.add('compare');

  await makeInterval(this.INTERVAL);
};

View.prototype.move = async function (index, prevIndex) {
  const $items = this.getCurrentDOM();
  $items[index].classList.add('compare');
  $items[prevIndex].classList.remove('compare');

  await makeInterval(this.INTERVAL);
};

View.prototype.swapBubble = async function (left, right, list) {
  const $items = this.getCurrentDOM();
  const differ = $items[right].getBoundingClientRect().x - $items[left].getBoundingClientRect().x;
  $items[left].style.transform = `translateX(${differ}px)`;
  $items[right].style.transform = `translateX(-${differ}px)`;
  await makeInterval(this.INTERVAL);
  this.render(list);
};

function makeInterval(interval) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), interval * 1000);
  });
}

export default View;
