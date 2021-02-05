import bubbleSort from "../model/bubble-sort";
import { inputDatas } from "../model/user-input-data";

const { numbers } = inputDatas;

export function handleClickMergeButton() {
  nodes.forEach(e => {
    e.classList.add("mergeChart");
    e.style.height = "100px";
    e.style.width = "100px";
  });

  mergeAnimation();
  mergeSort(numbers);
}

export function handleClickBubbleButton() {
  bubbleSort(numbers);
}
