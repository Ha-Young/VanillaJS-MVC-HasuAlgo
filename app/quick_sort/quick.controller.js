import BubbleController from '../bubble_sort/bubble.controller.js';
import QuickModel from './quick.model.js';
import QuickView from './quick.view.js';

export default function QuickController() {
  this.QuickModel = new QuickModel();
  this.QuickView = new QuickView();

  const $inputCountainer = document.querySelector(".input-container");
  const $excuteButton = document.querySelector(".excute-button");

  $inputCountainer.addEventListener("submit", handleSubmit.bind(this));
  $excuteButton.addEventListener("click", handleClick.bind(this));

  function handleSubmit(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector(".input-box").value;
    const checked = this.checkInput(inputValue);

    if(!checked.isNumber) {
      this.QuickView.paintMessage("입력 데이터를 확인하세요. 5개 ~ 10개 필요."," 😓 ", 3000);
      return;
    }

    this.QuickModel.set(checked.dataSet);
    this.QuickView.paintGraphs(this.QuickModel.get());
  }

  function handleClick() {
    if (!this.QuickModel.get()) {
      this.QuickView.paintMessage("데이터를 입력하세요.", " 🤲 ", 3000);
      return;
    }

    this.QuickView.paintMessage("정렬 중", " 🏃 🏃 🏃 ");
    this.QuickView.holdInput(true);
    this.startSort();
  }
}

QuickController.prototype = Object.create(BubbleController.prototype);
QuickController.prototype.construcor = QuickController;

QuickController.prototype.startSort = function () {

};
