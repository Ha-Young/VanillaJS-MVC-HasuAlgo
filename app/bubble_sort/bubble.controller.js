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

  function handleClick() {
    if (!this.BubbleModel.get()) {
      this.BubbleView.paintMessage("데이터를 입력하세요.", 3000);
      return;
    }

    this.BubbleView.paintMessage("정렬 중 🏃");
    this.BubbleView.holdInput(true);
    this.startSort();
  }
}

BubbleController.prototype.clear = function () {
  const $inputCountainer = document.querySelector(".input-container");
  const $excuteButton = document.querySelector(".excute-button");
  const inputClone = $inputCountainer.cloneNode(true);
  const buttonClone = $excuteButton.cloneNode(true);

  $inputCountainer.parentNode.replaceChild(inputClone, $inputCountainer);
  $excuteButton.parentNode.replaceChild(buttonClone, $excuteButton);
};

BubbleController.prototype.checkInput = function (inputValue) {
  const trimed = inputValue.replace(/(\s*)/g, "");
  const splited = trimed.split(",");
  const hasFiveToTenLength = (5 <= splited.length && splited.length <= 10);
  const hasNumberOnly = !trimed.match(/[^0-9,]/g);
  const hasEmpty = splited.some((item) => item === "");
  const result = splited.map((item) => Number(item));

  return (hasEmpty || !hasNumberOnly || !hasFiveToTenLength)
    ? {isNumber: false, dataSet: null}
    : {isNumber: true, dataSet: result};
};

BubbleController.prototype.startSort = async function () {
  const DELAY = 700;
  const dataSet = this.BubbleModel.get();
  const status = {
    loopCount: 0,
    isSwaped: false
  };

  const showTarget = (index) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.BubbleView.showTarget(index, index + 1);
        resolve();
      }, DELAY);
    });
  };

  const viewSwap = (index) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.BubbleView.swap(index, index + 1);
        resolve();
      }, DELAY);
    })
  };

  const paintGraphs = (dataSet, loopCount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.BubbleView.paintGraphs(dataSet, loopCount);
        resolve();
      }, DELAY);
    });
  }

  for (let index = 0; index < dataSet.length - status.loopCount; index++){
    const isEndOfLoop = index === (dataSet.length - status.loopCount - 2);

    await showTarget(index);

    if (dataSet[index] > dataSet[index + 1]) {
      await viewSwap(index);

      this.BubbleModel.swap(index, index + 1);
      status.isSwaped = true;
    }

    await paintGraphs(dataSet, status.loopCount);

    if (isEndOfLoop) {
      status.loopCount++;

      const isSortedAll = (dataSet.length - status.loopCount) === 1;

      if (!status.isSwaped || isSortedAll) {
        await paintGraphs(dataSet, dataSet.length);

        this.BubbleView.holdInput(false);
        this.BubbleView.paintMessage("정렬 끄읕 🤸‍♀️", 3000);
        return;
      }

      await paintGraphs(dataSet, status.loopCount);

      index = -1;
      status.isSwaped = false;
    }
  }
};
