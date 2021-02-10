import { $body, $h1, $form, $select, $warningSign, $section } from "./index";
import { getTranslatedPositionValueOfCurrentElement } from "./controller";
import { warningMessage } from "./constants/message";

const SWAP_DELAY = 700;

let executionCheck = false;
let distance;

export function showNotDevelopedSortingAlgorithm() {
  $warningSign.textContent = warningMessage.NOT_DEVELOPED_SORTING_ALGORITHM;
}

export function showOnlyNumberSign() {
  $warningSign.textContent = warningMessage.ONLY_NUMBER;
}

export function showCountLimitSign() {
  $warningSign.textContent = warningMessage.COUNT_LIMIT;
}

export function setOnScreen(main) {
  $body.classList.add("bgEffect");
  $h1.classList.add("hidden");
  $form.classList.add("hidden");

  $section.appendChild(main);
}

export function swapFrontElementAndBackElement(frontIndex, backIndex, childElements) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (!executionCheck) {
        distance = childElements[backIndex].getBoundingClientRect().x - childElements[frontIndex].getBoundingClientRect().x
        executionCheck = true;
      }

      const positionValueOfFrontElement = getTranslatedPositionValueOfCurrentElement(frontIndex, childElements);
      const positionValueOfBackElement = getTranslatedPositionValueOfCurrentElement(backIndex, childElements);

      let temp = childElements[frontIndex]
      childElements[frontIndex] = childElements[backIndex];
      childElements[backIndex] = temp;

      childElements[frontIndex].style.transform = `translateX(${positionValueOfBackElement - distance}px)`;
      childElements[backIndex].style.transform = `translateX(${positionValueOfFrontElement + distance}px)`;

      resolve();
    }, SWAP_DELAY);
  });
 }

export function turnOnLigthsOfSelectedElements(frontIndex, backIndex, childElements) {
  childElements[frontIndex].classList.replace("off-lights", "on-lights");
  childElements[backIndex].classList.replace("off-lights", "on-lights");
}

export function turnOffLigthsOfSelectedElements(frontIndex, backIndex, childElements) {
  childElements[frontIndex].classList.replace("on-lights", "off-lights");
  childElements[backIndex].classList.replace("on-lights", "off-lights");
}

export function turnOnAllChildElementsOfScreen(childElements) {
  childElements.forEach(function (item) {
    item.classList.replace("off-lights", "on-lights");
  });
}

export function showNameOfSortingAlgorithm() {
  $h1.textContent = $select.value;
  $h1.classList.replace("hidden", "textEffect");
}
