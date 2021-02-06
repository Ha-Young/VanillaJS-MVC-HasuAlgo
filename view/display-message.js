import { alretBox, numberInput } from "./add-event-listeners";

export default function displayMessage(message) {
  numberInput.value = "";
  alretBox.textContent = message;
}
