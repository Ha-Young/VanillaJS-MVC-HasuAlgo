export default function BubbleView() {
  this.$graphs = document.querySelector(".graphs");
  this.$messageContainer = document.querySelector(".message-container");
  this.$message = document.querySelector(".message");
  this.$inputBox = document.querySelector(".input-box");
  this.$excuteButton = document.querySelector(".excute-button");
}

BubbleView.prototype.paintMessage = function (message, delay) {
  this.$message.textContent = message;

  if (delay !== undefined) {
    setTimeout(() => this.$message.textContent = "", delay);
  }
};

BubbleView.prototype.paintGraphs = function (data, loopCount) {
  const maxSize = data.reduce((acc, item) => {
    return acc > item ? acc : item;
  });

  this.$graphs.textContent = "";

  data.forEach((item, index) => {
    const newBlock = document.createElement("span");

    newBlock.dataset.index = index + 1;
    newBlock.style.setProperty("height", (item / maxSize) * 90 + "%");

    if (index >= data.length - loopCount) {
      newBlock.classList.add("fixed");
    }

    this.$graphs.appendChild(newBlock);
  });
};

BubbleView.prototype.showTarget = function (left, right) {
  this.$graphs.children[left].classList.add("target");
  this.$graphs.children[right].classList.add("target");
};

BubbleView.prototype.swap = function (left, right) {
  this.$graphs.children[left].classList.add("moveToRight");
  this.$graphs.children[right].classList.add("moveToLeft");
};

BubbleView.prototype.holdInput = function (sholdHold) {
  if (sholdHold) {
    this.$inputBox.disabled = true;
    this.$excuteButton.disabled = true;
    this.$excuteButton.classList.add("fixed");
  } else {
    this.$inputBox.disabled = false;
    this.$excuteButton.disabled = false;
    this.$excuteButton.classList.remove("fixed");
  }
};

// BubbleView.prototype.done = function () {
//   setTimeout(() => {
//     this.$graphs.classList.add("done");
//   }, 3000);
// };
