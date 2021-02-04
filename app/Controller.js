
export default function Controller (model, view) {
    this.model = model;
    this.view = view;

    this.$userInputData = document.querySelector(".user-input");
    this.$sortSettingWrap = document.querySelector('.sort-setting-wrap');

    this.$sortDisplaySection = document.querySelector('.sort-display-section');

    this.$sortSelector = document.querySelector('.sort-selector');

    this.$submitBtn = document.querySelector('.submit-button')
    this.$startBtn = document.querySelector('.start-button')
    this.$resetBtn = document.querySelector('.reset-button')

    // this.$sortController = document.querySelector('.sort-controller')
    // this.$stopBtn = document.querySelector('.stop-button');
    // this.$previousBtn = document.querySelector('.previous-button');
    // this.$resumeBtn = document.querySelector('.resume-button');

    this.$instructionMessage = document.querySelector('.instruction-message')

    this.hasSortingFinished = false;
    this.hasReset = false;

}

Controller.prototype.init = function() {
    // const that = this; // 가능?
    console.log(this.$userInputData)

    this.$submitBtn.addEventListener('click', () => {
        let success = this.validateUserInput();

        if(success) {
            this.view.hideSortSelector(this.$sortSelector);
            this.$userInputData.placeholder = this.model.getUserInput();
            this.$userInputData.disabled ="disabled";
        }

    })

    this.$startBtn.addEventListener('click', () => {
        this.confirmSelectedSortOption();
        this.view.hideStartBtn(this.$startBtn);
    })

    this.$resetBtn.addEventListener('click', () => {
        this.$sortDisplaySection.innerHTML = "";
        this.model.setUserInput([]);
        this.$userInputData.removeAttribute('disabled')
        this.$userInputData.placeholder = "Please type any 5-10 numbers between 0 to 50 with comma";
        this.$instructionMessage.textContent = "hi!";
        this.view.showSortSelector(this.$sortSelector);
        this.view.showSubmitBtn(this.$submitBtn);
        this.view.hideResetBtn(this.$resetBtn);
        return;
    })
}


Controller.prototype.validateUserInput = function() {
    console.log(this)
    console.log(this.$userInputData)

    const userInputData = this.$userInputData.value.split(',')

    if (userInputData.length < 2) {
        console.log(this.$instructionMessage)
        this.$instructionMessage.innerHTML = 'Please type 1-10 numbers with correct format'
        return;
    }

    // refactor
    const numberTransformedUserInputData = userInputData.map(Number);

    if (numberTransformedUserInputData.some(input => isNaN(input) || input === 0)) {
        this.$instructionMessage.textContent = 'Please type numbers with correct format ex) 1, 2, 3'
        return;
    }

    if (userInputData.length > 10) {
        this.$instructionMessage.textContent = 'Please type 1-10 numbers'
        return;
    }

    if (numberTransformedUserInputData.some(input => input > 30 || input <= 0)) {
        this.$instructionMessage.textContent = 'Please type numbers between 1 to 30'
        return;
    }

    console.log(numberTransformedUserInputData)

    this.$userInputData.value = '';
    this.$instructionMessage.textContent = "numbers are submitted, push the start button for starting"

    this.view.hideSubmitBtn(this.$submitBtn)
    this.view.showStartBtn(this.$startBtn);

    this.model.setUserInput(numberTransformedUserInputData);
    this.view.createRectangles(numberTransformedUserInputData);

    return true;
}

Controller.prototype.confirmSelectedSortOption = function() {
    console.log(this.$sortSelector.value)

    const sortingElements = this.$sortDisplaySection.children;

    if (this.$sortSelector.value === "bubble-sort") {
        this.bubleSort(sortingElements);
    } else if (this.$sortSelector.value === "quick-sort") {
        // this.placingPivotIdx(sortingElements, 0, sortingElements.length-1);
        this.quickSort(sortingElements, 0, sortingElements.length-1);
    }
}

Controller.prototype.quickSort = async function(arr, left = 0, right = arr.length-1) {
    if (left < right) {
        let pivot = this.placingPivotIdx(arr, left, right)

        console.log('pivot', pivot)
        console.log('arr', arr)

        this.quickSort(arr, left, pivot-1);
        this.quickSort(arr, pivot+1, right);
    }
}


Controller.prototype.placingPivotIdx = async function(children, left, right) {
    const sortingElements = children;

    let mentalNote = left;
    let pivot = sortingElements[left];

    function swap (arr, mentalNote, i) {
        return [arr[mentalNote], arr[i]] = [arr[i], arr[mentalNote]];
    }


    this.view.paintPivot(pivot);

    await this.view.delay(1000);

    for (let i = left + 1; i <= right; i++) {
        this.view.paintTargetElement(sortingElements[i]);

        await this.view.delay(1000);

        if (Number(pivot.getAttribute('data-value')) > Number(sortingElements[i].getAttribute('data-value'))) {

            mentalNote++;
            console.log(mentalNote);

            swap(sortingElements, mentalNote, i);

            //this.view.swapDisplayElements(sortingElements[i], sortingElements[mentalNote])

            // sortingElements[pivot].classList.add('moving-effect')
            // sortingElements[i].classList.add('moving-effect')

            // sortingElements[pivot].style.transform = 'translate(150%)'
            // sortingElements[i].style.transform = 'translate(-150%)'


            await this.view.delay(1000)

        }

        swap(sortingElements, mentalNote, left)
        return mentalNote
    }
}


Controller.prototype.bubleSort = async function() {
  const sortingElements = this.$sortDisplaySection.children;

  for(let i = 0; i < sortingElements.length; i++) {

    for(let j = 0; j < sortingElements.length-1-i; j++) {

        if (this.hasReset) {
          return;
        }

      const firstDiv = sortingElements[j]
      const secondDiv = sortingElements[j+1];

      this.view.colorTargetElements(firstDiv, secondDiv)

      if (Number(firstDiv.getAttribute('data-value')) > Number(secondDiv.getAttribute('data-value'))) {

        this.view.swapDisplayElements(firstDiv, secondDiv);

        await this.view.delay(500);
        this.view.swapSortingElements(firstDiv, secondDiv);
      }

        await this.view.delay(500);
        this.view.uncolorTargetElements(firstDiv, secondDiv);

        await this.view.delay(500)
    }

    this.view.colorSortedElements(sortingElements[sortingElements.length-i-1])
  }

  this.view.showResetBtn(this.$resetBtn)
}


