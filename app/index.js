// Load application styles
import '../assets/styles/index.less';
import BubbleController from './bubble_sort/bubble.controller.js';
import QuickController from './quick_sort/quick.controller.js';

window.addEventListener("DOMContentLoaded", function () {
  const $select = document.querySelector("select");
  let currentSort = {clear: function identity() {}};

  $select.addEventListener("change", (event) => {
    switch (event.target.value) {
      case "Bubble Sort":
        currentSort.clear();
        currentSort = new BubbleController();
        break;
      case "Quick Sort":
        currentSort.clear();
        currentSort = new QuickController();
        // creat new Quick Sort
        break;
      default:
        currentSort.clear();
        currentSort = {clear: function identity() {}};
    }
  });
});
