import BubbleView from '../bubble_sort/bubble.view.js';

export default function QuickView() {
  this.$graphs = document.querySelector(".graphs");
  this.$messageContainer = document.querySelector(".message-container");
  this.$message = document.querySelector(".message");
  this.$motion = document.querySelector(".motion");
  this.$inputBox = document.querySelector(".input-box");
  this.$excuteButton = document.querySelector(".excute-button");
  this.$menuOptions = document.querySelector(".menu-options");
  this.$bubbleRadio = document.querySelector("#bubble");
  this.$quickRadio = document.querySelector("#quick");
  this.$graphContainer = document.querySelector(".graph-container");
}

QuickView.prototype = Object.create(BubbleView.prototype);
QuickView.prototype.constructor = QuickView;

QuickView.prototype.paintGraphs = function (data, loopCount, fixedIndices) {
  const maxSize = Math.max(...data);

  this.$graphs.textContent = "";

  data.forEach((item, index) => {
    const newBlock = document.createElement("span");

    newBlock.dataset.index = index + 1;
    newBlock.style.setProperty("height", (item / maxSize) * 90 + "%");

    if (fixedIndices.includes(index)) {
      newBlock.classList.add("fixed");
    }
    // if (index >= data.length - loopCount) {
    //   newBlock.classList.add("fixed");
    // }

    this.$graphs.appendChild(newBlock);
  });
};

// QuickView.prototype.paintMessage = function (message, delay) {
//   this.$message.textContent = message;

//   if (delay !== undefined) {
//     setTimeout(() => this.$message.textContent = "", delay);
//   }
// };
