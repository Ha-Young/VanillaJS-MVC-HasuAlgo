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
  this.hasStart = false;

  this.BUBUBLE_SORT = "bubble-sort";
  this.MERGE_SORT = "merge-sort";
  this.QUICK_SORT = "quick-sort";

  this.INITIAL_MESSAGE = "Please type any 5-10 numbers between 0 to 30 seperating with comma";
  this.PROPER_NUMBER_MESSAGE = "Please type proper 5-10 numbers";
  this.PROPER_FORMAT_MESSAGE = "Please type numbers with correct format ex) 1, 2, 3";
  this.PROPER_RANGE_MESSAGE = "Please type numbers between 1 to 30";
  this.AFTER_SUBMIT_MESSAGE = "Numbers are submitted, click the start button to start";
  this.SORTING_MESSAGE = "SORTING....";
  this.RETRY_MESSAGE = "Click the RESET button to retry!";

  this.ELEMENT_MOVING_EFFECT = "element-moving-effect";

  this.taskQueue = [];
}

Controller.prototype.init = function() {
  this.$submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isInputValidated = this.validateUserInput();

    if (!isInputValidated) {
      return;
    }

    const validatedUserInput = this.model.getUserInputList();
    this.view.hideSortSelectorAfterInputValidation(this.$userInput, this.$sortSelector, validatedUserInput);
    this.view.toggleSubmitButton(this.$submitButton, false);
    this.view.toggleStartButton(this.$startButton, true);
  });

  this.$startButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.confirmSelectedSortOption();
    this.view.toggleStartButton(this.$startButton, false);
    this.view.setInstructionMessage(this.$instructionMessage, this.SORTING_MESSAGE);
  });

  this.$resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.model.setUserInputList([]);

    this.view.resetUserInputElement(this.$userInput);
    this.view.resetSortDisplaySection(this.$sortDisplaySection);

    this.view.toggleResetButton(this.$resetButton, false);
    this.view.toggleSubmitButton(this.$submitButton, true);
    this.view.toggleSortSelector(this.$sortSelector, false);
    this.view.setInstructionMessage(this.$instructionMessage, this.INITIAL_MESSAGE);
  });
};

Controller.prototype.validateUserInput = function() {
  const userInputList = this.$userInput.value.split(',').map(Number);

  if (userInputList.length < 5 || userInputList.length > 10) {
    this.view.setInstructionMessage(this.$instructionMessage, this.PROPER_NUMBER_MESSAGE);
    return false;
  }

  if (userInputList.some(input => isNaN(input) || input === 0)) {
    this.view.setInstructionMessage(this.$instructionMessage, this.PROPER_FORMAT_MESSAGE);
    return false;
  }

  if (userInputList.some(input => input > 30 || input <= 0)) {
    this.view.setInstructionMessage(this.$instructionMessage, this.PROPER_RANGE_MESSAGE);
    return false;
  }

  this.model.setUserInputList(userInputList);
  this.view.toggleSubmitButton(this.$submitButton, true);
  this.view.toggleStartButton(this.$startButton, false);
  this.view.createElements(userInputList, this.$sortDisplaySection);
  this.view.setInstructionMessageAfterSubmit(this.$userInput, this.$instructionMessage, this.AFTER_SUBMIT_MESSAGE);

  return true;
};

Controller.prototype.confirmSelectedSortOption = function() {
  const userInputElements = this.$sortDisplaySection.children;
  const sortList = Array.from(userInputElements);

  switch (this.$sortSelector.value) {
    case this.BUBUBLE_SORT :
      this.bubbleSort();
      break;
    case this.MERGE_SORT :
      this.mergeSort(sortList);
      break;
    case this.QUICK_SORT :
      this.quickSort(sortList);
      break;
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

  this.view.togglePivotElementColor(pivotElement, true);
  await this.view.delay(this.EXTENDED_DELAY);

  for (let i = start + 1; i <= end; i++) {
    const targetElement = userInputElements[i];

    this.view.toggleTargetElementColor(targetElement, true);
    await this.view.delay(this.DEALY);

    const pivotValue = Number(pivotElement.textContent);
    const targetValue = Number(targetElement.textContent);

    if (targetValue <= pivotValue) {
      this.view.toggleTargetElementColor(targetElement, false);
      this.view.toggleSmallerElementColor(targetElement, true);
      await this.view.delay(this.EXTENDED_DELAY);

      lookingForPivotIdx++;
      lookingForPivotPosition = userInputElements[lookingForPivotIdx];

      this.view.quickSortVisualSwap(lookingForPivotPosition, targetElement);
      await this.view.delay(this.DELAY);

      quickSortElementsSwap(userInputElements, lookingForPivotIdx, i);
      await this.view.delay(this.DELAY);
    }

    this.view.toggleTargetElementColor(targetElement, false);
    this.view.toggleBiggerElementColor(targetElement, true);
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

Controller.prototype.quickSort = async function(userInputElements, left = 0, right = userInputElements.length-1) {
  if (left <= right) {
    const pivot = await this.placingPivotIdx(userInputElements, left, right);
    const updatedUserInputElements = this.model.getUserInputElements();

    this.view.togglePivotElementColor(userInputElements[pivot], false);
    this.view.toggleSortedElementColor(userInputElements[pivot], true);

    userInputElements.map(element => {
      this.view.toggleBiggerElementColor(element, false);
      this.view.toggleSmallerElementColor(element, false);
    });

    await this.view.delay(this.EXTENDED_DELAY);
    await this.quickSort(updatedUserInputElements, left, pivot-1);

    await this.view.delay(this.EXTENDED_DELAY);
    await this.quickSort(updatedUserInputElements, pivot+1, right);
  }
};

Controller.prototype.bubbleSort = async function() {
  const userInputElements = this.$sortDisplaySection.children;

  for (let i = 0; i < userInputElements.length; i++) {
    for (let j = 0; j < userInputElements.length-1-i; j++) {
      if (this.hasReset) {
        return;
      }

      const leftTarget = userInputElements[j];
      const rightTarget = userInputElements[j+1];

      await this.view.delay(this.DELAY);

      this.view.toggleTargetElementColor(leftTarget, false);
      this.view.colorTargetElement(leftTarget);
      this.view.colorTargetElement(rightTarget);

      await this.view.delay(this.DELAY);

      const leftValue = Number(leftTarget.textContent);
      const rightValue = Number(rightTarget.textContent);

      if (leftValue > rightValue) {
        await this.view.delay(this.DELAY);
        this.view.bubbleSortVisualSwap(leftTarget, rightTarget);

        await this.view.delay(this.DELAY);
        this.view.bubbleSortSwapTargetElements(leftTarget, rightTarget, this.$sortDisplaySection);
      }

      await this.view.delay(this.DELAY);
      this.view.uncolorTargetElement(leftTarget);
      this.view.uncolorTargetElement(rightTarget);

      await this.view.delay(this.DELAY);
    }

    this.view.colorSortedElement(userInputElements[userInputElements.length-i-1]);
    await this.view.delay(this.DELAY * 2);
  }

  this.view.setInstructionMessage(this.$instructionMessage, this.RETRY_MESSAGE);
  this.view.toggleResetButton(this.$resetButton, true);
};

Controller.prototype.mergeSort = async function (userInputElements) {
  if (!this.hasStart) {
    this.taskQueue.push(this.createTask("init", userInputElements));
    this.hasStart = true;
  }
}

Controller.prototype.createTask = function (taskName, left, right) {
  return {
    taskName,
    left,
    right,
  }
}
