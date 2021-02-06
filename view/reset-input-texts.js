import { numberInput, wholeNumberInput } from "./add-event-listeners";

export default function resetInputTexts() {
  numberInput.value = "";
  numberInput.placeholder = "";
  wholeNumberInput.value = "";
}
