function View() {
  const ITEM_CLASS_NAME = 'sortItems';

  this.render = function(list) {
    const $resultView = document.querySelector('.resultView');
    const $section = this.makeTemplate(list);
    $resultView.appendChild($section);

    // css변경
    // less.modifyVars({
    //   '@bgColor': 'blue',
    //   '@textColor': 'red'
    // });
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

  // this.getCurrentDom = function() {
  //   // return document.querySelector('section');
  //   const $items = document.querySelectorAll('.sortItems');
  //   return Array.prototype.slice.call($items);
  // }

  // this.bubbleChange = function ([small, big]) {
  //   small.style.transform = 'translateX(-70px)';
  //   big.style.transform = 'translateX(70px)';
  //   return true;
  // }

  // this.changeDom = function (bigIndex, smallIndex) {
  //   return new Promise(resolve => {
  //     // const $section = this.getCurrentDom();
  //     // const $items = $section.childNodes;
  //     const $itemsList = this.getCurrentDom();
  // for (const v of $itemsList) {
  //   console.log(v.textContent);
  // }
  //     setTimeout(function () {
  //       const $section = document.querySelector('section');

  //       $section.insertBefore($itemsList[smallIndex], $itemsList[bigIndex]);
  //       // $section.insertBefore($items[smallIndex], $items[bigIndex]);
  //       // resolve([$section.childNodes[smallIndex], $section.childNodes[bigIndex]]);
  //       resolve([$itemsList[smallIndex], $itemsList[bigIndex]]);
  //     }, 1000);
  //   });
  // }

  // 1. 위에서 아까아까 querySelector로 구해둔 resultView를 아래에서 써도 바뀐 내용이 잘 넘어오는가?

  // 2. less 이용해서 변수어케 바꾸지?
  // 3. querySelector 여러번 함수마다 구현 vs. 부모노드를 구해서 다음 함수로 전달, childNode를 이용하여 돔구조 변경
  // reflow 입장에서는 DOM에 추가/삭제/클래스변경

  this.getCurrentDom = function() {
    return document.querySelector('section');
  }

  this.bubbleChange = function ([bigElement, smallElement]) {
    smallElement.style.transform = 'translateX(-70px)';
    bigElement.style.transform = 'translateX(70px)';
    return true;
  }

  this.changeDom = function (bigIndex, smallIndex) {
    return new Promise(resolve => {
      const $section = this.getCurrentDom();
      const $items = Array.prototype.slice.call($section.childNodes);

      setTimeout(function () {
        $section.insertBefore($items[smallIndex], $items[bigIndex]);
        resolve([$items[bigIndex], $items[smallIndex]]);
      }, 1000);
    });
  }
}

export default View;
