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

View.prototype.getCurrentDOM = function () {
  return Array.prototype.slice.call(this.$resultView.childNodes);
};

View.prototype.swapBubble = function (left, right, interval) {
  return new Promise(resolve => {
    const $items = this.getCurrentDOM();
    const differ = $items[right].getBoundingClientRect().x - $items[left].getBoundingClientRect().x;
    $items[left].style.transform = `translateX(${differ}px)`;
    $items[right].style.transform = `translateX(-${differ}px)`;

    setTimeout(function () {
      resolve();
    }, interval * 1000);
  });

};

export default View;
