import Controller from '../controller.js';
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
      this.QuickView.paintMessage("입력 데이터를 확인하세요. 5개 ~ 10개 필요.","", 3000);
      return;
    }

    this.QuickModel.setData(checked.dataSet);
    this.QuickView.paintGraphs(this.QuickModel.getData());
  }

  function handleClick() {
    const dataSet = this.QuickModel.getData();
    const fixedIndices = [];

    if (!dataSet) {
      this.QuickView.paintMessage("데이터를 입력하세요.", "", 3000);
      return;
    }

    this.QuickView.paintMessage("정렬 중", " 🏃 🏃 🏃 ");
    this.QuickView.holdInput(true);
    this.startSort(dataSet, 0, dataSet.length - 1, fixedIndices);
  }
}

QuickController.prototype = Object.create(Controller.prototype);
QuickController.prototype.construcor = QuickController;

QuickController.prototype.startSort = async function (dataSet, from, to, fixedIndices) {
  const DELAY = 500;
  const pivotIndex = from;
  let leftIndex = from + 1;
  let rightIndex = to;

  const showPivot = (index) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.QuickView.showPivot(index);
        resolve();
      }, DELAY);
    });
  };

  const showTarget = (left, right) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.QuickView.showTarget(left, right);
        resolve();
      }, DELAY);
    });
  };

  const viewSwap = (left, right) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.QuickView.swap(left, right);
        resolve();
      }, DELAY);
    })
  };

  const paintGraphs = (dataSet, fixedIndices, pivotIndex) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.QuickView.paintGraphs(dataSet, fixedIndices, pivotIndex);
        resolve();
      }, DELAY);
    });
  }

  if (pivotIndex >= rightIndex) {
    fixedIndices.push(from);
    await paintGraphs(dataSet, fixedIndices);

    if (dataSet.length - fixedIndices.length === 0) {
      await paintGraphs(dataSet, "done");

      this.QuickView.holdInput(false);
      this.QuickView.paintMessage("정렬 끄읕", " 🤸‍♀️ ", 3000);
      return;
    }
    return;
  }

  await showPivot(pivotIndex);

  while (true) {
    await showTarget(leftIndex, rightIndex);

    if (dataSet[leftIndex] > dataSet[pivotIndex] && dataSet[rightIndex] < dataSet[pivotIndex]) {
      await viewSwap(leftIndex, rightIndex);

      this.QuickModel.swap(leftIndex, rightIndex);
      leftIndex++;
      rightIndex--;
    } else {
      if (dataSet[leftIndex] <= dataSet[pivotIndex]) {
        leftIndex++;
      }

      if (dataSet[rightIndex] >= dataSet[pivotIndex]) {
        rightIndex--;
      }
    }

    await paintGraphs(dataSet, fixedIndices, pivotIndex);

    if (leftIndex > rightIndex) {
      await viewSwap(pivotIndex, rightIndex);

      this.QuickModel.swap(pivotIndex, rightIndex);
      fixedIndices.push(rightIndex);

      await paintGraphs(dataSet, fixedIndices);

      if (dataSet.length - fixedIndices.length <= 1) {
        await paintGraphs(dataSet, "done");

        this.QuickView.holdInput(false);
        this.QuickView.paintMessage("정렬 끄읕", " 🤸‍♀️ ", 3000);
        return;
      }

      if (leftIndex === from) {
        await this.startSort(dataSet, rightIndex + 1, to, fixedIndices);
        return;
      }

      if (rightIndex === to) {
        await this.startSort(dataSet, pivotIndex, rightIndex - 1, fixedIndices);
        return;
      };

      await this.startSort(dataSet, pivotIndex, rightIndex - 1, fixedIndices);
      await this.startSort(dataSet, rightIndex + 1, to, fixedIndices);
      return;
    }
  }
};
