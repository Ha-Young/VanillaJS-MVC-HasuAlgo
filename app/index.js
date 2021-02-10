export { body, header, h1, warningSign, form, select, input, section, main }

import "../assets/styles/index.less";
import { changeStringToNumbers, bubbleSort, checkNotNumber, makeChildElementsOfScreen } from "./controller";
import { setOnScreen, showWarningSign } from "./view";
import { warningMessage } from "./constants/message";

const body = document.querySelector("body");
const header = body.querySelector("header");
const h1 = header.querySelector("h1");
const warningSign = header.querySelector("p");
const form = header.querySelector("form");
const select = form.querySelector("select");
const input = form.querySelector("input");
const section = body.querySelector("section");
const main = section.querySelector("main");

const childElementsOfScreen = [];

function implementSortingAlgorithmsOnScreen(event) {
  event.preventDefault();
  warningSign.textContent = "";

  const userInputValue = input.value;
  input.value = "";

  if (select.selectedIndex === 1) {
    alert(warningMessage.NOT_DEVELOPED_INSERTION);
    return;
  }

  const numbers = changeStringToNumbers(userInputValue);

  if (checkNotNumber(numbers)) {
    return showWarningSign();
  }

  if (!numbers.length || numbers.length < 5 || numbers.length > 10) {
    return showWarningSign();
  }

  for (let i = 0; i < numbers.length; i++) {
    const childElement = makeChildElementsOfScreen(numbers[i])
    childElementsOfScreen.push(childElement);
    setOnScreen(childElement);
  }

  bubbleSort(numbers, childElementsOfScreen);
}

function init() {
  form.addEventListener("submit", implementSortingAlgorithmsOnScreen);
}

init();
