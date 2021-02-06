import { inputDatas } from "../model/user-input-data";
import { sortingBoard } from "./add-event-listeners";
import stopMarioMoving from "./stop-mario-moving";

const { numbers, nodes } = inputDatas;

export default function createNewNumberBar(inputValue) {
  stopMarioMoving();
  const newNumberBar = document.createElement("div");

  newNumberBar.style.order = numbers.length;
  newNumberBar.style.height = `${(inputValue * 4) + 30 + inputValue}px`;
  newNumberBar.classList.add("pipe");
  
  const numberTextBox = document.createElement("div");
  numberTextBox.textContent = inputValue;
  numberTextBox.classList.add("numberTextBox");
  
  newNumberBar.appendChild(numberTextBox);
  newNumberBar.dataset.value = inputValue;
  sortingBoard.appendChild(newNumberBar);
  nodes.push(newNumberBar);
}
