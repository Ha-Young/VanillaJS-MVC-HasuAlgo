import BubbleModel from './bubble.model.js';
import BubbleView from './bubble.view.js';

export default function BubbleController() {
  this.BubbleModel = new BubbleModel();
  this.BubbleView = new BubbleView();

  const $inputCountainer = document.querySelector(".input-container");
  // const $inputButton = document.querySelector(".input-button");
  const $excuteButton = document.querySelector(".excute-button");
  const $inputBox = document.querySelector(".input-box");

  $inputCountainer.addEventListener("submit", (event) => {
    this.pushData(event);
    this.print(this.BubbleModel.get());

    console.log("submit");
  });

  $excuteButton.addEventListener("click", (event) => {
    if (!this.BubbleModel.get()) {
      // data를 입력하시오.
      return;
    }

    this.sort();
  });

  // $inputBox.addEventListener("submit", (event) => this.pushData(event));
}

BubbleController.prototype.sort = function () {
  console.log("excute")
};

BubbleController.prototype.pushData = function (event) {
  event.preventDefault();
  this.BubbleModel.set(event.target.children[0].value);
}

BubbleController.prototype.print = function (data) {
  this.BubbleView.render(data);
};