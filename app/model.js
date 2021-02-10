export default function Model () {
  const _storage = {};

  Model.prototype.set = function (key, value) {
    if (typeof key !== "string") {
      throw new Error("The key argument must be a string");
    }

    Object.assign(_storage, { [key]: value });
  };

  Model.prototype.get = function (key) {
    return _storage[key];
  };
}
