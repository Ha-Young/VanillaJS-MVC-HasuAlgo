import { alretBox, numberInput } from "./add-event-listeners";

export default function resetInputTexts() {
  numberInput.value = "";
  numberInput.placeholder = "";
  alretBox.textContent = "";
}