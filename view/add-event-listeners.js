import handleKeyup from "../controller/input-keyup-handler";
import { handleClickBubbleButton, handleClickMergeButton } from "../controller/sort-button-handler";
import getMyElements from "../model/get-my-elements";

const myElements = getMyElements();

export const {
  sortingBoard,
  numberInput,
  alretBox,
  bubbleButton,
  mergeButton,
  wholeNumberInput,
  startForm,
  startFormText,
} = myElements;

export function addEventListeners() {
  numberInput.addEventListener("keyup", handleKeyup);
  wholeNumberInput.addEventListener("keyup", handleKeyup);
  bubbleButton.addEventListener("click", handleClickBubbleButton);
  mergeButton.addEventListener("click", handleClickMergeButton);
}
