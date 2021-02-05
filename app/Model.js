
export default function Model() {
  this.userInputList = [];
}

Model.prototype.getUserInputList = function() {
  return this.userInputList;
}

Model.prototype.setUserInputList = function(newUserInputList) {
  this.userInputList = newUserInputList;
}
