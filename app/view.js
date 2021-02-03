function View() {
  const ITEM_CLASS_NAME = 'sortItems';

  this.render = function(list) {
    const $resultView = document.querySelector('.resultView');
    const $section = this.makeTemplate(list);
    $resultView.appendChild($section);
  }

  this.makeTemplate = function (list) {
    const $section = document.createElement('section');

    list.forEach(elem => {
      const div = document.createElement('div');
      div.textContent = elem;
      div.classList.add(ITEM_CLASS_NAME);
      $section.appendChild(div);
    });

    return $section;
  }

  this.getCurrentDom = function() {
    // return document.querySelector('section');
    const $items = document.querySelectorAll('.sortItems');
    return Array.prototype.slice.call($items);
  }

  this.bubbleChange = function ([small, big]) {
    small.style.transform = 'translateX(-70px)';
    big.style.transform = 'translateX(70px)';
    return true;
  }

  this.changeDom = function (bigIndex, smallIndex) {
    return new Promise(resolve => {
      // const $section = this.getCurrentDom();
      // const $items = $section.childNodes;
      const $itemsList = this.getCurrentDom();
      setTimeout(function () {
        const $section = document.querySelector('section');

        $section.insertBefore($itemsList[smallIndex], $itemsList[bigIndex]);
        // $section.insertBefore($items[smallIndex], $items[bigIndex]);
        // resolve([$section.childNodes[smallIndex], $section.childNodes[bigIndex]]);
        resolve([$itemsList[smallIndex], $itemsList[bigIndex]]);
      }, 1000);
    });
  }

  // this.getCurrentDom = function() {
  //   return document.querySelector('section');
  // }

  // this.bubbleChange = function ([small, big]) {
  //   small.style.transform = 'translateX(-70px)';
  //   big.style.transform = 'translateX(70px)';
  //   return true;
  // }

  // this.changeDom = function (bigIndex, smallIndex) {
  //   return new Promise(resolve => {
  //     const $section = this.getCurrentDom();
  //     const $items = $section.childNodes;
  //     setTimeout(function () {
  //       $section.insertBefore($items[smallIndex], $items[bigIndex]);
  //       resolve([$section.childNodes[smallIndex], $section.childNodes[bigIndex]]);
  //     }, 1000);
  //   });
  // }
}

export default View;
