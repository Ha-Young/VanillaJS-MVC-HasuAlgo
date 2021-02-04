
export default function View () {
    this.$sortDisplaySection = document.querySelector('.sort-display-section');
}

View.prototype.createRectangles = function(userInputData) {
    userInputData.forEach((input, idx) => {

        const $rectangleDiv = document.createElement('div');
        $rectangleDiv.classList.add('rectangle')

        // transition css adding..?
        $rectangleDiv.dataset.value = input;
        $rectangleDiv.dataset.idx = idx;
        $rectangleDiv.textContent = input;
        $rectangleDiv.style.height = `${8 * input}px`;

        this.$sortDisplaySection.appendChild($rectangleDiv)
    })

    console.log(this.$sortDisplaySection)
}


View.prototype.colorTargetElements = function (firstDiv, secondDiv) {
    firstDiv.classList.add('target-elements-color')
    secondDiv.classList.add('target-elements-color')
}

View.prototype.delay = function (delayTime) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve();
        }, delayTime)
    })
}

View.prototype.swapDisplayElements = function(firstDiv, secondDiv) {
    firstDiv.classList.add('moving-effect')
    secondDiv.classList.add('moving-effect')

    firstDiv.style.transform = 'translate(80%)'
    secondDiv.style.transform = 'translate(-80%)'
}

View.prototype.swapSortingElements = function(firstDiv, secondDiv) {
    firstDiv.classList.remove('moving-effect')
    secondDiv.classList.remove('moving-effect')
    console.log('beforenode', this.$sortDisplaySection);

    firstDiv.style.transform = 'none'
    secondDiv.style.transform = 'none'
    this.$sortDisplaySection.insertBefore(secondDiv, firstDiv);
    console.log('afterenode', this.$sortDisplaySection);
}

View.prototype.uncolorTargetElements = function(firstDiv, secondDiv) {
    firstDiv.classList.remove('target-elements-color')
    secondDiv.classList.remove('target-elements-color')
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














// submit btn
View.prototype.showSubmitBtn = function(submitBtn) {
    submitBtn.classList.remove('hidden')
}

View.prototype.hideSubmitBtn = function(submitBtn) {
    submitBtn.classList.add('hidden')
}

// start, retry btn

View.prototype.showStartBtn = function(startBtn) {
    startBtn.classList.remove('hidden')
}

View.prototype.hideStartBtn = function(startBtn) {
    startBtn.classList.add('hidden')
}

View.prototype.showResetBtn = function(resetBtn) {
    resetBtn.classList.remove('hidden')
}

View.prototype.hideResetBtn = function(resetBtn) {
    resetBtn.classList.add('hidden')
}

// selector

View.prototype.hideSortSelector = function(sortSelector) {
    sortSelector.classList.add('hidden')
}

View.prototype.showSortSelector = function(sortSelector) {
    sortSelector.classList.remove('hidden')
}