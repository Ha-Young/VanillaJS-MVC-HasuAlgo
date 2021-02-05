export default function View () {
  this.TRANSITION_PERCENTAGE = 100;
}

View.prototype.createElements = function(userInputList, sortDisplaySection) {
  userInputList.forEach(input => {
    const $rectangleDiv = document.createElement("div");
    $rectangleDiv.classList.add("rectangle-element");
    $rectangleDiv.dataset.value = input;
    $rectangleDiv.textContent = input;
    $rectangleDiv.style.height = `${12 * input}px`;
    sortDisplaySection.appendChild($rectangleDiv);
  });
};

View.prototype.toggleSubmitButton = function(submitButton, toggle) {
  toggle ? submitButton.classList.remove("hidden") : submitButton.classList.add("hidden");
};

View.prototype.toggleStartButton = function(startButton, toggle) {
  toggle ? startButton.classList.remove("hidden") : startButton.classList.add("hidden");
};

View.prototype.toggleResetButton = function(resetButton, toggle) {
  toggle ? resetButton.classList.remove("hidden") : resetButton.classList.add("hidden");
};

View.prototype.toggleSortSelector = function(sortSelector, toggle) {
  toggle ? sortSelector.classList.add("hidden") : sortSelector.classList.remove("hidden");
};

View.prototype.setInstructionMessage = function(instructionMessageElement, settingMessage) {
  instructionMessageElement.textContent = settingMessage;
};

View.prototype.setInstructionMessageAfterSubmit = function(userInput, instructionMessageElement, settingMessage){
  userInput.value = "";
  instructionMessageElement.textContent = settingMessage;
};

View.prototype.hideSortSelectorAfterInputValidation = function(userInput, sortSelector, validatedUserInput) {
  sortSelector.classList.add("hidden");
  userInput.placeholder = validatedUserInput;
  userInput.disabled = "disabled";
};

View.prototype.delay = function (delayTime) {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayTime);
  });
};

View.prototype.moveVisualTargetElements = function(leftTarget, rightTarget, transitionPercentage = this.TRANSITION_PERCENTAGE) {
  leftTarget.classList.add("element-moving-effect");
  rightTarget.classList.add("element-moving-effect");

  leftTarget.style.transform = `translateX(${transitionPercentage}%)`;
  rightTarget.style.transform = `translateX(-${transitionPercentage}%)`;
};


View.prototype.swapTargetElements = function(leftTarget, rightTarget, targetParent) {
  leftTarget.classList.remove("element-moving-effect");
  rightTarget.classList.remove("element-moving-effect");
  leftTarget.style.transform = "none";
  rightTarget.style.transform = "none";

  targetParent.insertBefore(rightTarget, leftTarget);
};

View.prototype.colorTargetElements = function (leftTarget, rightTarget) {
  leftTarget.classList.add("target-element-color");
  rightTarget.classList.add("target-element-color");
};

View.prototype.uncolorTargetElements = function(leftTarget, rightTarget) {
  leftTarget.classList.remove("target-element-color");
  rightTarget.classList.remove("target-element-color");
};

View.prototype.colorSortedElements = function(sortedElement) {
  sortedElement.classList.add("sorted-element-color");
};

View.prototype.resetUserInputElement = function(userInput) {
  userInput.removeAttribute("disabled");
  userInput.placeholder = "Type here...";
};

View.prototype.resetSortDisplaySection = function(sortDisplaySection) {
  sortDisplaySection.innerHTML = "";
};

View.prototype.paintPivot = function(pivot) {
  pivot.classList.add('paint-pivot');
};

View.prototype.paintTargetElement = function(targetElement) {
  targetElement.classList.add('paint-target-element');
};

View.prototype.paintBiggerElement = function(biggerElement) {
  biggerElement.classList.add('paint-bigger-element');
};

View.prototype.paintSmallerElement = function(smallerElement) {
  smallerElement.classList.add('paint-smaller-element');
};
