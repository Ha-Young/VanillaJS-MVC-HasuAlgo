import '../assets/styles/index.less';
import {controller} from './controller.js';

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
        prevNode.style.backgroundColor = "#f0e6fc";
        nextNode.style.backgroundColor = "#f0e6fc";
      },

      addColorSwapDoneBlock: function (prevNode, nextNode) {
        prevNode.style.backgroundColor = "white";
        nextNode.style.backgroundColor = "white";
      },

      addColorSingleDoneBlock: function (list, i) {
        list[list.length - i - 1].style.backgroundColor = "#f9fac0";
      },

      addColorLastBlock: function (list) {
        list[0].style.backgroundColor = "#f9fac0";
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
        div.style.backgroundColor = "white";
        div.style.height = `${storage[0][i] * 8}%`;
        div.style.transform = `translateX(${i * 10}%)`;
        div.textContent = storage[0][i];
        $container.appendChild(div);
      }
    },

    swap: function (prevNode, nextNode) {

      return new Promise( resolve => {
        const prevNodeStyle = window.getComputedStyle(prevNode);
        const nextNodeStyle = window.getComputedStyle(nextNode);

        const prevNodeTransform = prevNodeStyle.getPropertyValue("transform");
        const nextNodeTransform = nextNodeStyle.getPropertyValue("transform");

        prevNode.style.transform = nextNodeTransform;
        nextNode.style.transform = prevNodeTransform;

        window.requestAnimationFrame(() => {
          setTimeout(() => {
            $container.insertBefore(nextNode, prevNode);
            resolve();
          }, 100);
        });
      });
    },

    visualize: async function (taskElementList) {
      let blockList = document.querySelectorAll(".block");

      for (const taskElement of taskElementList) {
        if (taskElement.type === "COMPARE") {
          await view.visualizeComparedBlock(blockList, taskElement.leftIndex, taskElement.rightIndex);
        } else if (taskElement.type === "SWAP") {
          await view.swap(blockList[taskElement.leftIndex], blockList[taskElement.rightIndex]);
          blockList = document.querySelectorAll(".block");
        } else if (taskElement.type === "SWAP_DONE") {
          await view.visualizeSwapDoneBlock(blockList, taskElement.leftIndex, taskElement.rightIndex);
        } else if (taskElement.type === "SINGLE_DONE") {
          await view.visualizeSingleDoneBlock(blockList, taskElement.leftIndex);
        } else if (taskElement.type === "FINISH") {
          await view.visualizeFinishedBlock(blockList);
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
    }
  };
}

const view = createView();

export {view};
