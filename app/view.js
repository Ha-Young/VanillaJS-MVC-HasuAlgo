function View() {
  this.ITEM_CLASS_NAME = "sortItems";
  this.$resultView = document.querySelector(".resultView");
  this.$form = document.querySelector("form");
  this.$inputValue = document.querySelector(".inputValue");
  this.COMPARE = "compare";
  this.PIVOT = "pivot";
  this.DONE = "done";
  this.MOVE = "move";
  this.CHANGE = "change";
}

View.prototype.render = function (list) {
  this.list = list;
  this.$resultView.innerHTML = "";

  list.forEach((elem) => {
    const div = document.createElement("div");
    div.textContent = elem;
    div.classList.add(this.ITEM_CLASS_NAME);
    this.$resultView.appendChild(div);
  });
};

View.prototype.reRender = function (list = this.list) {
  const $items = this.getCurrentDOM();
  const tempStorage = document.createElement("div");

  list.forEach((item) => {
    const div = $items.find(
      (elem) => item === parseInt(elem.innerText, 10)
    );
    div.classList.remove(this.COMPARE, this.CHANGE);
    div.style.transform = "none";
    tempStorage.appendChild(div);
  });

  this.$resultView.innerHTML = tempStorage.innerHTML;
};

View.prototype.getCurrentDOM = function () {
  return Array.prototype.slice.call(this.$resultView.childNodes);
};

View.prototype.getCurrentElement = function (index) {
  return Array.prototype.slice.call(this.$resultView.childNodes)[index];
};

View.prototype.start = async function () {
  this.$resultView.childNodes.forEach((item) => item.classList.add("border"));
  await makeInterval();
};

View.prototype.pivot = async function (index) {
  this.reRender();

  const $item = this.getCurrentElement(index);
  $item.classList.add(this.PIVOT);
  await makeInterval();
};

View.prototype.compare = async function (leftIndex, rightIndex) {
  this.reRender();
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

View.prototype.move = async function (index, prevIndex) {
  const $items = this.getCurrentDOM();
  removeClass($items[prevIndex], this.COMPARE);
  addClass($items[index], this.COMPARE);
  // $items[prevIndex].classList.remove(this.COMPARE);
  // $items[index].classList.add(this.COMPARE);
  await makeInterval();
};

function removeClass(element, ...className) {
  element.classList.remove(...className);
}

function addClass(element, ...className) {
  element.classList.add(...className);
}

View.prototype.swapBubble = async function (left, right, list) {
  const $items = this.getCurrentDOM();
  const differ =
    $items[right].getBoundingClientRect().x -
    $items[left].getBoundingClientRect().x;

  removeClass($items[left], this.COMPARE);
  removeClass($items[right], this.COMPARE);

  addClass($items[left], this.CHANGE);
  addClass($items[right], this.CHANGE);
  // $items[left].classList.add(this.MOVE);
  // $items[right].classList.add(this.MOVE);

  $items[left].style.transform = `translateX(${differ}px)`;
  $items[right].style.transform = `translateX(-${differ}px)`;
  await makeInterval();

  // removeClass($items[left], this.CHANGE);
  // removeClass($items[right], this.CHANGE);

  this.list = list;
  this.reRender();
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

  this.reRender();
  await makeInterval();
  this.showRestart();
};

View.prototype.showRestart = function () {
  this.$inputValue.disabled = false;
  this.$form.querySelector("input[type=submit]").value = "restart";
};

function makeInterval(interval = 1) {
  return new Promise((resolve) => setTimeout(resolve, interval * 1000));
}

export default View;
