import {view} from "./view.js";
import {model} from "./model.js";

function createController() {
  const startButton = document.querySelector(".start-button");
  const userInput = document.querySelector(".user-input");

  function convertNumber() {
    const inputValueList = userInput.value.split(",").map(Number);

    for (const item of inputValueList) {
      if (isNaN(item)) {
        setTimeout(view.showWarningMessage, 300);
        setTimeout(view.removeWarningMessage, 1000);
        return;
      }
    }
  
    return inputValueList;
  }


  userInput.addEventListener("input", convertNumber);

  startButton.addEventListener("click", function handleInputItem() {
    userInput.removeEventListener("input", convertNumber);
    const numberList = convertNumber();

    if (numberList.length > 5 && numberList.length < 10) {
      controller.addItem(numberList);
      controller.bubbleSort();
      this.removeEventListener("click", handleInputItem);
    }

    view.removeInputValue();
  });

  return {
    addItem: function (list) {
      model.addList(list);
      view.showBlock(model.storage);
    },

    bubbleSort: async function () {
      let blockList = document.querySelectorAll(".block");

      for (let i = 0; i < blockList.length - 1; i++) {
        for (let j = 0; j < blockList.length - i - 1; j++) {
          if (model.sortedStorage.length !== 0) {
            model.removeList(blockList);
          }

          await controller.delay();
          blockList[j].style.backgroundColor = "#f0e6fc";
          blockList[j + 1].style.backgroundColor = "#f0e6fc";
          await controller.delay();

          const prevItem = Number(blockList[j].textContent);
          const nextItem = Number(blockList[j + 1].textContent);
  
          if (prevItem > nextItem) {
            await view.swap(blockList[j], blockList[j + 1]);
            blockList = document.querySelectorAll(".block");
          }

          await controller.delay();
          blockList[j].style.backgroundColor = "white";
          blockList[j + 1].style.backgroundColor = "white";
          await controller.delay();
        }

        blockList[blockList.length - i - 1].style.backgroundColor = "#f9fac0";
      }

      blockList[0].style.backgroundColor = "#f9fac0";
    },

    delay: function () {
      return new Promise((resolve) => {
        setTimeout(() => { resolve() }, 300);
      })
    }
  };
}

const controller = createController();

export {controller};