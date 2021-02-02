// Load application styles
import '../assets/styles/index.less';
import BubbleController from './bubble_sort/bubble.controller.js';

window.addEventListener("DOMContentLoaded", function () {
  new BubbleController();
});
