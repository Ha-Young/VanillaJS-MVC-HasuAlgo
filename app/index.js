import "../assets/styles/index.less";
import { controlUserInput } from "./controller";
import { $form } from "./view";

function handleFormSubmit(event) {
  event.preventDefault();
  if(!controlUserInput()) {
    return;
  }
}

function init() {
  $form.addEventListener("submit", handleFormSubmit);
}

init();
