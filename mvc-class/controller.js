import handleInput from "../controller-functions/handle-input";
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
        this.view.toggleVisibility("startForm");
      }, 
      handleClickMergeButton: () => {
        this.runMergeSort();
        this.view.toggleVisibility("startForm");
        this.view.sortAnimation.merge.changePipeToClouds();
      },
      handleClickHelp: () => {
        this.view.displayHelpMessage();
      },
    }
    this.view.addEventListeners(this.eventHandlers);
  }

  runMergeSort() {
    mergeSort(this.model.numbers);
  }
  
  runBubbleSort() {
    bubbleSort(this.model.numbers);
  }

}
