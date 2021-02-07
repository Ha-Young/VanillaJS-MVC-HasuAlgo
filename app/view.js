import "../assets/styles/index.less";
import {controller} from "./controller.js";
import {palette} from "./color.js";

function createView() {
  const $message = document.querySelector(".message");
  const $container = document.querySelector(".container");
  const $userInput = document.querySelector(".user-input");

  return {
    warningMessage: {
      inputNumber: function () {
        $message.textContent = "숫자를 입력하세요";
        view.removeInputValue();
      },

      removeMessage: function () {
        $message.textContent = "";
      }
    },

    backgroundColorChange: {
      addColorComparedBlock: function (prevNode, nextNode) {
        prevNode.style.backgroundColor = palette.PALE_PURPPLE;
        nextNode.style.backgroundColor = palette.PALE_PURPPLE;
      },

      addColorSwapDoneBlock: function (prevNode, nextNode) {
        prevNode.style.backgroundColor = palette.WHITE;
        nextNode.style.backgroundColor = palette.WHITE;
      },

      addColorSingleDoneBlock: function (list, i) {
        list[list.length - i - 1].style.backgroundColor = palette.PALE_YELLOW;
      },

      addColorLastBlock: function (list) {
        list[0].style.backgroundColor = palette.PALE_YELLOW;
      },

      addColorPivotBlock: function (list, high) {
        list[high].style.backgroundColor = palette.RED;
      }
    },

    removeContent: function () {
      $container.innerHTML = "";
    },

    removeInputValue: function () {
      $userInput.value = "";
    },

    showBlock: function (storage) {
      for (let i = 0; i < storage[0].length; i++) {
        const div = document.createElement("div");
        div.className = "block";
        div.style.backgroundColor = palette.WHITE;
        div.style.height = `${storage[0][i] * 8}%`;
        div.textContent = storage[0][i];
        $container.appendChild(div);
      }
    },

    swap: function (list, leftIndex, rightIndex) {  

      return new Promise(resolve => {
         setTimeout(() => {  

          if (leftIndex !== rightIndex) {
            if (leftIndex === 0 && rightIndex === 1) {
              list[leftIndex].after(list[rightIndex]);
              list[rightIndex].after(list[leftIndex]);
            }  

            if (leftIndex === 0 && rightIndex !== 1) {
              list[leftIndex].after(list[rightIndex]);
              list[rightIndex - 1].after(list[leftIndex]);
            }  

            if (leftIndex !== 0) {
              list[rightIndex - 1].after(list[leftIndex]);
              list[leftIndex - 1].after(list[rightIndex]);
            }
          }
         
          resolve();
        }, 100);
      });
    },

    visualize: async function (taskElementList) {
      let blockList = document.querySelectorAll(".block");

      for (const taskElement of taskElementList) {
        switch (taskElement.type) {
          case "COMPARE":
            await view.visualizeComparedBlock(blockList, taskElement.leftIndex, taskElement.rightIndex);
            break;
          case "SWAP":
            await view.swap(blockList, taskElement.leftIndex, taskElement.rightIndex);
            blockList = document.querySelectorAll(".block");
            break;
          case "SWAP_DONE":
            await view.visualizeSwapDoneBlock(blockList, taskElement.leftIndex, taskElement.rightIndex);
            break;
          case "SINGLE_DONE":
            await view.visualizeSingleDoneBlock(blockList, taskElement.leftIndex);
            break;
          case "FINISHED":
            await view.visualizeFinishedBlock(blockList);
            break;
          case "PICK_PIVOT":
            await view.visualizePivotBlock(blockList, taskElement.rightIndex);
            break;
          default:
            throw new Error("Invalid type");
        }
      }
    },

    visualizeComparedBlock: async function (list, i, j) {
      await controller.delay();
      view.backgroundColorChange.addColorComparedBlock(list[i], list[j]);
      await controller.delay();
    },

    visualizeSwapDoneBlock: async function (list, i, j) {
      await controller.delay();
      view.backgroundColorChange.addColorSwapDoneBlock(list[i], list[j]);
      await controller.delay();
    },

    visualizeSingleDoneBlock: async function (list, i) {
      await controller.delay();
      view.backgroundColorChange.addColorSingleDoneBlock(list, i);
      await controller.delay();
    },

    visualizeFinishedBlock: async function (list) {
      await controller.delay();
      view.backgroundColorChange.addColorLastBlock(list);
      await controller.delay();
    },

    visualizePivotBlock: async function (list, high) {
      await controller.delay();
      view.addColorPivotBlock.addColorPivotBlock(list, high);
      await controller.delay();
    }
  };
}

const view = createView();

export {view};
