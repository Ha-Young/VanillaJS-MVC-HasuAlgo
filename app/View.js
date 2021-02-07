export default function View () {
  this.TRANSITION_PERCENTAGE = 100;
  this.HIDDEN_CLASSNAME = "hidden";
  this.DISABLED_CLASSNAME = "disabled";
  this.TRANSFORM_NONE = "none";
  this.PLACEHOLDER_TEXT = "Type here...";
  this.ELEMENT_MOVING_EFFECT = "element-moving-effect";
}

View.prototype.createElements = function(userInputList, sortDisplaySection) {
  const fragment = new DocumentFragment();

  userInputList.forEach((input) => {
    const $rectangleBarElement = document.createElement("div");
      $rectangleBarElement.classList.add("rectangle-element");
      $rectangleBarElement.textContent = input;
      $rectangleBarElement.style.height = `${12 * input}px`;
      fragment.appendChild($rectangleBarElement);
  });

  sortDisplaySection.appendChild(fragment);
};

View.prototype.toggleElement = function(element, viewType, toggle) {
  toggle ? element.classList.add(viewType) : element.classList.remove(viewType);
};

View.prototype.setInstructionMessage = function(
  instructionMessageElement, settingMessage
) {
    instructionMessageElement.textContent = settingMessage;
};

View.prototype.setInstructionMessageAfterSubmit = function(
  userInput, instructionMessageElement, settingMessage
) {
    userInput.value = "";
    instructionMessageElement.textContent = settingMessage;
};

View.prototype.hideSortSelectorAfterInputValidation = function(
  userInput, sortSelector, validatedUserInput) {
    sortSelector.classList.add(this.HIDDEN_CLASSNAME);
    userInput.placeholder = validatedUserInput;
    userInput.disabled = this.DISABLED_CLASSNAME;
};

View.prototype.delay = function (delayTime) {
  return new Promise ((resolve) => {
    setTimeout(resolve, delayTime);
  });
};

View.prototype.bubbleSortVisualSwap = function(leftTargetElement, rightTargetElement) {
  leftTargetElement.classList.add(this.ELEMENT_MOVING_EFFECT);
  rightTargetElement.classList.add(this.ELEMENT_MOVING_EFFECT);
  leftTargetElement.style.transform = `translateX(${this.TRANSITION_PERCENTAGE}%)`;
  rightTargetElement.style.transform = `translateX(-${this.TRANSITION_PERCENTAGE}%)`;
};

View.prototype.bubbleSortTargetElementsSwap = function(
  leftTargetElement, rightTargetElement, targetParent
) {
    leftTargetElement.classList.remove(this.ELEMENT_MOVING_EFFECT);
    rightTargetElement.classList.remove(this.ELEMENT_MOVING_EFFECT);
    leftTargetElement.style.transform = this.TRANSFORM_NONE;
    rightTargetElement.style.transform = this.TRANSFORM_NONE;
    targetParent.insertBefore(rightTargetElement, leftTargetElement);
};

View.prototype.quickSortVisualSwap = function(pivotIndexElement, targetElement) {
  pivotIndexElement.classList.add(this.ELEMENT_MOVING_EFFECT);
  targetElement.classList.add(this.ELEMENT_MOVING_EFFECT);

  const pivotIndexElemRect = pivotIndexElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  const rectDifference = Math.abs(targetRect.x - pivotIndexElemRect.x);
  const pivotIndexElementPreStyled = getX(pivotIndexElement);
  const targetPreStyled = getX(targetElement);

  function getX(elem) {
    const style = window.getComputedStyle(elem);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

  pivotIndexElement.style.transform = `translate(${pivotIndexElementPreStyled+rectDifference}px)`;
  targetElement.style.transform = `translate(${targetPreStyled-rectDifference}px)`;
}

View.prototype.resetUserInputElement = function(userInput) {
  userInput.removeAttribute(this.DISABLED_CLASSNAME);
  userInput.placeholder = this.PLACEHOLDER_TEXT;
};

View.prototype.resetSortDisplaySection = function(sortDisplaySection) {
  sortDisplaySection.innerHTML = "";
};
