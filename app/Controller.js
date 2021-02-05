
export default function Controller (model, view) {
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
  this.hasReset = false;

  this.BUBUBLE_SORT = "bubble-sort";
  this.QUICK_SORT = "quick-sort";

  this.INITIAL_MESSAGE = "Please type any 5-10 numbers between 0 to 50 seperating with comma";
  this.PROPER_NUMBER_MESSAGE = "Please type proper 5-10 numbers";
  this.PROPER_FORMAT_MESSAGE = "Please type numbers with correct format ex) 1, 2, 3";
  this.PROPER_RANGE_MESSAGE = "Please type numbers between 1 to 30";
  this.AFTER_SUBMIT_MESSAGE = "Numbers are submitted, click the start button to start";
  this.SORTING_MESSAGE = "SORTING....";
  this.RETRY_MESSAGE = "Click the RESET button to retry!";
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

  if (this.$sortSelector.value === this.BUBUBLE_SORT) {
    this.bubleSort();
  } else if (this.$sortSelector.value === this.QUICK_SORT) {
    this.quickSort(userInputElements, 0, userInputElements.length-1);
  }
};

// Controller.prototype.quickSort = async function(userInputElements, left = 0, right = userInputElements.length-1) {
//   if (left < right) {
//     let pivot = this.placingPivotIdx(userInputElements, left, right)

//     this.quickSort(userInputElements, left, pivot-1);
//     this.quickSort(userInputElements, pivot+1, right);
//   }
// }

// Controller.prototype.placingPivotIdx = async function(elements, start, end) {
//     const sortingElements = elements;

//     let pivotIdx = start;
//     let pivot = sortingElements[start];
//     let difference;
//     let transitionPercentage;

//     // function swap (arr, pivotIdx, i) {
//     //   return [arr[pivotIdx], arr[i]] = [arr[i], arr[pivotIdx]];
//     // }

//     this.view.paintPivot(pivot);
//     await this.view.delay(1000);

//     for (let i = start + 1; i <= end; i++) {
//         this.view.paintTargetElement(sortingElements[i]);
//         await this.view.delay(1000);

//         if (Number(pivot.getAttribute('data-value')) > Number(sortingElements[i].getAttribute('data-value'))) {
//             this.view.paintSmallerElement(sortingElements[i])
//             await this.view.delay(1000)

//             pivotIdx++;

//             difference = i - pivotIdx;
//             transitionPercentage = difference * this.basicTransitionPercentage

//             this.view.swapDisplayElements(sortingElements[pivotIdx], sortingElements[i], transitionPercentage)
//             await this.view.delay(1000)

//             // swap(sortingElements, pivotIdx, i);

//             this.view.swapSortingElements(sortingElements[pivotIdx], sortingElements[i])
//             await this.view.delay(1000)

//             //this.view.swapDisplayElements(sortingElements[i], sortingElements[mentalNote])
//             // sortingElements[pivot].classList.add('moving-effect')
//             // sortingElements[i].classList.add('moving-effect')
//             // sortingElements[pivot].style.transform = 'translate(150%)'
//             // sortingElements[i].style.transform = 'translate(-150%)'
//             // await this.view.delay(1000)
//         }

//         this.view.paintBiggerElement(sortingElements[i]);
//         await this.view.delay(1000)
//     }

//     difference = pivotIdx - start;
//     transitionPercentage = difference * this.basicTransitionPercentage

//     this.view.swapDisplayElements(sortingElements[start], sortingElements[pivotIdx], transitionPercentage)
//     await this.view.delay(1000)

//     this.view.swapSortingElements(sortingElements[start], sortingElements[pivotIdx])
//     await this.view.delay(1000)
//     // swap(sortingElements, mentalNote, left)

//     return pivotIdx;
// }


Controller.prototype.bubleSort = async function() {
  const userInputElements = this.$sortDisplaySection.children;

  for (let i = 0; i < userInputElements.length; i++) {
    for (let j = 0; j < userInputElements.length-1-i; j++) {
      if (this.hasReset) {
        return;
      }

      const leftTarget = userInputElements[j];
      const rightTarget = userInputElements[j+1];

      await this.view.delay(this.DELAY);
      this.view.colorTargetElements(leftTarget, rightTarget);

      const leftValue = Number(leftTarget.getAttribute("data-value"));
      const rightValue = Number(rightTarget.getAttribute("data-value"));

      if (leftValue > rightValue) {
        await this.view.delay(this.DELAY);
        this.view.moveVisualTargetElements(leftTarget, rightTarget);

        await this.view.delay(this.DELAY);
        this.view.swapTargetElements(leftTarget, rightTarget, this.$sortDisplaySection);
      }

      await this.view.delay(this.DELAY);
      this.view.uncolorTargetElements(leftTarget, rightTarget);

      await this.view.delay(this.DELAY);
    }

    this.view.colorSortedElements(userInputElements[userInputElements.length-i-1]);
    await this.view.delay(this.DELAY * 3);
  }

  this.view.setInstructionMessage(this.$instructionMessage, this.RETRY_MESSAGE);
  this.view.toggleResetButton(this.$resetButton, true);
};
