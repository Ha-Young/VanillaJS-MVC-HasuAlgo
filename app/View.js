export default function View () {
  this.TRANSITION_PERCENTAGE = 100;
  this.HIDDEN_CLASSNAME = "hidden";
  this.DISABLED_CLASSNAME = "disabled";
  this.TRANSFORM_NONE = "none";
  this.PLACEHOLDER_TEXT = "Type here..."
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
  toggle ? submitButton.classList.remove(this.HIDDEN_CLASSNAME) : submitButton.classList.add(this.HIDDEN_CLASSNAME);
};

View.prototype.toggleStartButton = function(startButton, toggle) {
  toggle ? startButton.classList.remove(this.HIDDEN_CLASSNAME) : startButton.classList.add(this.HIDDEN_CLASSNAME);
};

View.prototype.toggleResetButton = function(resetButton, toggle) {
  toggle ? resetButton.classList.remove(this.HIDDEN_CLASSNAME) : resetButton.classList.add(this.HIDDEN_CLASSNAME);
};

View.prototype.toggleSortSelector = function(sortSelector, toggle) {
  toggle ? sortSelector.classList.add(this.HIDDEN_CLASSNAME) : sortSelector.classList.remove(this.HIDDEN_CLASSNAME);
};

View.prototype.setInstructionMessage = function(instructionMessageElement, settingMessage) {
  instructionMessageElement.textContent = settingMessage;
};

View.prototype.setInstructionMessageAfterSubmit = function(userInput, instructionMessageElement, settingMessage){
  userInput.value = "";
  instructionMessageElement.textContent = settingMessage;
};

View.prototype.hideSortSelectorAfterInputValidation = function(userInput, sortSelector, validatedUserInput) {
  sortSelector.classList.add(this.HIDDEN_CLASSNAME);
  userInput.placeholder = validatedUserInput;
  userInput.disabled = this.DISABLED_CLASSNAME;
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
  leftTarget.style.transform = this.TRANSFORM_NONE;
  rightTarget.style.transform = this.TRANSFORM_NONE;

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
  userInput.removeAttribute(this.DISABLED_CLASSNAME);
  userInput.placeholder = this.PLACEHOLDER_TEXT;
};

View.prototype.resetSortDisplaySection = function(sortDisplaySection) {
  sortDisplaySection.innerHTML = "";
};

// quick sort

View.prototype.paintPivot = function(pivot) {
  pivot.classList.add('pivot-element-color');
};

View.prototype.paintTargetElement = function(targetElement) {
  targetElement.classList.add('target-element-color');
};

View.prototype.paintBiggerElement = function(biggerElement) {
  biggerElement.classList.add('bigger-element-color');
};

View.prototype.paintSmallerElement = function(smallerElement) {
  smallerElement.classList.add('smaller-element-color');
};
