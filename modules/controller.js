import UItaskQueue from "../utils/taskQueue.js";

export default class Controller {
  "use strict";
  /**
   * Takes a model and view and acts as the controller between them
   *
   * @constructor
   * @param {object} model The model instance
   * @param {object} view The view instance
   */
  constructor(Model, View) {
    this.model = Model;
    this.view = View;
    this.viewEvents = ["formSubmit", "startSort"];
    this.taskQueue = new UItaskQueue();

    this.view.bind(this.viewEvents[0], (selection, input) => {
      this.setInitialState(selection, input);
    });

    this.view.bind(this.viewEvents[1], () => {
      this.startAnimation();
    });
  }

  setInitialState = (selection, input) => {
    this.model.create(selection, input, (data) => {
      this.view.render.clearBlocks();
      this.view.render.generateBlocks(data);
    });
  }

  startAnimation = () => {
    if (this.view.checkBlocksSorted()) {
      this.view.render.clearBlocks();
      this.model.reset();
      this.view.render.generateBlocks(this.model.getData());
    }

    const sortType = this.model.getSortType();

    switch (sortType) {
      case "Bubble Sort":
        this.model.bubbleSort(this.taskQueue, this.view);
        break;
      case "Insertion Sort":
        alert("Sorry for Inconviniece.\nIt's not ready yet.");
        break;
      case "Quick Sort":
        this.model.quickSort(this.taskQueue, this.view);
        break;
      case "Merge Sort":
        alert("Sorry for Inconviniece.\nIt's not ready yet.");
        break;
      default:
        throw new Error("Unavailable sort type. Please check the sort type.")
    }

    this.executeTask();
  }

  executeTask = async () => {
    let currentTask = this.taskQueue.dequeue();

    if (!currentTask) return;

    this.handleTask(currentTask);
    await this._wait(200);
    this.executeTask();
  }

  handleTask = (task) => {
    switch (task.name) {
      case "changeBlocksColor":
        this.view.changeBlocksColor.apply(this.view, task.parameters);
        break;
      case "revertBlocksColor":
        this.view.revertBlocksColor.apply(this.view, task.parameters);
        break;
      case "swapBlocks":
        this.view.swapBlocks.apply(this.view, task.parameters);
        break;
      case "decideSorted":
        this.view.decideSorted.apply(this.view, task.parameters);
        break;
      case "pointPivot":
        this.view.pointPivot.apply(this.view, task.parameters);
        break;
      case "partitionBlocks":
        this.view.partitionBlocks.apply(this.view, task.parameters);
        break;
      case "gatherBlocks":
        this.view.gatherBlocks.apply(this.view, task.parameters);
        break;
      case "enableInputs":
        this.view.enableInputs();
        break;
      case "disableInputs":
        this.view.disableInputs();
        break;
      default:
        throw new Error("Wrong task name");
    }
  }

  _wait(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    })
  }
}
