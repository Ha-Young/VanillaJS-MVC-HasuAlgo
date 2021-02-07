import {view} from "./view.js";
import {model} from "./model.js";
import {COMPARE, SWAP, SWAP_DONE, SINGLE_DONE, FINISHED, PICK_PIVOT} from "./constants.js";

function createController() {
  const $startButton = document.querySelector(".start-button");
  const $userInput = document.querySelector(".user-input");
  const $bubbleSortButton = document.querySelector(".bubble-sort-button");
  const $quickSortButton = document.querySelector(".quick-sort-button");
  let isBubbleSortTurn = false;
  let isQuickSortTurn = false;

  function convertNumber() {
    const inputValueList = $userInput.value.split(",").map(num => Number(num));

    for (const item of inputValueList) {
      if (isNaN(item)) {
        view.warningMessage.inputNumber();
        setTimeout(view.warningMessage.removeMessage, 1000);
        return;
      }
    }
  
    return inputValueList;
  }

  $bubbleSortButton.addEventListener("click", function () {
    view.removeContent();

    isBubbleSortTurn = true;

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
  });

  $quickSortButton.addEventListener("click", function () {
    view.removeContent();

    isQuickSortTurn = true;

    $userInput.addEventListener("input", convertNumber);

    $startButton.addEventListener("click", function handleInputItem() {
      $userInput.removeEventListener("input", convertNumber);
  
      const numberList = convertNumber();
  
      if (numberList.length > 4 && numberList.length < 10) {
        controller.addList(numberList);
  
        if (isQuickSortTurn) {
          controller.playQuickSort();
          isQuickSortTurn = false;
        }
  
        this.removeEventListener("click", handleInputItem);
      }
  
      view.removeInputValue();
    });
  });

  return {
    addList: function (list) {
      model.addList(list);
      model.cacheUserInputList();
      view.showBlock(model.storage);
    },

    removeList: function (list) {
      model.removeList(list);
    },

    bubbleSort: function () {
      const taskElementList = [];
      const storage = model.storage[0];

      for (let i = 0; i < storage.length - 1; i++) {
        for (let j = 0; j < storage.length - i - 1; j++) {
          taskElementList.push(controller.inputTask(COMPARE, j, j + 1));
          
          if (storage[j] > storage[j + 1]) {
            const temp = storage[j];
            storage[j] = storage[j + 1];
            storage[j + 1] = temp;
            
            taskElementList.push(controller.inputTask(SWAP, j, j + 1));
          }

          taskElementList.push(controller.inputTask(SWAP_DONE, j, j + 1));
        }
    
        taskElementList.push(controller.inputTask(SINGLE_DONE, i));
      }
      
      taskElementList.push(controller.inputTask(FINISHED));
      view.visualize(taskElementList);
      controller.removeList(storage);
    },

    inputTask: function (type, leftIndex, rightIndex) {
      return {
        type,
        leftIndex,
        rightIndex
      };
    },

    delay: function () {
      return new Promise(resolve => {
        setTimeout(resolve, 300);
      });
    },

    playQuickSort: function () {
      const taskElementList = [];
      const storage = model.storage[0];
      let partitionIndex;

      function quickSort (array, low, high) {
        if (low >= high) return;

        partitionIndex = partition(array, low, high);
        
        quickSort(array, low, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, high);
      }

      quickSort(storage, 0, storage.length -1);

      taskElementList.push(controller.inputTask(FINISHED));
      view.visualize(taskElementList);
      controller.removeList(storage);

      function partition (array, low, high) {
        const pivot = array[high];
        taskElementList.push(controller.inputTask(PICK_PIVOT, low, high));
        let lowCount = low - 1;
        
        for (let i = low; i < high; i++) {
          if (array[i] < pivot) {
            lowCount++;
  
            swapElement(array,lowCount, i);
          }
        }
        
        swapElement(array, lowCount + 1, high);
   
        return lowCount + 1;
      }

      function swapElement (array, lowCount, i) {

        taskElementList.push(controller.inputTask(COMPARE, lowCount, i));

        const temp = array[lowCount];
        array[lowCount] = array[i];
        array[i] = temp;
  
        taskElementList.push(controller.inputTask(SWAP, lowCount, i));
        taskElementList.push(controller.inputTask(SWAP_DONE, lowCount, i));
      }
    }
  };
}

const controller = createController();

export {controller};
