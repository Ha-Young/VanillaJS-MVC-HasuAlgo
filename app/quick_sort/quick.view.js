import BubbleView from '../bubble_sort/bubble.view.js';

export default function QuickView() {
  this.$graphs = document.querySelector(".graphs");
  this.$messageContainer = document.querySelector(".message-container");
  this.$message = document.querySelector(".message");
  this.$inputBox = document.querySelector(".input-box");
  this.$excuteButton = document.querySelector(".excute-button");
  this.$menuOptions = document.querySelector(".menu-options");
  this.$bubbleRadio = document.querySelector("#bubble");
  this.$quickRadio = document.querySelector("#quick");
  this.$graphContainer = document.querySelector(".graph-container");
}

QuickView.prototype = Object.create(BubbleView.prototype);
QuickView.prototype.constructor = QuickView;

// QuickView.prototype.paintMessage = function (message, delay) {
//   this.$message.textContent = message;

//   if (delay !== undefined) {
//     setTimeout(() => this.$message.textContent = "", delay);
//   }
// };
