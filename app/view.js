function View() {
  const ITEM_CLASS_NAME = '.sortItems';
  this.makeTemplate = function (list) {
    const $section = document.createElement('section');

    list.forEach(elem => {
      const div = document.createElement('div');
      div.textContent = elem;
      div.classList.add('sortItems');
      $section.appendChild(div);
    });

    return $section;
  }

  this.render = function(list) {
    const $resultView = document.querySelector('.resultView');

    const $section = this.makeTemplate(list);
    $resultView.appendChild($section);
  }

  this.getCurrentDom = function(ITEM_CLASS_NAME) {
    const $items = document.querySelectorAll(ITEM_CLASS_NAME);
    return Array.prototype.slice.call($items);
  }

  this.bubbleChange = function ([big, small]) {
    big.style.transform = 'translateX(70px)';
    small.style.transform = 'translateX(-70px)';
    return true;
    // return new Promise(resolve => {
    //   big.style.transform = 'translateX(70px)';
    //   small.style.transform = 'translateX(-70px)';
    //   resolve(true);
    // });
  }

  this.changeDom = function (bigIndex, smallIndex) {
    return new Promise((resolve, reject) => {
      const $section = document.querySelector('section');
      const $itemsList = this.getCurrentDom(ITEM_CLASS_NAME);
      setTimeout(function () {
        $section.insertBefore($itemsList[smallIndex], $itemsList[bigIndex]);
        resolve([$itemsList[bigIndex], $itemsList[smallIndex]]);
      }, 1000);
    });
  }
}

export default View;
