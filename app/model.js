export default function Model() {
  this.storage = {};
};

Model.prototype.loadDataFromController = function () { // this = model
  this.storage['manipulatedData'] = arguments[0];
  console.log(arguments[1])
  this.storage['radioButtonData'] = arguments[1];
}
