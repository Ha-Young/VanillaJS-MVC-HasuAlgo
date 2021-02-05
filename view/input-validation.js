import { alretBox, numberInput } from "./add-event-listeners";

export default function checkIfInputValid(value) {
  if (!value) {
    numberInput.value = "";
    alretBox.textContent = "🚨 Numbers Only 🚨";
    return false;
  }
  
  if (value > 100) {
    numberInput.value = "";
    alretBox.textContent = "🚨 Invalid: MAX is 100 🚨";
    return false;
  }

  return true;
}
