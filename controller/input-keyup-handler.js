import { inputDatas } from "../model/user-input-data";
import { bubbleButton, mergeButton, numberInput, wholeNumberInput, startFormText } from "../view/add-event-listeners";
import createNewNumberPipe from "../view/create-new-number-pipe";
import displayMessage from "../view/display-message";
import resetInputTexts from "../view/reset-input-texts";
import visibilityToggler from "../view/visibility";

let { numbers } = inputDatas;

function checkValidation(value) {
  if (!value) {
    displayMessage("Numbers Only");
    return;
  }
  
  if (value > 100) {
    displayMessage("No larger than 100");
    return false;
  }

  if (inputDatas.numbers.length > 9) {
    displayMessage("MAX: 10 numbers");
    return false;
  }

  displayMessage("well done");
  return true;
}

export default function handleKeyup(e) {
  const key = e.key;

  if (key !== "Enter") {
    return;
  }

  if (this === wholeNumberInput) {
    let inputNumbers = wholeNumberInput.value.split(",").map(each => Number(each));
    let filteredNumbers = inputNumbers.filter(number => !!number);

    if (filteredNumbers.length < 5) {
      displayMessage("at least 5 numbers needed");
      return;
    }

    if (filteredNumbers.length > 10) {
      displayMessage("Maximum 10 numbers allowed");
      return;
    }

    filteredNumbers.forEach(each => {
      numbers.push(each)
      createNewNumberPipe(each);
    });
    
    resetInputTexts();
    visibilityToggler(wholeNumberInput);
    visibilityToggler(bubbleButton);
    visibilityToggler(mergeButton);
    startFormText.textContent = "Select a button";
    return;
  }

  const inputValue = Number(numberInput.value);
  if (!checkValidation(inputValue)) {
    return;
  }

  numbers.push(inputValue);
  resetInputTexts();
  createNewNumberPipe(inputValue);
}
