import { inputDatas } from "../model/user-input-data";
import { numberInput } from "../view/add-event-listeners";
import createNewNumberBar from "../view/create-new-number-bar";
import checkIfInputValid from "../view/input-validation";
import resetInputTexts from "../view/reset-input-texts";

let { numbers } = inputDatas;

export default function handleKeyup(e) {
  const key = e.key;

  if (key !== "Enter") {
    return;
  }

  const inputValue = Number(numberInput.value);

  if (!checkIfInputValid(inputValue)) {
    return;
  }

  numbers.push(inputValue);
  resetInputTexts();
  createNewNumberBar(inputValue);
}
