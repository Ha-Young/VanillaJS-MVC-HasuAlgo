// Load application styles
import '../assets/styles/index.less';
import { changeStringToNumbers, bubbleSort, checkNumber } from './controller';
import { paintDiv, showWarning } from './view';

// ================================
// START YOUR APP HERE
// ================================

const header = document.querySelector("header");
const warningSpace = header.querySelector("p");
const form = document.querySelector(".js-form");
const select = form.querySelector("select");
const input = form.querySelector("input");

const domArray = [];

function getinputValue (event) {
  event.preventDefault();
  warningSpace.textContent = "";

  const currentinputValue = input.value;
  input.value = "";

  if (select.selectedIndex === 1) {
    alert("아직 Insertion Sort는 준비되지 않았습니다.");
    return;
  }

  const numbers = changeStringToNumbers(currentinputValue);

  if(!numbers.length || numbers.length < 5 || numbers.length > 10) {
    return showWarning();
  }

  if(!checkNumber(numbers)) {
    return showWarning();
  }

  for (let i = 0; i < numbers.length; i++) {
    domArray.push(paintDiv(numbers[i], i));
  }

  bubbleSort(numbers, domArray);
}

function init() {
  form.addEventListener("submit", getinputValue);
}

init();
