import bubbleSort from "../model/bubble-sort";
import mergeSort from "../model/merge-sort";
import { inputDatas } from "../model/user-input-data";
import { alretBox, startForm } from "../view/add-event-listeners";
import changePipeToClouds from "../view/change-pipe-to-clouds";
import visibilityToggler from "../view/visibility";

const { numbers } = inputDatas;

export function checkValidationForSort() {
  if (inputDatas.numbers.length < 5) {
    alretBox.textContent = "MIN: 5 numbers";
    return false;
  }
  return true;
}

export function handleClickMergeButton() {
  if (!checkValidationForSort()) {
    return;
  }
  visibilityToggler(startForm);
  changePipeToClouds();
  mergeSort(numbers);
}

export function handleClickBubbleButton() {
  if (!checkValidationForSort()) {
    return;
  }
  visibilityToggler(startForm);
  bubbleSort(numbers);
}
