export default Model
export {modleInstance}

const modleInstance = new Model();

function Model(storage) {
  this.storage = [];
}

Model.prototype.create = function (title, callback) {}

Model.prototype.read = function (query, callback) {}

Model.prototype.update = function (id, data, callback) {}