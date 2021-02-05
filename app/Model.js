
export default function Model() {
  this.userInputList = [];
  this.userInputElements = [];
}

Model.prototype.getUserInputList = function() {
  return this.userInputList;
}

Model.prototype.setUserInputList = function(newUserInputList) {
  this.userInputList = newUserInputList;
}

Model.prototype.setUserInputElements = function(newUserInputElements) {
    this.userInputElements = newUserInputElements
};

Model.prototype.getUserInputElements = function() {
    return this.userInputElements;
};
