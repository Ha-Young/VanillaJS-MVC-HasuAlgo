import {view} from "./view.js";
import {model} from "./model.js";

function createController() {
  const $startButton = document.querySelector(".start-button");
  const $userInput = document.querySelector(".user-input");
  const $bubbleSortButton = document.querySelector(".bubble-sort-button");
  let isBubbleSortTurn = false;

  function convertNumber() {
    const inputValueList = $userInput.value.split(",").map( num => Number(num));

    for (const item of inputValueList) {
      if (isNaN(item)) {
        setTimeout(view.warningMessage.inputNumber, 300);
        setTimeout(view.warningMessage.removeMessage, 1000);
        return;
      }
    }
  
    return inputValueList;
  }

  $userInput.addEventListener("input", convertNumber);

  $startButton.addEventListener("click", function handleInputItem() {
    $userInput.removeEventListener("input", convertNumber);

    const numberList = convertNumber();

    if (numberList.length > 4 && numberList.length < 10) {
      controller.addList(numberList);
      if (isBubbleSortTurn) {
        controller.bubbleSort();
        isBubbleSortTurn = false;
      }

      this.removeEventListener("click", handleInputItem);
    }

    view.removeInputValue();
  });

  $bubbleSortButton.addEventListener("click", function () {
    view.removeContent();

    isBubbleSortTurn = true;
  });

  return {
    addList: function (list) {
      model.addList(list);
      model.cacheUserInputList();
      view.showBlock(model.storage);
    },

    removeItem: function (list) {
      model.removeList(list);
    },

    bubbleSort: function () {
      const taskElementList = [];
      const storage = model.storage[0];

      for (let i = 0; i < storage.length - 1; i++) {
        for (let j = 0; j < storage.length - i - 1; j++) {
          taskElementList.push(controller.inputTask("COMPARE", j, j + 1));
          
          if (storage[j] > storage[j + 1]) {
            const temp = storage[j];
            storage[j] = storage[j + 1];
            storage[j + 1] = temp;
            
            taskElementList.push(controller.inputTask("SWAP", j, j + 1));
          }

          taskElementList.push(controller.inputTask("SWAP_DONE", j, j + 1));
        }
    
        taskElementList.push(controller.inputTask("SINGLE_DONE", i));
      }
      
      taskElementList.push(controller.inputTask("FINISH"));
      view.visualize(taskElementList);
    },

    inputTask: function (type, leftIndex, rightIndex) {
      return {
        type,
        leftIndex,
        rightIndex
      };
    },

    delay: function () {
      return new Promise( resolve => {
        setTimeout(() => { resolve() }, 300);
      });
    }
  };
}

const controller = createController();

export {controller};
