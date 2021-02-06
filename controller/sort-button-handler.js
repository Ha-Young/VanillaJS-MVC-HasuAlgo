import bubbleSort from "../model/bubble-sort";
import mergeSort from "../model/merge-sort";
import { inputDatas } from "../model/user-input-data";
import { alretBox } from "../view/add-event-listeners";
import changeBarToCircle from "../view/change-pipe-to-clouds";

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
  if (inputDatas.numbers.length < 5) {
    alretBox.textContent = "MIN: 5 numbers";
    return;
  }

  bubbleSort(numbers);
}
