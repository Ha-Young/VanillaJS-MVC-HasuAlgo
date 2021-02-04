import BubbleModel from "./bubbleModel";
import InsertionModel from "./insertionModel";
import MergeModel from "./mergeModel";
import QuickModel from "./quickModel";

const Model = function () {
  this.inputArray = [];
};

Model.prototype.setSortStyle = function (sortStyle) {
  switch (sortStyle) {
    case "bubble":
      this.bubbleModel = new BubbleModel();
      break;

    case "insertion":
      this.insertionModel = new InsertionModel();
      break;

    case "merge":
      this.mergeModel = new MergeModel();
      break;

    case "quick":
      this.quickModel = new QuickModel();
      break;

    default:
      break;
  }
};

export default Model;
