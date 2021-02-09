export { body, header, h1, warningSign, form, select, input, section, main }

import '../assets/styles/index.less';
import { changeStringToNumbers, bubbleSort, checkNumber, makeChildElementsOfScreen } from './controller';
import { setOnScreen, showWarningSign } from './view';

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

function implementSortingAlgorithmsOnScreen (event) {
  event.preventDefault();
  warningSign.textContent = "";

  const userInputValue = input.value;
  input.value = "";

  if (select.selectedIndex === 1) {
    alert("아직 Insertion Sort는 준비되지 않았습니다.");
    return;
  }

  const numbers = changeStringToNumbers(userInputValue);

  if(!numbers.length || numbers.length < 5 || numbers.length > 10) {
    return showWarningSign();
  }

  if(!checkNumber(numbers)) {
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
