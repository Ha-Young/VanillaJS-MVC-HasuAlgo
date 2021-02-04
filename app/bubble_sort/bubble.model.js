export default function BubbleModel() {
  this._storage = null;
}

BubbleModel.prototype.getData = function () {
  return this._storage;
};

BubbleModel.prototype.setData = function (dataSet) {
  this._storage = dataSet;
};

BubbleModel.prototype.swap = function (left, right) {
  const temp = this._storage[left];

  this._storage[left] = this._storage[right];
  this._storage[right] = temp;

  return this;
};
