import BubbleModel from "./bubbleModel";
import MergeModel from "./mergeModel";

const Model = function () {
  this.inputArray = [];
};

Model.prototype.setSortStyle = function (sortStyle) {
  switch (sortStyle) {
    case "bubble":
      this.bubbleModel = new BubbleModel();
      break;

    case "insertion":
      // this.insertionModel = new InsertionModel();
      break;

    case "merge":
      this.mergeModel = new MergeModel();
      break;

    case "quick":
      // this.quickModel = new QuickModel();
      break;

    default:
    // this.bubbleModel = new BubbleModel();
  }
};

export default Model;
