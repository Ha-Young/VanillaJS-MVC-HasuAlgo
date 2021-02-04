function View() {
  this.ITEM_CLASS_NAME = 'sortItems';
  this.$resultView = document.querySelector('.resultView');
}

View.prototype.render = function(list) {
  this.makeTemplate(list);
  // css변경
  // less.modifyVars({
  //   '@bgColor': 'blue',
  //   '@textColor': 'red'
  // });
}

View.prototype.makeTemplate = function (list) {
  console.log(list);
  this.$resultView.innerHTML = '';
  list.forEach(elem => {
    const div = document.createElement('div');
    div.textContent = elem;
    div.classList.add(this.ITEM_CLASS_NAME);
    this.$resultView.appendChild(div);
  });
}

View.prototype.getCurrentItems = function () {
  return Array.prototype.slice.call(this.$resultView.childNodes);
}

View.prototype.bubbleChange = function (left, right, interval) {
  return new Promise(resolve => {
    const $items = this.getCurrentItems();
    const differ = $items[right].getBoundingClientRect().x - $items[left].getBoundingClientRect().x;
    $items[left].style.transform = `translateX(${differ}px)`;
    $items[right].style.transform = `translateX(-${differ}px)`;

    setTimeout(function () {
      $items[left].style.transform = 'none';
      $items[right].style.transform = 'none';
      resolve();
    }, interval * 1000);
  })
}

View.prototype.changeDom = function (bigNumber, smallNumber) {
  return new Promise(resolve => {
    const $items = this.getCurrentItems();
    this.$resultView.insertBefore($items[smallNumber], $items[bigNumber]);
    setTimeout(function () {
      resolve(true);
    }, 0);
  });
}

function resetTransform() {
  document.body.addEventListener('transitionend', () => {
    $items[left].style.transform = 'none';
    $items[right].style.transform = 'none';
  });
}

export default View;
