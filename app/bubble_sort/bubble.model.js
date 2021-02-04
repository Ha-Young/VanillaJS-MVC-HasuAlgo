import Model from "../model.js";

export default function BubbleModel() {
  this._storage = null;
}

BubbleModel.prototype = Object.create(Model.prototype);
BubbleModel.prototype.constructor = BubbleModel;
