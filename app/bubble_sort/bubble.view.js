export default function BubbleView() {
  this.graphContainer = document.querySelector(".graph-container");
}

BubbleView.prototype.render = function (data) {
  data.forEach((item, index) => {
    const newBlock = document.createElement("span");

    newBlock.dataset.index = index + 1;
    newBlock.style.setProperty("height", item * 10 + "px");
    newBlock.style.setProperty("left", newBlock.dataset.index * 40 + "px");

    this.graphContainer.appendChild(newBlock);
  });
};