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
      this.BubbleView.paintMessage("입력 데이터를 확인하세요. 5개 ~ 10개 필요."," 😓 ", 3000);
      return;
    }

    this.BubbleModel.setData(checked.dataSet);
    this.BubbleView.paintGraphs(this.BubbleModel.getData());
  }

  function handleClick() {
    if (!this.BubbleModel.getData()) {
      this.BubbleView.paintMessage("데이터를 입력하세요.", " 🤲 ", 3000);
      return;
    }

    this.BubbleView.paintMessage("정렬 중", " 🏃 🏃 🏃 ");
    this.BubbleView.holdInput(true);
    this.startSort(this.BubbleModel.getData());
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

BubbleController.prototype.startSort = async function (dataSet) {
  const DELAY = 500;
  const status = { index: 0, isSwaped: false , fixedIndices: [] };

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

  const paintGraphs = (dataSet, fixedIndices) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.BubbleView.paintGraphs(dataSet, fixedIndices);
        resolve();
      }, DELAY);
    });
  };

  while (true) {
    await showTarget(status.index);

    if (dataSet[status.index] > dataSet[status.index + 1]) {
      await viewSwap(status.index);

      this.BubbleModel.swap(status.index, status.index + 1);
      status.isSwaped = true;
    }

    await paintGraphs(dataSet, status.fixedIndices);

    status.index++;

    const isEndOfLoop = status.index === (dataSet.length - status.fixedIndices.length - 1);

    if (isEndOfLoop) {
      status.fixedIndices.push(status.index);

      const isSortedAll = (dataSet.length - status.fixedIndices.length) === 1;

      if (!status.isSwaped || isSortedAll) {
        await paintGraphs(dataSet, "done");

        this.BubbleView.holdInput(false);
        this.BubbleView.paintMessage("정렬 끄읕", " 🤸‍♀️ ", 3000);
        return;
      }

      await paintGraphs(dataSet, status.fixedIndices);

      status.index = 0;
      status.isSwaped = false;
    }
  }
};
