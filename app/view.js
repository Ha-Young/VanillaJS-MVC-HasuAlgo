export default function View() {
  this.$selectSortType = document.querySelector(".select-sort-type");
  this.$mainForm = document.querySelector(".main-form")
  this.$mainInput = document.querySelector(".main-input");
  this.$mainInputSubmitButton = document.querySelector(".main-input-submit");
  this.$viewPortBox = document.querySelector(".view-port-box");
  this.$viewPort = document.querySelector(".view-port");
  this.$messageBox = document.querySelector(".message-box");

  this.elemNames = {
    selectSortType: this.$selectSortType,
    mainForm: this.$mainForm,
    mainInput: this.$mainInput,
    mainInputSubmitButton: this.$mainInputSubmitButton,
    viewPortBox: this.$viewPortBox,
    viewPort: this.$viewPort,
    messageBox: this.$messageBox,
  };

  this.VIEW_PORT_HEIGHT = 270;
}

View.prototype.getElem = function (elemName, selectAll = false) {
  if (!selectAll && this.elemNames[elemName]) {
    return this.elemNames[elemName];
  }

  if (!selectAll) {
    return document.querySelector(elemName);
  }

  return document.querySelectorAll(elemName);
};

View.prototype.activateEvent = function ($eventTarget, event, handler) {
  if (!typeof handler === "function") {
    throw new Error("The handler argument is not a function.");
  }

  if (Array.isArray($eventTarget)) {
    for (const $eventTargetItem of $eventTarget) {
      $eventTargetItem.addEventListener(event, handler);
    }
  
    return;
  }

  $eventTarget.addEventListener(event, handler);
};

View.prototype.clearViewPort = function () {
  this.$viewPort.innerHTML = "";
};

View.prototype.updateMessage = function (message) {
  this.$messageBox.textContent = message;
};

View.prototype.createElement = function (template) {
  const $newElem = document.createElement("template");
  $newElem.innerHTML = template;
  return $newElem.content.firstChild;
};

View.prototype.render = function ($parentNode, $target) {
  if (Array.isArray($target)) {
    for (const $targetElem of $target) {
      $parentNode.append($targetElem);
    }

    return;
  }

  $parentNode.append($target);
}

// View.prototype.changeBarsHeight = function ($barBoxes, inputtedNums) {
//   console.log($barBoxes);
//   for (const [i, $barBox] of $barBoxes.entries()) {
//     $barBox.children[1].style.height = 
//       `${Math.round(this.VIEW_PORT_HEIGHT * (inputtedNums[i].percentage / 100))}px`;
//   }
// }

View.prototype.createBarElem = function (inputtedNums) {
  return inputtedNums.map(
    (num, i) => {
      const template = 
        `
          <div class="bar-box" data-idx="${num.sortedIndex}">
            <div class="number">${num.num}</div>
            <div class="bar"></div>
          </div>
        `.trim();
      
      const $barBox = this.createElement(template);
      
      const barHeight = (() => {
        const height =  Math.round(this.VIEW_PORT_HEIGHT * (num.percentage / 100));
        if (!height) {
          return 1;
        }

        return height;
      })();

      $barBox.children[1].style.height = 
        `${barHeight}px`;

      return $barBox;
    }
  );
};

View.prototype.getElemPos = function($target) {
  if (Array.isArray($target)) {
    return $target.map(
      (elem, i) => {
        const rect = elem.getBoundingClientRect()
        rect.originalIndex = i;

        return rect;
      }
    );
  }

  return $target.getBoundingClientRect();
};

View.prototype.moveElem = function ($target, destinationPostion) {
  const targetMatrix = new WebKitCSSMatrix(getComputedStyle($target).transform)
  const movedXValue = targetMatrix.m41;
  const movedYValue = targetMatrix.m42;

  const currentPosition = $target.getBoundingClientRect();

  const xMovingValue = movedXValue + destinationPostion.left - currentPosition.left;
  const yMovingValue = movedYValue + destinationPostion.top - currentPosition.top;

  $target.style.transform = `translate(${xMovingValue}px, ${yMovingValue}px)`;
}

View.prototype.swapElem = function ($a, $b, indexA, indexB, elemPositions) {
  return new Promise((resolve) => {
    const destinationA = elemPositions[indexB];
    const destinationB = elemPositions[indexA];

    this.moveElem($a, destinationA);
    this.moveElem($b, destinationB);

    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

View.prototype.progressBubbleSortAnimation = async function (sortSteps, $barBoxes, barPositions) {
  console.log(sortSteps);
  
  for (const steps of sortSteps) {
    const indexA = steps.indexA;
    const indexB = steps.indexB;

    const $barBoxA = $barBoxes[indexA];
    const $barBoxB = $barBoxes[indexB];

    // if (steps.shouldSwap) {

    // }
    [$barBoxes[indexA], $barBoxes[indexB]] = [$barBoxes[indexB], $barBoxes[indexA]];

    await this.swapElem($barBoxA, $barBoxB, indexA, indexB, barPositions);
  }
}
