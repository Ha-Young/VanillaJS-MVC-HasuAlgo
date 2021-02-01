export default function Model () {
  this._storage = {};
}

Model.prototype.set = function (key, value, callback) {
  if (typeof key !== "string") {
    throw new Error("The key argument must be a string");
  }

  if (callback && typeof callback !== "function") {
    throw new Error("The callback is not a function.");
  }

  let newValue = {};

  switch (key) {
    case "submittedData":
      const inputedNums = value.inputedNums
        .replace(/ /g, "")
        .split(",")
        .map((numString) => parseInt(numString, 10))
        .filter((num) => num)

      if (inputedNums.length < 5 || inputedNums.length > 10) {
        return false;
      }
      
      const max = Math.max(inputedNums);

      newValue = {
        inputedNums,
        sortType: value.sortType,
        max,
      }

      break;
    default:
      throw new Error("invalid Key!");
  }

  Object.assign(this._storage, newValue);
}

Model.prototype.get = function (key) {
  return this._storage[key];
}
