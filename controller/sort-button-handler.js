import bubbleSort from "../model/bubble-sort";
import mergeSort from "../model/merge-sort";
import { inputDatas } from "../model/user-input-data";
import changeBarToCircle from "../view/change-bar-to-circle";

const { numbers, nodes } = inputDatas;

export function handleClickMergeButton() {
  nodes.forEach(e => {
    e.classList.add("mergeChart");
    e.style.height = "100px";
    e.style.width = "100px";
  });

  changeBarToCircle();
  mergeSort(numbers);
}

export function handleClickBubbleButton() {
  bubbleSort(numbers);
}
