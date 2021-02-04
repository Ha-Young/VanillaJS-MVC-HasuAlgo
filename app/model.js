export default class Model {
  constructor() {
    this._storage = {};
    this._temp = {};
  }

  setProperty(sortType, key, value) {
    if (Object.hasOwnProperty(this._storage[sortType])) {
      this._storage[sortType][key] = value;
      return;
    }
    this._storage[sortType] = {};
    this._storage[sortType][key] = value;
  }

  getProperty(sortType, key) {
    return this._storage[sortType][key];
  }

  setValueToCollection(sortType) {
    this._storage[sortType].collection = [];
    const collection = this._storage[sortType].collection;
    const value = this._storage[sortType].value + ",";
    let index = 0;
    let stringNum = "";

    for (const number of value) {
      if (!Number.isNaN(+number) && typeof +number === "number" && number !== " ") {
        stringNum = number && stringNum + number;
        continue;
      }

      if (stringNum) {
        collection.push({
          index: index,
          value: +stringNum,
        });
        index++;
        stringNum = "";
      }
    }
  }

  getSortedValue() {
    const userValue = this._storage[this._temp.sortType].value;
    userValue;
  }


  bubble (callback) {
    const collection = this._storage.bubble.collection;

    if (this._storage.bubble.changedIndex === undefined) {
      this._storage.bubble.changedIndex = 0;
      this._storage.bubble.sortedLength = collection.length;
    }

    let i = this._storage.bubble.changedIndex;

    for (i; i < collection.length - 1; i++) {
      const front = collection[i].value;
      const rear = collection[i + 1].value;

      if (front > rear) {
        this._storage.bubble.changedIndex = i + 1;
        [collection[i], collection[i + 1]] = [collection[i + 1], collection[i]];
        callback("changed", "bubble", i);
        return;
      }
    }

    for (let j = 0; j < this._storage.bubble.sortedLength - 1; j++) {
      const front = collection[j].value;
      const rear = collection[j + 1].value;

      if (front > rear) {
        this._storage.bubble.changedIndex = 0;
        this._storage.bubble.sortedLength--;
        callback("semifinished", "bubble", this._storage.bubble.sortedLength);
        return;
      }
    }
    callback("finished", "bubble", this._storage.bubble.sortedLength);
  }

  clearData(callback) {
    delete this._storage.userInputs;
    callback();
  }


}