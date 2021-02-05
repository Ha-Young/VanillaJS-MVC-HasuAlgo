export default function Model() {
  this.storage = {};
};

Model.prototype.loadDataFromController = function () {
  this.storage['sortData'] = arguments[0];
  this.storage['sortOption'] = arguments[1];
}
