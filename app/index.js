export { $body, $header, $h1, $warningSign, $form, $select, $input, $section }

import "../assets/styles/index.less";
import { changeStringToNumbers, bubbleSort, checkNotNumber, makeChildElementsOfScreen, findLargestNumber } from "./controller";
import { setOnScreen, showOnlyNumberSign, showCountLimitSign, showNotDevelopedSortingAlgorithm } from "./view";

const $body = document.querySelector("body");
const $header = $body.querySelector("header");
const $h1 = $header.querySelector("h1");
const $warningSign = $header.querySelector("p");
const $form = $header.querySelector("form");
const $select = $form.querySelector("select");
const $input = $form.querySelector("input");
const $section = $body.querySelector("section");

const childElementsOfScreen = [];

function handleFormSubmit(event) {
  event.preventDefault();
  $warningSign.textContent = "";

  const userInputValue = $input.value;
  $input.value = "";

  if ($select.selectedIndex === 1) {
    return showNotDevelopedSortingAlgorithm();
  }

  const numbers = changeStringToNumbers(userInputValue);

  if (checkNotNumber(numbers)) {
    return showOnlyNumberSign();
  }

  if (!numbers.length || numbers.length < 5 || numbers.length > 10) {
    return showCountLimitSign();
  }

  const largestNumber = findLargestNumber(numbers);

  const main = document.createElement("main");

  for (let i = 0; i < numbers.length; i++) {
    const childElement = makeChildElementsOfScreen(numbers[i], largestNumber)
    childElementsOfScreen.push(childElement);
    main.appendChild(childElement);
  }

  setOnScreen(main);
  bubbleSort(numbers, childElementsOfScreen);
}

function init() {
  $form.addEventListener("submit", handleFormSubmit);
}

init();
