export default function View () {
  this.TRANSITION_PERCENTAGE = 100;
  this.HIDDEN_CLASSNAME = "hidden";
  this.DISABLED_CLASSNAME = "disabled";
  this.TRANSFORM_NONE = "none";
  this.PLACEHOLDER_TEXT = "Type here..."

  this.ELEMENT_MOVING_EFFECT = "element-moving-effect";
  this.TARGET_ELEMENT_COLOR = "target-element-color";
  this.BIGGER_ELEMENT_COLOR = "bigger-element-color";
  this.SMALLER_ELEMENT_COLOR = "smaller-element-color";
  this.SORTED_ELEMENT_COLOR = "sorted-element-color";
  this.PIVOT_ELEMENT_COLOR = "pivot-element-color";
}

View.prototype.createElements = function(userInputList, sortDisplaySection) {
  userInputList.forEach(input => {
    const $rectangleDiv = document.createElement("div");
    $rectangleDiv.classList.add("rectangle-element");
    $rectangleDiv.textContent = input;
    $rectangleDiv.style.height = `${12 * input}px`;
    sortDisplaySection.appendChild($rectangleDiv);
  });
};

View.prototype.toggleSubmitButton = function(submitButton, toggle) {
  toggle ? submitButton.classList.remove(this.HIDDEN_CLASSNAME)
  : submitButton.classList.add(this.HIDDEN_CLASSNAME);
};

View.prototype.toggleStartButton = function(startButton, toggle) {
  toggle ? startButton.classList.remove(this.HIDDEN_CLASSNAME)
  : startButton.classList.add(this.HIDDEN_CLASSNAME);
};

View.prototype.toggleResetButton = function(resetButton, toggle) {
  toggle ? resetButton.classList.remove(this.HIDDEN_CLASSNAME)
  : resetButton.classList.add(this.HIDDEN_CLASSNAME);
};

View.prototype.toggleSortSelector = function(sortSelector, toggle) {
  toggle ? sortSelector.classList.add(this.HIDDEN_CLASSNAME)
  : sortSelector.classList.remove(this.HIDDEN_CLASSNAME);
};

View.prototype.toggleTargetElementColor = function(targetElement, toggle) {
  toggle ? targetElement.classList.add(this.TARGET_ELEMENT_COLOR)
  : targetElement.classList.remove(this.TARGET_ELEMENT_COLOR);
}

View.prototype.toggleBiggerElementColor = function(biggerElement, toggle) {
  toggle ? biggerElement.classList.add(this.BIGGER_ELEMENT_COLOR)
  : biggerElement.classList.remove(this.BIGGER_ELEMENT_COLOR);
}

View.prototype.toggleSmallerElementColor = function(smallerElement, toggle) {
  toggle ? smallerElement.classList.add(this.SMALLER_ELEMENT_COLOR)
  : smallerElement.classList.remove(this.SMALLER_ELEMENT_COLOR);
}

View.prototype.toggleSortedElementColor = function(sortedElement, toggle) {
  toggle ? sortedElement.classList.add(this.SORTED_ELEMENT_COLOR)
  : sortedElement.classList.remove(this.SORTED_ELEMENT_COLOR);
}

View.prototype.togglePivotElementColor = function(pivotElement, toggle) {
  toggle ? pivotElement.classList.add(this.PIVOT_ELEMENT_COLOR)
  : pivotElement.classList.remove(this.PIVOT_ELEMENT_COLOR);
}

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

View.prototype.bubbleSortVisualSwap = function(leftTarget, rightTarget) {
  leftTarget.classList.add(this.ELEMENT_MOVING_EFFECT);
  rightTarget.classList.add(this.ELEMENT_MOVING_EFFECT);

  leftTarget.style.transform = `translateX(${this.TRANSITION_PERCENTAGE}%)`;
  rightTarget.style.transform = `translateX(-${this.TRANSITION_PERCENTAGE}%)`;
};

View.prototype.bubbleSortSwapTargetElements = function(leftTarget, rightTarget, targetParent) {
  leftTarget.classList.remove(this.ELEMENT_MOVING_EFFECT);
  rightTarget.classList.remove(this.ELEMENT_MOVING_EFFECT);
  leftTarget.style.transform = this.TRANSFORM_NONE;
  rightTarget.style.transform = this.TRANSFORM_NONE;
  targetParent.insertBefore(rightTarget, leftTarget);
};

View.prototype.quickSortVisualSwap = function(pivotIndexElem, target) {
  pivotIndexElem.classList.add(this.ELEMENT_MOVING_EFFECT);
  target.classList.add(this.ELEMENT_MOVING_EFFECT);

  const pivotIndexElemRect = pivotIndexElem.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const rectDifference = Math.abs(targetRect.x - pivotIndexElemRect.x);
  const pivotIndexElementPreStyled = getX(pivotIndexElem);
  const targetPreStyled = getX(target);

  function getX(elem) {
    const style = window.getComputedStyle(elem);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

  pivotIndexElem.style.transform = `translate(${pivotIndexElementPreStyled+rectDifference}px)`;
  target.style.transform = `translate(${targetPreStyled-rectDifference}px)`;
}

View.prototype.resetUserInputElement = function(userInput) {
  userInput.removeAttribute(this.DISABLED_CLASSNAME);
  userInput.placeholder = this.PLACEHOLDER_TEXT;
};

View.prototype.resetSortDisplaySection = function(sortDisplaySection) {
  sortDisplaySection.innerHTML = "";
};
