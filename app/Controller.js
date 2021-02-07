export default function Controller(model, view) {
  this.model = model;
  this.view = view;

  this.$userInput = document.querySelector(".user-input");
  this.$sortSettingWrap = document.querySelector(".sort-setting-wrap");
  this.$sortSelector = document.querySelector(".sort-selector");
  this.$submitButton = document.querySelector(".submit-button");
  this.$startButton = document.querySelector(".start-button");
  this.$resetButton = document.querySelector(".reset-button");
  this.$sortDisplaySection = document.querySelector(".sort-display-section");
  this.$instructionMessage = document.querySelector(".instruction-message");

  this.TRANSITION_PERCENTAGE = 100;
  this.DELAY = 300;
  this.EXTENDED_DELAY = this.DELAY * 2;
  this.hasReset = false;

  this.sortType = {
    BUBBLE_SORT: "bubble-sort",
    QUICK_SORT: "quick-sort",
  };

  this.messageType = {
    INITIAL_MESSAGE: "Please type any 5-10 numbers between 0 to 30 seperating with comma",
    PROPER_NUMBER_MESSAGE: "Please type proper 5-10 numbers",
    PROPER_FORMAT_MESSAGE: "Please type numbers with correct format ex) 1, 2, 3",
    PROPER_RANGE_MESSAGE: "Please type numbers between 1 to 30",
    AFTER_SUBMIT_MESSAGE: "Numbers are submitted, click the start button to start",
    SORTING_MESSAGE: "SORTING....",
    RETRY_MESSAGE: "Click the RESET button to retry!",
  };

  this.viewType = {
    HIDDEN_CLASSNAME: "hidden",
    DISABLED_CLASSNAME: "disabled",
    TRANSFORM_NONE: "none",
    PLACEHOLDER_TEXT: "Type here...",
    ELEMENT_MOVING_EFFECT: "element-moving-effect",
    TARGET_ELEMENT_COLOR: "target-element-color",
    BIGGER_ELEMENT_COLOR: "bigger-element-color",
    SMALLER_ELEMENT_COLOR: "smaller-element-color",
    SORTED_ELEMENT_COLOR: "sorted-element-color",
    PIVOT_ELEMENT_COLOR: "pivot-element-color",
  };
}

Controller.prototype.init = function() {
  this.$submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isInputValidated = this.validateUserInput();

    if (!isInputValidated) {
      return;
    }

    const validatedUserInput = this.model.getUserInputList();
    this.view.hideSortSelectorAfterInputValidation(this.$userInput,
      this.$sortSelector,
      validatedUserInput);
    this.view.toggleElement(this.$submitButton, this.viewType.HIDDEN_CLASSNAME, true);
    this.view.toggleElement(this.$startButton, this.viewType.HIDDEN_CLASSNAME, false);
  });

  this.$startButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.confirmSelectedSortOption();
    this.view.toggleElement(this.$startButton, this.viewType.HIDDEN_CLASSNAME, true);
    this.view.setInstructionMessage(this.$instructionMessage, this.messageType.SORTING_MESSAGE);
  });

  this.$resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.model.setUserInputList([]);
    this.model.setUserInputElements([]);

    this.view.resetUserInputElement(this.$userInput);
    this.view.resetSortDisplaySection(this.$sortDisplaySection);

    this.view.toggleElement(this.$resetButton, this.viewType.HIDDEN_CLASSNAME, true);
    this.view.toggleElement(this.$submitButton, this.viewType.HIDDEN_CLASSNAME, false);
    this.view.toggleElement(this.$sortSelector, this.viewType.HIDDEN_CLASSNAME, false);
    this.view.setInstructionMessage(this.$instructionMessage, this.INITIAL_MESSAGE);
  });
};

Controller.prototype.validateUserInput = function() {
  const userInputNumbers = this.$userInput.value.split(',').map(Number);

  if (userInputNumbers.length < 5 || userInputNumbers.length > 10) {
    this.view.setInstructionMessage(this.$instructionMessage, this.messageType.PROPER_NUMBER_MESSAGE);
    return false;
  }

  if (userInputNumbers.some(userInputNumber => isNaN(userInputNumber) || userInputNumber === 0)) {
    this.view.setInstructionMessage(this.$instructionMessage, this.messageType.PROPER_FORMAT_MESSAGE);
    return false;
  }

  if (userInputNumbers.some(userInputNumber => userInputNumber > 30 || userInputNumber <= 0)) {
    this.view.setInstructionMessage(this.$instructionMessage, this.messageType.PROPER_RANGE_MESSAGE);
    return false;
  }

  this.model.setUserInputList(userInputNumbers);
  this.view.createElements(userInputNumbers, this.$sortDisplaySection);
  this.view.setInstructionMessageAfterSubmit(this.$userInput, this.$instructionMessage, this.messageType.AFTER_SUBMIT_MESSAGE);

  return true;
};

Controller.prototype.confirmSelectedSortOption = function() {
  const userInputElements = this.$sortDisplaySection.children;
  const userInputList = Array.from(userInputElements);

  switch (this.$sortSelector.value) {
    case this.sortType.BUBBLE_SORT :
      this.bubbleSort(userInputElements);
      break;
    case this.sortType.QUICK_SORT :
      this.quickSort(userInputList);
      break;
  }
};

Controller.prototype.quickSort = async function(userInputElements, left = 0, right = userInputElements.length-1) {
  if (left <= right) {
    const pivot = await this.placingPivotIdx(userInputElements, left, right);
    const updatedUserInputElements = this.model.getUserInputElements();

    this.view.setInstructionMessage(this.$instructionMessage, this.messageType.RETRY_MESSAGE);
    this.view.toggleElement(this.$resetButton, this.viewType.HIDDEN_CLASSNAME, false);

    this.view.toggleElement(userInputElements[pivot], this.viewType.PIVOT_ELEMENT_COLOR, false);
    this.view.toggleElement(userInputElements[pivot], this.viewType.SORTED_ELEMENT_COLOR, true);

    userInputElements.map((element) => {
      this.view.toggleElement(element, this.viewType.BIGGER_ELEMENT_COLOR, false);
      this.view.toggleElement(element, this.viewType.SMALLER_ELEMENT_COLOR, false);
    });

    await this.view.delay(this.EXTENDED_DELAY);
    await this.quickSort(updatedUserInputElements, left, pivot-1);

    await this.view.delay(this.EXTENDED_DELAY);
    await this.quickSort(updatedUserInputElements, pivot+1, right);
  }
};

Controller.prototype.placingPivotIdx = async function(quickSortElementsList, start, end) {
  const userInputElements = quickSortElementsList;
  const pivotElement = userInputElements[start];
  let lookingForPivotIdx = start;
  let lookingForPivotPosition;

  function quickSortElementsSwap(userInputElements, lookingForPivotIdx, i) {
    [userInputElements[lookingForPivotIdx], userInputElements[i]]
    = [userInputElements[i], userInputElements[lookingForPivotIdx]];
  }

  this.view.toggleElement(pivotElement, this.viewType.PIVOT_ELEMENT_COLOR, true);
  await this.view.delay(this.EXTENDED_DELAY);

  for (let i = start + 1; i <= end; i++) {
    const targetElement = userInputElements[i];

    this.view.toggleElement(targetElement, this.viewType.TARGET_ELEMENT_COLOR, true);
    await this.view.delay(this.EXTENDED_DELAY);

    const pivotValue = Number(pivotElement.textContent);
    const targetValue = Number(targetElement.textContent);

    if (targetValue <= pivotValue) {
      this.view.toggleElement(targetElement, this.viewType.TARGET_ELEMENT_COLOR, false);
      this.view.toggleElement(targetElement, this.viewType.SMALLER_ELEMENT_COLOR, true);
      await this.view.delay(this.EXTENDED_DELAY);

      lookingForPivotIdx++;
      lookingForPivotPosition = userInputElements[lookingForPivotIdx];

      this.view.quickSortVisualSwap(lookingForPivotPosition, targetElement);
      await this.view.delay(this.DELAY);

      quickSortElementsSwap(userInputElements, lookingForPivotIdx, i);
      await this.view.delay(this.DELAY);
    }

    this.view.toggleElement(targetElement, this.viewType.TARGET_ELEMENT_COLOR, false);
    this.view.toggleElement(targetElement, this.viewType.BIGGER_ELEMENT_COLOR, true);
    await this.view.delay(this.EXTENDED_DELAY);
  }

  await this.view.delay(this.DELAY);
  this.view.quickSortVisualSwap(pivotElement, userInputElements[lookingForPivotIdx]);

  await this.view.delay(this.DELAY);
  quickSortElementsSwap(userInputElements, lookingForPivotIdx, start);

  this.model.setUserInputElements(userInputElements);
  await this.view.delay(this.DELAY);

  return lookingForPivotIdx;
}

Controller.prototype.bubbleSort = async function(inputElements) {
  const userInputElements = inputElements;

  for (let i = 0; i < userInputElements.length; i++) {
    for (let j = 0; j < userInputElements.length-1-i; j++) {
      if (this.hasReset) {
        return;
      }

      const leftTarget = userInputElements[j];
      const rightTarget = userInputElements[j+1];

      await this.view.delay(this.DELAY);

      this.view.toggleElement(leftTarget, this.viewType.TARGET_ELEMENT_COLOR, true);
      this.view.toggleElement(rightTarget, this.viewType.TARGET_ELEMENT_COLOR, true);

      await this.view.delay(this.DELAY);

      const leftValue = Number(leftTarget.textContent);
      const rightValue = Number(rightTarget.textContent);

      if (leftValue > rightValue) {
        await this.view.delay(this.DELAY);
        this.view.bubbleSortVisualSwap(leftTarget, rightTarget);

        await this.view.delay(this.DELAY);
        this.view.bubbleSortTargetElementsSwap(leftTarget, rightTarget, this.$sortDisplaySection);
      }

      await this.view.delay(this.DELAY);
      this.view.toggleElement(leftTarget, this.viewType.TARGET_ELEMENT_COLOR, false);
      this.view.toggleElement(rightTarget, this.viewType.TARGET_ELEMENT_COLOR, false);

      await this.view.delay(this.DELAY);
    }

    this.view.toggleElement(userInputElements[userInputElements.length-i-1], this.viewType.SORTED_ELEMENT_COLOR, true);
    await this.view.delay(this.DELAY * 2);
  }

  this.view.setInstructionMessage(this.$instructionMessage, this.messageType.RETRY_MESSAGE);
  this.view.toggleElement(this.$resetButton, this.viewType.HIDDEN_CLASSNAME, false);
};
