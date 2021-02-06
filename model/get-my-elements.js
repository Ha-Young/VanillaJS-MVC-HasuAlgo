const sortingBoard = document.querySelector(".sorting-borad");
const numberInput = document.querySelector(".number-input");
const alretBox = document.querySelector(".alert-box");
const bubbleButton = document.querySelector(".bubble-sort-button");
const mergeButton = document.querySelector(".merge-sort-button");
const numberInputContainer = document.querySelector(".numbers-container");

export default function getMyElements() {
  return {
    sortingBoard,
    numberInput,
    alretBox,
    bubbleButton,
    mergeButton,
    numberInputContainer,
  };
}
