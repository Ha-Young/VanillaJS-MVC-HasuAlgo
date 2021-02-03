export default function View() {
  this.$selectSortType = document.querySelector(".select-sort-type");
  this.$mainForm = document.querySelector(".main-form")
  this.$mainInput = document.querySelector(".main-input");
  this.$mainInputSubmitButton = document.querySelector(".main-input-submit");
  this.$viewPortBox = document.querySelector(".view-port-box");
  this.$viewPort = document.querySelector(".view-port");
  this.$highlighterBox = document.querySelector(".highlighter-box");
  this.$messageBox = document.querySelector(".message-box");

  this.VIEW_PORT_HEIGHT = 270;
}

View.prototype.getElem = function (elemName, selectAll = false) {
  if (!selectAll && this[elemName]) {
    return this[elemName];
  }

  if (!selectAll) {
    return document.querySelector(elemName);
  }

  return document.querySelectorAll(elemName);
};

View.prototype.activateEvent = function (eventTarget, event, handler) {
  if (!typeof handler === "function") {
    throw new Error("The handler argument is not a function.");
  }

  const $eventTarget = this.getElem(eventTarget);

  $eventTarget.addEventListener(event, handler);
};

View.prototype.clearElem = function (target) {
  const $target = this.getElem(target);

  $target.innerHTML = "";
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
    for (const $targetItem of $target) {
      $parentNode.append($targetItem);
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

View.prototype.createHighlighterElem = function (num) {
  const $highlighters = [];

  for (let i = 0; i < num; i++) {
    const template =
      `<div class="highlighter" data-idx="${i}"></div>`;

    $highlighters.push(this.createElement(template));
  }

  this.$highlighters = $highlighters;

  this.render(this.$highlighterBox, $highlighters);
}

View.prototype.createBarElem = function (refinedNums) {
  const $barBoxes = refinedNums.map(
    (num) => {
      const template =
        `<div class="bar-box" data-idx="${num.sortedIndex}">
            <div class="number">${num.num}</div>
            <div class="bar"></div>
          </div>`;

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

  this.$barBoxes = $barBoxes;

  this.render(this.$viewPort, $barBoxes)
};

View.prototype.getElemDomRect = function(target) {
  const $target = this.getElem(target);

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

View.prototype.moveElem = function ($target, destinationPostion, waitingTime = 0, skipX = false, skipY = false) {
  return new Promise((resolve) => {
    const targetMatrix = new WebKitCSSMatrix(getComputedStyle($target).transform)
    
    const currentPosition = $target.getBoundingClientRect();

    const movedXValue = targetMatrix.m41;
    const movedYValue = targetMatrix.m42;

    const xMovingValue = skipX ? movedXValue : movedXValue + destinationPostion.left - currentPosition.left;
    const yMovingValue = skipY ? movedYValue : movedYValue + destinationPostion.top - currentPosition.top;
  
    $target.style.transform = `translate(${xMovingValue}px, ${yMovingValue}px)`;

    setTimeout(() => {
      resolve(true);
    }, waitingTime);
  });
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

View.prototype.addClassName = function ($target, className) {
  if (typeof className !== "string") {
    throw new Error("The className argument is not a string");
  }

  if (Array.isArray($target)) {
    for (const $targetItem of $target) {
      $targetItem.classList.add(className);
    }

    return;
  }

  $target.classList.add(className);
}

View.prototype.removeClassName = function ($target, className) {
  if (typeof className !== "string") {
    throw new Error("The className argument is not a string");
  }

  if (Array.isArray($target)) {
    for (const $targetItem of $target) {
      $targetItem.classList.remove(className);
    }

    return;
  }

  $target.classList.remove(className);
}

View.prototype.progressBubbleSortAnimation = async function (sortSteps, barPositions) {
  const $highlighterA = this.$highlighters[0];
  const $highlighterB = this.$highlighters[1];

  for (const step of sortSteps) {
    const indexA = step.indexA;
    const indexB = step.indexB;

    if (step.shouldSwap) {
      this.addClassName([$highlighterA, $highlighterB], "should-swap");
    } else {
      this.removeClassName([$highlighterA, $highlighterB], "should-swap");
    }

    const highlighterADestination = barPositions[indexA];
    const highlighterBDestination = barPositions[indexB];

    this.moveElem($highlighterA ,highlighterADestination, 500, false, true);
    await this.moveElem($highlighterB ,highlighterBDestination, 500, false, true);

    if (step.shouldSwap) {
      const $barBoxA = this.$barBoxes[indexA];
      const $barBoxB = this.$barBoxes[indexB];

      [this.$barBoxes[indexA], this.$barBoxes[indexB]] = [this.$barBoxes[indexB], this.$barBoxes[indexA]];
      await this.swapElem($barBoxA, $barBoxB, indexA, indexB, barPositions);
    }
  }
}
