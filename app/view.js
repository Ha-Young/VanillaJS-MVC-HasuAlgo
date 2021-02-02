function View() {

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

  this.getCurrentDom = function() {
    const $items = document.querySelectorAll('.sortItems');
    return Array.prototype.slice.call($items);
  }

  this.changePosition = function (big, small) {
    // debugger;
    // big.style.transform = 'translateX(70px)';
    // small.style.transform = 'translateX(-70px)';
  }

  this.changeDom = function (big, small) {
    console.log(big.textContent, small.textContent);
    const $section = document.querySelector('section');

    $section.insertBefore(small, big);
    // 5,4,3,2,1
    // 4,3,2,1,5
    // 3,2,1,4,5
    // 2,1,3,4,5
    // 1,2,3,4,5
  }
}

// function after1second() {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), 1000);
//   });
// }


export default View;
