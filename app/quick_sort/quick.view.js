import View from "../view.js";

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

QuickView.prototype = Object.create(View.prototype);
QuickView.prototype.constructor = QuickView;

async function identity() {};
QuickView.prototype.showPivot = async function (index, wait = identity, DELAY) {
  this.$graphs.children[index].classList.add("pivot");

  await wait(DELAY);
};

QuickView.prototype.swap = async function (left, right, wait = identity, DELAY) {
  const distance = right - left;

  this.$graphs.children[left].style.transform = `translateX(${distance * 30}px) rotate(0.5turn)`;
  this.$graphs.children[right].style.transform = `translateX(-${distance * 30}px) rotate(-0.5turn)`;

  await wait(DELAY);
};

QuickView.prototype.paintGraphs = async function (data, fixedIndices = [], wait = identity, DELAY, pivotIndex) {
  const maxSize = Math.max(...data);

  this.$graphs.textContent = "";

  data.forEach((item, index) => {
    const newBlock = document.createElement("span");

    newBlock.dataset.index = index + 1;
    newBlock.style.setProperty("height", (item / maxSize) * 90 + "%");

    if (pivotIndex === index) {
      newBlock.classList.add("pivot");
    }

    if (fixedIndices.includes(index) || fixedIndices === "DONE") {
      newBlock.classList.add("fixed");
    }

    this.$graphs.appendChild(newBlock);
  });

  await wait(DELAY);
};
