export default function BubbleModel() {
  this._storage = null;
}

BubbleModel.prototype.get = function () {
  return this._storage;
};

BubbleModel.prototype.set = function (dataSet) {
  this._storage = dataSet;

  return this;
};

BubbleModel.prototype.swap = function (left, right) {
  const temp = this._storage[left];

  this._storage[left] = this._storage[right];
  this._storage[right] = temp;

  return this;
};
