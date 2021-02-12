import { resetWarningSign, resetInputValue, viewUserInput, showNotDevelopedSortingAlgorithm, showOnlyNumberSign, showCountLimitSign,  turnOnLigthsOfSelectedElements, swapFrontElementAndBackElement, turnOffLigthsOfSelectedElements, turnOnAllChildElementsOfScreen, showNameOfSortingAlgorithm } from "./view";
import { $select, $input } from "./view";

export function controlUserInput() {
  const userInputValue = getUserInputValue();
  const numbers = changeStringToNumbers(userInputValue);
  const childElementsOfScreen = [];

  resetWarningSign();
  resetInputValue();

  if ($select.selectedIndex === 1) {
    return showNotDevelopedSortingAlgorithm();
  }

  if (!verifyNumbers(numbers)) {
    return;
  };

  const $main = document.createElement("main");
  const largestNumber = findLargestNumber(numbers);

  for (let i = 0; i < numbers.length; i++) {
    const childElement = makeChildElementsOfScreen(numbers[i], largestNumber)
    childElementsOfScreen.push(childElement);
    $main.appendChild(childElement);
  }

  viewUserInput($main, numbers, childElementsOfScreen);
}

function getUserInputValue() {
  return $input.value;
}

function verifyNumbers(numbers) {
  if (checkNotNumber(numbers)) {
    return showOnlyNumberSign();
  }

  if (!numbers.length || numbers.length < 5 || numbers.length > 10) {
    return showCountLimitSign();
  }

  return numbers;
}

function changeStringToNumbers(string) {
  return string.split(",").map(item => parseInt(item));
}

function checkNotNumber(numbers) {
  return numbers.some(number => isNaN(number));
}

function findLargestNumber(numbers) {
  return Math.max(...numbers);
}

function makeChildElementsOfScreen(number, largestNumber) {
  const div = document.createElement("div");
  div.textContent = number;
  div.style.height = `${(number / largestNumber) * 100}%`;
  div.style.minHeight = "50px";
  div.style.borderRadius = "50px";
  div.classList.add("off-lights");

  return div;
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  })
}

export async function bubbleSort(numbers, childElements) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1 - i; j++) {
      if (numbers[j] > numbers[j + 1]) {
        const frontIndex = j;
        const backIndex = j + 1;
        const temp = numbers[j];

        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;

        await delay(500);
        turnOnLigthsOfSelectedElements(frontIndex, backIndex, childElements);
        await swapFrontElementAndBackElement(frontIndex, backIndex, childElements);
        await delay(500);
        turnOffLigthsOfSelectedElements(frontIndex, backIndex, childElements);
      }
    }
  }

  await delay(600);
  turnOnAllChildElementsOfScreen(childElements);
  await delay(700);
  showNameOfSortingAlgorithm();
}

export function getTranslatedPositionValueOfCurrentElement(index, childElements) {
  let positionValue;

  if (!childElements[index].style.transform) {
    positionValue = 0;
  } else {
    const positionValueAsString = childElements[index].style.transform.split("translateX(")[1].split("px)")[0];
    positionValue = parseInt(positionValueAsString);
  }

  return positionValue;
}
