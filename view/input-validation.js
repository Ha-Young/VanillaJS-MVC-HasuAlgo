import { inputDatas } from "../model/user-input-data";
import { alretBox, numberInput } from "./add-event-listeners";

export default function checkIfInputValid(value) {
  if (!value) {
    numberInput.value = "";
    alretBox.textContent = "Numbers Only";
    return false;
  }
  
  if (value > 100) {
    numberInput.value = "";
    alretBox.textContent = "No larger than 90";
    return false;
  }

  if (inputDatas.numbers.length > 9) {
    numberInput.value = "";
    alretBox.textContent = "MAX is 10";
    return false;
  }

  alretBox.textContent = "well done";
  return true;
}
