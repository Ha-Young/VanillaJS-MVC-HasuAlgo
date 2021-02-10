import { turnOnLigthsOfSelectedElements, swapFrontElementAndBackElement, turnOffLigthsOfSelectedElements, turnOnAllChildElementsOfScreen, showNameOfSortingAlgorithm } from "./view";

export function changeStringToNumbers(string) {
  return string.split(",").map(item => parseInt(item));
}

export function checkNotNumber(numbers) {
  return numbers.some(number => isNaN(number));
}

export function makeChildElementsOfScreen(number) {
  const div = document.createElement("div");
  div.textContent = number;
  div.style.height = `${50 + (number * 12)}px`;
  div.style.borderRadius = "50px";

  return div;
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

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  })
}
