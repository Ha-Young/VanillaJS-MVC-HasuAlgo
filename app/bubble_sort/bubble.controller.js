import BubbleModel from './bubble.model.js';
import BubbleView from './bubble.view.js';

export default function BubbleController() {
  this.BubbleModel = new BubbleModel();
  this.BubbleView = new BubbleView();

  const $inputCountainer = document.querySelector(".input-container");
  const $excuteButton = document.querySelector(".excute-button");

  $inputCountainer.addEventListener("submit", handleSubmit.bind(this));
  $excuteButton.addEventListener("click", handleClick.bind(this));

  function handleSubmit(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector(".input-box").value;
    const checked = this.checkInput(inputValue);

    if(!checked.isNumber) {
      this.BubbleView.paintMessage("입력 데이터를 확인하세요. 5개 ~ 10개 필요.", 3000);
      return;
    }

    this.BubbleModel.set(checked.dataSet);
    this.BubbleView.paintGraphs(this.BubbleModel.get());
  }

  function handleClick(event) {
    if (!this.BubbleModel.get()) {
      this.BubbleView.paintMessage("데이터를 입력하세요.", 3000);
      return;
    }

    this.BubbleView.paintMessage("정렬 중 🏃");
    this.BubbleView.holdInput(true);
    this.startSort();
  }
}

BubbleController.prototype.checkInput = function (inputValue) {
  const trimed = inputValue.replace(/(\s*)/g, "");
  const splited = trimed.split(",");
  const hasFiveToTenInputs = (5 <= splited.length && splited.length <= 10);
  const hasString = trimed.match(/[^0-9,]/g);
  const hasEmpty = splited.some((item) => item === "");

  return (hasString || hasEmpty || !hasFiveToTenInputs)
    ? {isNumber: false, dataSet: null}
    : {isNumber: true, dataSet: splited};
};

BubbleController.prototype.startSort = function () {
  const DELAY = 1000;
  const dataSet = this.BubbleModel.get();
  const done = dataSet.length;
  const status = {
    index: 0,
    loopCount: 0,
    isSwaped: false
  };

  setTimeout(showTarget.bind(this), DELAY);

  function showTarget() {
    const isEndOfIndex = status.index >= dataSet.length - status.loopCount - 1;

    if (isEndOfIndex) {
      viewSwap.call(this);
      return;
    }

    this.BubbleView.showTarget(status.index, status.index + 1);
    setTimeout(viewSwap.bind(this), DELAY);
  }

  function viewSwap() {
    const isEndOfIndex = status.index >= dataSet.length - status.loopCount - 1;
    const shouldSwap = dataSet[status.index] > dataSet[status.index + 1];

    if (isEndOfIndex || !shouldSwap) {
      modelSwap.call(this);
      return;
    }

    this.BubbleView.swap(status.index, status.index + 1);
    setTimeout(modelSwap.bind(this), DELAY);
  }

  function modelSwap() {
    if (dataSet[status.index] > dataSet[status.index + 1]) {
      this.BubbleModel.swap(status.index, status.index + 1);

      status.isSwaped = true;
    }
    status.index++;

    if (status.index === dataSet.length - status.loopCount) {
      if (!status.isSwaped) {
        this.BubbleView.paintGraphs(dataSet, done);
        this.BubbleView.holdInput(false);
        this.BubbleView.paintMessage("정렬 끄읕 🤸‍♀️", 3000);
        // this.BubbleView.done(); // zz
        return;
      }

      status.index = 0;
      status.loopCount++;
      status.isSwaped = false;
    }

    this.BubbleView.paintGraphs(dataSet, status.loopCount);
    setTimeout(showTarget.bind(this), DELAY);
  }
};
