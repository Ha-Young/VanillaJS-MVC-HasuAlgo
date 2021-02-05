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

  const newList = document.createElement("div");

  newList.style.order = numbers.length;
  newList.style.height = `${(inputValue * 5) + 30 + inputValue}px`;
  newList.classList.add("pipe");
  const numberBox = document.createElement("div");
  numberBox.textContent = inputValue;
  numberBox.classList.add("numberBox");
  newList.appendChild(numberBox);
  newList.dataset.value = inputValue;
  nodes.push(newList);
  canvas.appendChild(newList);
}