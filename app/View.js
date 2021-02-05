
export default function View () {
    this.$sortDisplaySection = document.querySelector('.sort-display-section');
}

View.prototype.createElements = function(userInputData) {
    userInputData.forEach((input, idx) => {
        const $rectangleDivTextSpace = document.createElement("span");
        const $rectangleDiv = document.createElement("div");
        $rectangleDiv.classList.add("rectangle-element")

        $rectangleDiv.dataset.value = input;
        $rectangleDiv.dataset.idx = idx;
        $rectangleDiv.textContent = input;
        $rectangleDiv.style.height = `${12 * input}px`;

        this.$sortDisplaySection.appendChild($rectangleDiv)
  })

    console.log(this.$sortDisplaySection)
}

View.prototype.toggleSubmitButton = function(submitButton, toggle) {
  toggle ? submitButton.classList.remove("hidden") : submitButton.classList.add("hidden");
}

View.prototype.toggleStartButton = function(startButton, toggle) {
  toggle ? startButton.classList.remove("hidden") : startButton.classList.add("hidden");
}

View.prototype.toggleResetButton = function(resetButton, toggle) {
  toggle ? resetButton.classList.remove("hidden") : resetButton.classList.add("hidden");
}




View.prototype.resetUserInputElement = function(userInput) {
  userInput.removeAttribute("disabled");
  userInput.placeholder = "Type here...";
}

View.prototype.setInstructionMessageAfterSubmit = function(userInput, instructionMessageElement, settingMessage){
  userInput.value = "";
  instructionMessageElement.textContent = settingMessage;
}


View.prototype.resetSortDisplaySection = function(sortDisplaySection) {
  sortDisplaySection.innerHTML = "";
}

View.prototype.setInstructionMessage = function(instructionMessageElement, settingMessage) {
  instructionMessageElement.textContent = settingMessage;
}

View.prototype.toggleSortSelector = function(sortSelector, toggle) {
  toggle ? sortSelector.classList.add("hidden") : sortSelector.classList.remove("hidden");
}


View.prototype.hideSortSelectorAfterInputValidation = function (userInput, sortSelector, validatedUserInput) {
  sortSelector.classList.add("hidden");
  userInput.placeholder = validatedUserInput;
  userInput.disabled = "disabled";

    // this.$userInputList.placeholder = this.model.getUserInput();
    // this.$userInputList.disabled ="disabled";
}


View.prototype.colorTargetElements = function (leftTarget, rightTarget) {
    leftTarget.classList.add("target-element-color");
    rightTarget.classList.add("target-element-color");
}

View.prototype.delay = function (delayTime) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve();
        }, delayTime)
    })
}

View.prototype.moveVisualTargetElements = function(leftTarget, rightTarget, transitionPercentage = 100) {
    leftTarget.classList.add("element-moving-effect");
    rightTarget.classList.add("element-moving-effect");

    leftTarget.style.transform = `translate(${transitionPercentage}%)`;
    rightTarget.style.transform = `translate(-${transitionPercentage}%)`;
}

View.prototype.swapTargetElements = function(leftTarget, rightTarget, targetParent) {
    leftTarget.classList.remove("element-moving-effect");
    rightTarget.classList.remove("element-moving-effect");

    leftTarget.style.transform = "none";
    rightTarget.style.transform = "none";

    targetParent.insertBefore(rightTarget, leftTarget);
    // console.log('afterenode', this.$sortDisplaySection);
}

View.prototype.uncolorTargetElements = function(leftTarget, rightTarget) {
    leftTarget.classList.remove('target-element-color')
    rightTarget.classList.remove('target-element-color')
}

View.prototype.colorSortedElements = function(sortedElement) {
    sortedElement.classList.add('sorted-element-color')
}

// quicksort

View.prototype.paintPivot = function(pivot) {
    pivot.classList.add('paint-pivot');
}

View.prototype.paintTargetElement = function(targetElement) {
    targetElement.classList.add('paint-target-element')
}

View.prototype.paintBiggerElement = function(biggerElement)  {
    biggerElement.classList.add('paint-bigger-element')
}

View.prototype.paintSmallerElement = function(smallerElement)  {
    smallerElement.classList.add('paint-smaller-element')
}













// submit btn
// View.prototype.showSubmitBtn = function(submitBtn) {
//     submitBtn.classList.remove('hidden')
// }

// View.prototype.hideSubmitBtn = function(submitBtn) {
//     submitBtn.classList.add('hidden')
// }

// start, retry btn

// View.prototype.showStartBtn = function(startBtn) {
//     startBtn.classList.remove('hidden')
// }

// View.prototype.hideStartBtn = function(startBtn) {
//     startBtn.classList.add('hidden')
// }

// View.prototype.showResetBtn = function(resetBtn) {
//     resetBtn.classList.remove('hidden')
// }

// View.prototype.hideResetBtn = function(resetBtn) {
//     resetBtn.classList.add('hidden')
// }

// selector

// View.prototype.hideSortSelector = function(sortSelector) {
//     sortSelector.classList.add('hidden')
// }

// View.prototype.showSortSelector = function(sortSelector) {
//     sortSelector.classList.remove('hidden')
// }