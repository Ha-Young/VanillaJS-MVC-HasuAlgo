import { inputDatas } from "../model/user-input-data";
import { canvas } from "./add-event-listeners";

const { numbers } = inputDatas;

export default function createNewNumberBar(inputValue) {
  const newNumberBar = document.createElement("div");

  newNumberBar.style.order = numbers.length;
  newNumberBar.style.height = `${(inputValue * 4) + 30 + inputValue}px`;
  newNumberBar.classList.add("pipe");
  
  const numberTextBox = document.createElement("div");
  numberTextBox.textContent = inputValue;
  numberTextBox.classList.add("numberTextBox");
  
  newNumberBar.appendChild(numberTextBox);
  newNumberBar.dataset.value = inputValue;
  canvas.appendChild(newNumberBar);
}
