import bubbleSort from "../model/bubble-sort";
import getRandomHexCode from "../model/generate-random-color";
import { nodes, numbers, boxes } from "../model/user-input-data";
import { alretBox, canvas, numberInput } from "../view/event-listeners";

export function handleKeyup(e) {
  const key = e.key;

  if (key !== "Enter") {
    return;
  }

  const inputValue = Number(numberInput.value);

  if (!inputValue) {
    numberInput.value = "";
    alretBox.textContent = "🚨 Numbers Only 🚨";
    return;
  }

  if (inputValue > 115) {
    numberInput.value = "";
    alretBox.textContent = "🚨 Invalid: MAX is 115 🚨";
    return;
  }

  numbers.push(inputValue);
  numberInput.value = "";
  numberInput.placeholder = "";
  alretBox.textContent = "";

  const hexCode = getRandomHexCode();
  const newList = document.createElement("li");

  newList.style.backgroundColor = `#${hexCode}`;
  newList.style.order = numbers.length;
  newList.style.height = `${(inputValue * 5) + 30 + inputValue}px`;
  newList.textContent = inputValue;
  newList.classList.add("canvas-number");
  newList.dataset.value = inputValue;
  nodes.push(newList);
  canvas.appendChild(newList);
}

export function handleClickBubble() {
  bubbleSort(canvas, numbers, boxes);
}

export function handleClickMerge() {
  nodes.forEach(e => {
    e.classList.add("mergeChart");
    e.style.height = "100px";
    e.style.width = "100px";
  });

  mergeAnimation();
  mergeSort(numbers);
}