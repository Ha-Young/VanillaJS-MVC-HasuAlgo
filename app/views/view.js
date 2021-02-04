import { Template } from "../template";
import BubbleView from "./bubbleView";
import InsertionView from "./insertionView";
import MergeView from "./mergeView";
import QuickView from "./quickVIew";

const View = function () {
  this.template = new Template();
  this.$sortSpace = qs(".sort-space");
};

View.prototype.setSortStyle = function (sortStyle) {
  switch (sortStyle) {
    case "bubble":
      this.$sortSpace.innerHTML = this.template.bubbleTemplate;
      this.bubbleView = new BubbleView();
      break;

    case "insertion":
      this.$sortSpace.innerHTML = this.template.insertionTemplate;
      this.insertionView = new InsertionView();
      break;

    case "merge":
      this.$sortSpace.innerHTML = this.template.mergeTemplate;
      this.mergeView = new MergeView();
      break;

    case "quick":
      this.$sortSpace.innerHTML = this.template.quickTemplate;
      this.quickView = new QuickView();
      break;

    default:
      self.$sortSpace.innerHTML = self.template.defaultTemplate;
  }
};

export default View;
