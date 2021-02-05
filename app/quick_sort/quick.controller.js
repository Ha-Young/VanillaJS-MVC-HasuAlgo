import Controller from '../controller.js';
import QuickModel from './quick.model.js';
import QuickView from './quick.view.js';

export default function QuickController() {
  this.model = new QuickModel();
  this.view = new QuickView();

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
    const dataSet = this.model.getData();
    const fixedIndices = [];

    if (!dataSet) {
      this.view.paintMessage("데이터를 입력하세요.", "", 3000);
      return;
    }

    this.view.paintMessage("정렬 중", " 🏃 🏃 🏃 ");
    this.view.holdInput(true);
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

  if (pivotIndex === rightIndex) {
    fixedIndices.push(from);

    await this.view.paintGraphs(dataSet, fixedIndices, this.wait, DELAY);

    if (dataSet.length - fixedIndices.length === 0) {
      this.finish(dataSet);
      return;
    }
    return;
  }

  await this.view.showPivot(pivotIndex, this.wait, DELAY);

  while (true) {
    const isLeftLargerThenPivot = dataSet[leftIndex] > dataSet[pivotIndex];
    const isRightSmallerThenPivot = dataSet[rightIndex] < dataSet[pivotIndex];

    await this.view.showTarget(leftIndex, rightIndex, this.wait, DELAY);

    if (isLeftLargerThenPivot && isRightSmallerThenPivot) {
      await this.view.swap(leftIndex, rightIndex, this.wait, DELAY);

      this.model.swap(leftIndex, rightIndex);
      leftIndex++;
      rightIndex--;
    } else {
      if (!isLeftLargerThenPivot) {
        leftIndex++;
      }

      if (!isRightSmallerThenPivot) {
        rightIndex--;
      }
    }

    await this.view.paintGraphs(dataSet, fixedIndices, this.wait, DELAY, pivotIndex);

    if (leftIndex > rightIndex) {
      await this.view.swap(pivotIndex, rightIndex, this.wait, DELAY);

      this.model.swap(pivotIndex, rightIndex);
      fixedIndices.push(rightIndex);

      await this.view.paintGraphs(dataSet, fixedIndices, this.wait, DELAY);

      if (rightIndex === pivotIndex) {
        await this.startSort(dataSet, rightIndex + 1, to, fixedIndices);
      } else if (rightIndex === to) {
        await this.startSort(dataSet, pivotIndex, rightIndex - 1, fixedIndices);
      } else {
        await this.startSort(dataSet, pivotIndex, rightIndex - 1, fixedIndices);
        await this.startSort(dataSet, rightIndex + 1, to, fixedIndices);
      }
      return;
    }
  }
};
