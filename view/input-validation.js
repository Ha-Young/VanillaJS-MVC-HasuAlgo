import { alretBox, numberInput } from "./add-event-listeners";

export default function checkIfInputValid(value) {
  if (!value) {
    numberInput.value = "";
    alretBox.textContent = "Numbers Only";
    return false;
  }
  
  if (value > 100) {
    numberInput.value = "";
    alretBox.textContent = "MAX is 90";
    return false;
  }

  alretBox.textContent = "well done";
  return true;
}
