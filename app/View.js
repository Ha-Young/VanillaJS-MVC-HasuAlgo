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
  leftTarget.classList.add("element-moving-effect");
  rightTarget.classList.add("element-moving-effect");

  leftTarget.style.transform = `translateX(${this.TRANSITION_PERCENTAGE}%)`;
  rightTarget.style.transform = `translateX(-${this.TRANSITION_PERCENTAGE}%)`;
};

View.prototype.bubbleSortSwapTargetElements = function(leftTarget, rightTarget, targetParent) {
  leftTarget.classList.remove("element-moving-effect");
  rightTarget.classList.remove("element-moving-effect");
  leftTarget.style.transform = this.TRANSFORM_NONE;
  rightTarget.style.transform = this.TRANSFORM_NONE;

  targetParent.insertBefore(rightTarget, leftTarget);
};

View.prototype.colorTargetElement = function(targetElement) {
    targetElement.classList.add('target-element-color');
};

View.prototype.uncolorBiggerElement = function(biggerElement) {
    biggerElement.classList.remove('bigger-element-color');
};

View.prototype.uncolorSmallerElement = function(smallerElement) {
    smallerElement.classList.remove('smaller-element-color');
};

View.prototype.colorSortedElement = function(sortedElement) {
    sortedElement.classList.add("sorted-element-color");
  };

View.prototype.colorPivotElement = function(pivotElement) {
  pivotElement.classList.add('pivot-element-color');
};

View.prototype.uncolorPivotElement = function(pivotElement) {
    pivotElement.classList.remove('pivot-element-color');
  };

View.prototype.uncolorTargetElement = function(targetElement) {
  targetElement.classList.remove("target-element-color");
};


View.prototype.resetUserInputElement = function(userInput) {
  userInput.removeAttribute(this.DISABLED_CLASSNAME);
  userInput.placeholder = this.PLACEHOLDER_TEXT;
};

View.prototype.resetSortDisplaySection = function(sortDisplaySection) {
  sortDisplaySection.innerHTML = "";
};

// quick
View.prototype.colorPivotElement = function(pivot) {
    pivot.classList.add('pivot-element-color');
  };
  
  View.prototype.colorTargetElement = function(targetElement) {
    targetElement.classList.add('target-element-color');
  };
  
  View.prototype.colorBiggerElement = function(biggerElement) {
    biggerElement.classList.add('bigger-element-color');
  };
  
  View.prototype.colorSmallerElement = function(smallerElement) {
    smallerElement.classList.add('smaller-element-color');
  };

 View.prototype.quickSortVisualSwap = function(pivotIndexElem, target) {
    pivotIndexElem.classList.add(this.ELEMENT_MOVING_EFFECT);
    target.classList.add(this.ELEMENT_MOVING_EFFECT);

    let pivotIndexElemRect = pivotIndexElem.getBoundingClientRect();
    let targetRect = target.getBoundingClientRect();

    let rectDifference = Math.abs(targetRect.x - pivotIndexElemRect.x);

    let pivotIndexElementPreStyled = getX(pivotIndexElem);
    let targetPreStyled = getX(target);

    function getX (elem) {
      const style = window.getComputedStyle(elem);
      const matrix = new WebKitCSSMatrix(style.transform);
      return matrix.m41;
    }

    pivotIndexElem.style.transform = `translate(${pivotIndexElementPreStyled + rectDifference}px)`
    target.style.transform = `translate(${targetPreStyled-rectDifference}px)`
}
