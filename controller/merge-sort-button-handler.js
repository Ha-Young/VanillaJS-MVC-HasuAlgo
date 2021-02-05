import bubbleSort from "../model/bubble-sort";
import { nodes, numbers } from "../model/user-input-data";

export function handleClickMerge() {
  nodes.forEach(e => {
    e.classList.add("mergeChart");
    e.style.height = "100px";
    e.style.width = "100px";
  });

  mergeAnimation();
  mergeSort(numbers);
}

export function handleClickBubble() {
  bubbleSort(canvas, numbers, boxes);
}