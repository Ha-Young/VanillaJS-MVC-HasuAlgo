import handleInput from "../controller-functions/input-handler";
import bubbleSort from "../controller-functions/bubble-sort";
import mergeSort from "../controller-functions/merge-sort";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.eventHandlers = {
      handleInput: (e) => {
        handleInput.call(this, e);
      },
      handleClickBubbleButton: () => {
        this.runBubbleSort();
        this.view.toggleVisibility("mergeButton");
        this.view.toggleVisibility("bubbleButton");
      }, 
      handleClickMergeButton: () => {
        this.runMergeSort();
        this.view.toggleVisibility("mergeButton");
        this.view.toggleVisibility("bubbleButton");
        this.view.changePipeToClouds();
      },
      handleClickHelp: () => {
        this.view.displayHelpMessage();
      },
    };

    this.view.addEventListeners(this.eventHandlers);
  }

  checkInputValidation(input) {
    if (input.length < 5) {
      return [false, this.model.errors.inputNotEnough];
    }

    if (input.length > 10) {
      return [false, this.model.errors.inputOverLimit];
    }

    return [true];
  }

  runMergeSort() {
    mergeSort.call(this, this.model.numbers);
  }
  
  runBubbleSort() {
    bubbleSort.call(this, this.model.numbers);
  }
}
