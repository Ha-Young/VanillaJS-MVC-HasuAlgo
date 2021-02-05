import { handleKeyup } from "../controller/input-number-handler";
import { handleClickBubble, handleClickMerge } from "../controller/merge-sort-button-handler";

const bubbleButton = document.querySelector(".bubble-sort-button");
const mergeButton = document.querySelector(".merge-sort-button");

export let canvas = document.querySelector(".sorting-canvas");
export let numberInput = document.querySelector(".number-input");
export let alretBox = document.querySelector(".alert-box");

export function addEventListeners() {
  numberInput.addEventListener("keyup", handleKeyup);
  bubbleButton.addEventListener("click", handleClickBubble);
  mergeButton.addEventListener("click", handleClickMerge);
}
