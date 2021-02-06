import { _, numberInput } from "./add-event-listeners";

export default function resetInputTexts() {
  numberInput.value = "";
  numberInput.placeholder = "";
}
