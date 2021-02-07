const sortingBoard = document.querySelector(".sorting-borad");
const numberInput = document.querySelector(".number-input");
const alertBox = document.querySelector(".alert-box");
const bubbleButton = document.querySelector(".bubble-sort-button");
const mergeButton = document.querySelector(".merge-sort-button");
const numberInputContainer = document.querySelector(".numbers-container");
const wholeNumberInput = document.querySelector(".input-all-numbers");
const startForm = document.querySelector(".start-form");
const startFormText = document.querySelector(".start-text");
const helpButton = document.querySelector(".help-button");

export default function getMyElements() {
  return {
    sortingBoard,
    numberInput,
    alertBox,
    bubbleButton,
    mergeButton,
    numberInputContainer,
    wholeNumberInput,
    startForm,
    startFormText,
    helpButton,
  };
}
