
const canvas = document.querySelector(".sorting-canvas");
const numberInput = document.querySelector(".number-input");
const alretBox = document.querySelector(".alert-box");
const bubbleButton = document.querySelector(".bubble-sort-button");
const mergeButton = document.querySelector(".merge-sort-button");

export default function getMyElements() {
  return {
    canvas,
    numberInput,
    alretBox,
    bubbleButton,
    mergeButton,
  }
}
