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
  }

  this.VIEW_PORT_HEIGHT = 270;
}

View.prototype.getElem = function (elemName) {
  return this.elemNames[elemName];
}

View.prototype.activateEvent = function (eventTarget, event, handler) {
  switch (eventTarget) {
    case "mainInput":
      this.$mainInput.addEventListener(event, handler);
      break;
    case "mainForm":
      this.$mainForm.addEventListener(event, handler);
      break;
    default:
      break;
  }
}

View.prototype.clearViewPort = function () {
  this.$viewPort.innerHTML = "";
}

View.prototype.updateMessage = function (message) {
  this.$messageBox.textContent = message;
}

View.prototype.createElement = function (template) {
  const $newElem = document.createElement("template");
  $newElem.innerHTML = template;
  return $newElem.content.firstChild;
}

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
      $barBox.children[1].style.height = `${Math.round(this.VIEW_PORT_HEIGHT * (num.percentage / 100))}px`;;

      return $barBox;
    }
  );
}

View.prototype.swapElem = function ($a, $b, aDomRect, bDomRect) {
  const aMoveValue = bDomRect.left - aDomRect.left;
  const bMoveValue = aDomRect.left - bDomRect.left;
  $a.style.transform = `translateX(${aMoveValue}px)`;
  $b.style.transform = `translateX(${bMoveValue}px)`;
}

View.prototype.getElemPos = function($target) {
  if (Array.isArray($target)) {
    return $target.map(
      (elem, i) => elem.getBoundingClientRect()
    );
  }

  return $target.getBoundingClientRect();
}

View.prototype.startAnimation = function (sortProcesses) {
  console.log(sortProcesses);

  
  // 여기서부터ㅓㅓㅓㅓㅓㅓㅓ
}