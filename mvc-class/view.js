import { divide } from "lodash";
import getHelpMessage from "../controller-functions/help-handler";
import getMyElements from "../model-functions/get-my-elements";
import changePipeToClouds from "../view-functions/change-pipe-to-clouds";
import createNewNumberPipe from "../view-functions/create-new-number-pipe";
import divideCloudsInCanvas from "../view-functions/divide-clouds-in-canvas";
import resetInputTexts from "../view-functions/reset-input-texts";
import stopMarioMoving from "../view-functions/stop-mario-moving";
import swapCloudsInCanvas from "../view-functions/swap-clouds-in-canvas";
import swapPipesInCanvas from "../view-functions/swap-pipes-in-canvas";

export default class View {
  constructor() {
    this.domElements = getMyElements();

    this.paintInput = {
      createNewNumberPipe: (numbers) => {
        createNewNumberPipe.call(this.domElements, numbers);
      },
      resetInputTexts: () => {
        resetInputTexts.call(this.domElements);
      }
    };

    this.marioWorld = {
      stopMarioMoving,
    };
  }

  addEventListeners(handlers) {
    const { handleInput, handleClickBubbleButton, handleClickHelp, handleClickMergeButton } = handlers;

    this.domElements.wholeNumberInput.addEventListener("keyup", handleInput);
    this.domElements.bubbleButton.addEventListener("click", handleClickBubbleButton);
    this.domElements.mergeButton.addEventListener("click", handleClickMergeButton);
    this.domElements.helpButton.addEventListener("click", handleClickHelp);
  }

  toggleVisibility(element) {
    const target = this.domElements[element];
    target.classList.toggle("hidden");
  }

  displayMessage(target, message){
    this.domElements[target].textContent = message;
  }

  displayHelpMessage() {
    this.domElements.alretBox.textContent = getHelpMessage();
  }

  swapPipesInCanvas(first, second, index) {
    return swapPipesInCanvas(first, second, index);
  }

  changePipeToClouds() {
    return changePipeToClouds(this.domElements.sortingBoard);
  }

  swapCloudsInCanvas(result, beforeMerge) {
    return swapCloudsInCanvas(result, beforeMerge);
  }

  divideCloudsInCanvas(left, right) {
    return divideCloudsInCanvas(left, right);
  }
}
