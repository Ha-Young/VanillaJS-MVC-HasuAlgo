function View() {
  this.ITEM_CLASS_NAME = 'sortItems';
  this.$resultView = document.querySelector('.resultView');
}

View.prototype.render = function(list) {
  console.log(list);
  this.makeTemplate(list);
}

View.prototype.makeTemplate = function (list) {
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

View.prototype.moveElement = function (left, right, interval) {
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

export default View;
