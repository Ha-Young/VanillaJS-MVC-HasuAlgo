import { inputDatas } from "../model/user-input-data";
import { numberInput } from "../view/add-event-listeners";
import createNewNumberBar from "../view/create-new-number-bar";
import displayMessage from "../view/display-message";
import resetInputTexts from "../view/reset-input-texts";

let { numbers } = inputDatas;

export default function handleKeyup(e) {
  const key = e.key;

  if (key !== "Enter") {
    return;
  }

  const inputValue = Number(numberInput.value);

  if (!inputValue) {
    displayMessage("Numbers Only");
    return;
  }
  
  if (inputValue > 100) {
    displayMessage("No larger than 100");
    return false;
  }

  if (inputDatas.numbers.length > 9) {
    displayMessage("MAX: 10 numbers");
    return false;
  }

  displayMessage("well done");

  numbers.push(inputValue);
  resetInputTexts();
  createNewNumberBar(inputValue);
}
