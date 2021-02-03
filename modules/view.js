export default class View {
  "use strict";

  /**
   * @param {!Template} template A Template instance
   */
  constructor(template, parent) {
    this.template = template;
    this.$parent = parent;
    this.$blocks = null;
  }

  wait(t) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, t);
    })
  }

  generateBlocks(height, number, index) {
    const $block = document.createElement("div");
    $block.classList.add("number-block");
    $block.classList.add("normal");
    $block.style.height = `${height}px`;
    //$block.id = `block${index}`;
    $block.style.transform = `translateX(${index * 40}px`;

    const $blockNumber = document.createElement("span");
    $blockNumber.classList.add("block-span");
    $blockNumber.innerText = number;
    $block.appendChild($blockNumber);
    this.$parent.appendChild($block);
  }

  swapBlocks(i, j) {
    return new Promise((resolve, reject) => {
      const $blockI = document.querySelectorAll('.number-block')[i];//(`#block${i}`);
      const $blockJ = document.querySelectorAll('.number-block')[j];//(`#block${j}`);
      const transformI = getComputedStyle($blockI).getPropertyValue("transform");
      const transformJ = getComputedStyle($blockJ).getPropertyValue("transform");
      $blockI.style.transform = transformJ;
      $blockJ.style.transform = transformI;

      setTimeout(() => {
        this.$parent.insertBefore($blockJ, $blockI);
        resolve();
      }, 1000);
    });
  }

  changeColor(i, blockState = "picked") {
    const $block = document.querySelectorAll('.number-block')[i];//(`#block${i}`);
    $block.classList.add(blockState);
  }

  removeColor(i) {
    const $block = document.querySelectorAll('.number-block')[i];//(`#block${i}`);
    $block.classList.remove("picked");
  }

  clearContent() {
    while (this.$parent.lastElementChild) {
      this.$parent.removeChild(this.$parent.lastElementChild);
    }
  }
}
