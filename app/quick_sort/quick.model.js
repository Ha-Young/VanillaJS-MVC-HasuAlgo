import BubbleModel from "../bubble_sort/bubble.model.js";

export default function QuickModel() {
  this._storage = null;
}

QuickModel.prototype = Object.create(BubbleModel.prototype);
QuickModel.prototype.constructor = QuickModel;

// QuickModel.prototype.get = function () {
//   return this._storage;
// };

// QuickModel.prototype.set = function (dataSet) {
//   this._storage = dataSet;

//   return this;
// };

// QuickModel.prototype.swap = function (left, right) {
//   const temp = this._storage[left];

//   this._storage[left] = this._storage[right];
//   this._storage[right] = temp;

//   return this;
// };
