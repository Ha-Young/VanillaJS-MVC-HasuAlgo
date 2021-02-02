export default Model

function Model(storage) {
  this.storage = storage;
}

Model.prototype.create = function (title, callback) {}

Model.prototype.read = function (query, callback) {}

Model.prototype.update = function (id, data, callback) {}