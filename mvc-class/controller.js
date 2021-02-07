import handleInput from "../controller-functions/handle-input";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.eventHandlers = {
      handleInput: (e) => {
        handleInput.call(this, e);
      },
      handleClickBubbleButton: () => {
        this.model.runBubbleSort();
        this.view.toggleVisibility("startForm");
      }, 
      handleClickMergeButton: () => {
        this.model.runMergeSort();
        this.view.toggleVisibility("startForm");
        this.view.sortAnimation.merge.changePipeToClouds();
      },
      handleClickHelp: () => {
        this.view.displayHelpMessage();
      },
    }
    this.view.addEventListeners(this.eventHandlers);
  }
}
