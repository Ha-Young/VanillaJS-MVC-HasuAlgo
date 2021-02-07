import getFilteredNumbers from "./get-filtered-numbers";

export default function handleInput(e) {
  const key = e.key;

  if (key !== "Enter") {
    return false;
  }

  const inputValues = getFilteredNumbers(this.view);
  const [ isvalid, message ] = this.model.checkIfInputValid(inputValues);

  if (!isvalid) {
    this.view.displayMessage("alertBox", message);
    return;
  }

  this.model.addNewNumber(inputValues);
  this.view.marioWorld.stopMarioMoving();
  this.view.paintInput.createNewNumberPipe(inputValues);

  this.view.displayMessage("startForm", "Select a button");
  this.view.toggleVisibility("bubbleButton");
  this.view.toggleVisibility("mergeButton");
  this.view.toggleVisibility("startForm");
}

