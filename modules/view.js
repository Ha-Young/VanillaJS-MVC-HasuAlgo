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

  generateBlocks(height, number, index) {
    const $block = document.createElement("div");
    $block.classList.add("number-block");
    $block.classList.add("normal");
    $block.style.height = `${height}px`;
    $block.id = `block${number}`;
    $block.style.transform = `translateX(${index * 40}px`;

    const $blockLabel = document.createElement("label");
    $blockLabel.classList.add("block-label");
    $blockLabel.innerText = number;
    this.$parent.appendChild($block);
  }

  swapBlocks(i, j) {
    return new Promise((resolve, reject) => {
      const $blockI = document.querySelector(`#block${i}`);
      const $blockJ = document.querySelector(`#block${j}`);
      const transformI = getComputedStyle($blockI).getPropertyValue("transform");
      const transformJ = getComputedStyle($blockJ).getPropertyValue("transform");
      $blockI.style.transform = transformJ;
      $blockJ.style.transform = transformI;
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.$parent.insertBefore($blockJ, $blockI);
          resolve();
        }, 1000);
      });
    });
  }

  changeColor(i) {
    const $block = document.querySelectorAll(".number-block")[i];
    ($block.classList.contains("picked")) ? $block.classList.remove("picked") : $block.classList.add("picked");
  }

  cleanBlocks() {
    for (const $block of this.$blocks) {
      if ($block.classList.contains("picked")) {
        $block.classList.remove("picked");
      }
    }
  }
}