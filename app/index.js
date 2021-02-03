// Load application styles
import '../assets/styles/index.less';
import BubbleController from './bubble_sort/bubble.controller.js';
import QuickController from './quick_sort/quick.controller.js';

window.addEventListener("DOMContentLoaded", function () {
  const $select = document.querySelector("select");
  let currentSort = {clear: function identity() {}};
  currentSort = new BubbleController(); //zz

  // $select.addEventListener("change", (event) => {
  //   switch (event.target.value) {
  //     case "Bubble Sort":
  //       console.log(event.target.value);
  //       currentSort.clear();
  //       currentSort = new BubbleController();
  //       break;
  //     case "Quick Sort":
  //       console.log(event.target.value);
  //       currentSort.clear();
  //       currentSort = new QuickController();
  //       break;
  //     default:
  //       console.log(event.target.value);
  //       currentSort.clear();
  //       currentSort = {clear: function identity() {}};
  //   }
  // });
});
