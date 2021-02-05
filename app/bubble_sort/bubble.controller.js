import Controller from '../controller.js';
import BubbleModel from './bubble.model.js';
import BubbleView from './bubble.view.js';

export default function BubbleController() {
  this.model = new BubbleModel();
  this.view = new BubbleView();

  const $inputCountainer = document.querySelector(".input-container");
  const $excuteButton = document.querySelector(".excute-button");

  $inputCountainer.addEventListener("submit", handleSubmit.bind(this));
  $excuteButton.addEventListener("click", handleClick.bind(this));

  function handleSubmit(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector(".input-box").value;
    const checked = this.checkInput(inputValue);

    if(!checked.isNumber) {
      this.view.paintMessage("입력 데이터를 확인하세요. 5개 ~ 10개 필요.","", 3000);
      return;
    }

    this.model.setData(checked.dataSet);
    this.view.paintGraphs(this.model.getData());
  }

  function handleClick() {
    if (!this.model.getData()) {
      this.view.paintMessage("데이터를 입력하세요.", "", 3000);
      return;
    }

    this.view.paintMessage("정렬 중", " 🏃 🏃 🏃 ");
    this.view.holdInput(true);
    this.startSort(this.model.getData());
  }
}

BubbleController.prototype = Object.create(Controller.prototype);
BubbleController.prototype.constructor = BubbleController;

BubbleController.prototype.startSort = async function (dataSet) {
  const DELAY = 500;
  const status = { index: 0, isSwaped: false , fixedIndices: [] };

  while (true) {
    await this.view.showTarget(status.index, status.index + 1, this.wait, DELAY);

    if (dataSet[status.index] > dataSet[status.index + 1]) {
      await this.view.swap(status.index, status.index + 1, this.wait, DELAY);
      this.model.swap(status.index, status.index + 1);
      status.isSwaped = true;
    }

    await this.view.paintGraphs(dataSet, status.fixedIndices, this.wait, DELAY);
    status.index++;

    const isEndOfLoop = status.index === (dataSet.length - status.fixedIndices.length - 1);

    if (isEndOfLoop) {
      status.fixedIndices.push(status.index);

      const isSortedAll = (dataSet.length - status.fixedIndices.length) === 1;

      if (!status.isSwaped || isSortedAll) {
        this.finish(dataSet);
        return;
      }

      await this.view.paintGraphs(dataSet, status.fixedIndices, this.wait, DELAY);

      status.index = 0;
      status.isSwaped = false;
    }
  }
};
