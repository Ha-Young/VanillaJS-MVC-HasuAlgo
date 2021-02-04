export const Model = function() {
  this.storage = [];
  this._saveStorage = [];
  this.stepStorage = {};
}

Model.prototype.create = function(n) {
  this.storage.push(n);
};

Model.prototype.delete = function() {
  this.storage.pop();
};

Model.prototype.size = function() {
  return this.storage.length;
};

Model.prototype.clear = function() {
  this.storage = [];
  this.saveStorage = [];
  this.stepStorage = {};
};

Model.prototype.update = function(i, sorting) {
  this.storage = sorting;
  this.stepStorage[i] = sorting;
};

Model.prototype.get = function() {
  return this.storage;
};

Model.prototype.getStep = function(i) {
  return this.stepStorage[i];
};

Model.prototype.save = function() {
  this._saveStorage = this.storage;
};

Model.prototype.getSave = function() {
  return this._saveStorage;
};

Model.prototype.set = function(array) {
  this.storage = array;
};