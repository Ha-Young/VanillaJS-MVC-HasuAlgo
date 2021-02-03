// Load application styles
import '../assets/styles/index.less';
import BubbleController from './bubble_sort/bubble.controller.js';
import QuickController from './quick_sort/quick.controller.js';

window.addEventListener("DOMContentLoaded", function () {
  const $bubble = document.querySelector("#bubble");
  const $quick = document.querySelector("#quick");
  let currentSort = new BubbleController();

  $bubble.addEventListener("change", (event) => {
    currentSort.clear();
    currentSort = new BubbleController();
    console.log(event.target.value);
  });
  $quick.addEventListener("change", (event) => {
    currentSort.clear();
    currentSort = new QuickController();
    console.log(event.target.value);
  })
});
