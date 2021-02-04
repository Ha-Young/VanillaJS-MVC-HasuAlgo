export default function Model() {
  this._storage = null;
}

Model.prototype.getData = function () {
  return this._storage;
};

Model.prototype.setData = function (dataSet) {
  this._storage = dataSet;
};

Model.prototype.swap = function (left, right) {
  const temp = this._storage[left];

  this._storage[left] = this._storage[right];
  this._storage[right] = temp;

  return this;
};
