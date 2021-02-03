import BubbleController from "./bubbleController";
import MergeController from "./mergeController";

const Controller = function (model, view) {
  const self = this;
  self.model = model;
  self.view = view;
};

Controller.prototype.setView = function (locationHash) {
  const route = locationHash.split("/")[1];
  const page = route || "";
  this.setSortStyle(page);
};

Controller.prototype.setSortStyle = function (sortStyle) {
  this.model.setSortStyle(sortStyle);
  this.view.setSortStyle(sortStyle);

  switch (sortStyle) {
    case "bubble":
      this.bubbleController = new BubbleController(
        this.model.bubbleModel,
        this.view.bubbleView
      );
      break;

    case "insertion":
      // this.insertionController = new InsertionController(
      //   this.model.insertionModel,
      //   this.view.insertionView
      // );
      break;

    case "merge":
      this.mergeController = new MergeController(
        this.model.mergeModel,
        this.view.mergeView
      );
      break;

    case "quick":
      // this.quickController = new QuickController(
      //   this.model.quickModel,
      //   this.view.quickView
      // );
      break;

    default:
      break;
  }
};

export default Controller;
