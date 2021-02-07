import { inputDatas } from "../model/user-input-data";
import { sortingBoard } from "./add-event-listeners";
import stopMarioMoving from "./stop-mario-moving";

const { numbers, nodes } = inputDatas;

export default function createNewNumberPipe(inputValue) {
  stopMarioMoving();
  const newNumberBar = document.createElement("div");
  const HEIGHT_LIMIT = 500;
  const HEIGHT_MIN = 30;
  const newHeight = inputValue * 5 + HEIGHT_MIN;

  newNumberBar.style.order = numbers.length;
  newNumberBar.style.height = `${newHeight < HEIGHT_LIMIT ? newHeight : HEIGHT_LIMIT}px`;
  newNumberBar.classList.add("pipe");
  
  const numberTextBox = document.createElement("div");
  numberTextBox.textContent = inputValue;
  numberTextBox.classList.add("numberTextBox");
  
  newNumberBar.appendChild(numberTextBox);
  newNumberBar.dataset.value = inputValue;
  sortingBoard.appendChild(newNumberBar);
  nodes.push(newNumberBar);
}
