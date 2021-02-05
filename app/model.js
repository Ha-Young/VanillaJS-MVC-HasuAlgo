export default class Model {
  constructor() {
    this._storage = {};
    this._temp = {};
  }

  setProperty(sortType, key, value) {
    if (this._storage.hasOwnProperty(sortType)) {
      this._storage[sortType][key] = value;
      return this._storage[sortType];
    }
    this._storage[sortType] = {};
    this._storage[sortType][key] = value;
    return this._storage[sortType];
  }

  getProperty(sortType, key) {
    if (this._storage.hasOwnProperty(sortType)){
      return this._storage[sortType][key];
    }
  }

  clearProperty(sortType) {
    delete this._storage[sortType];
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

  insertion(callback) {
    const collection = this._storage.insertion.collection;

    if (this._storage.insertion.changedIndex === undefined) {
      this._storage.insertion.changedIndex = 0;
      this._storage.insertion.sortedIndex = 0;
      this._storage.insertion.isSorting = false;
      callback("semifinished", "insertion", this._storage.insertion.sortedIndex);
      return;
    }

    const isSorting = this._storage.insertion.isSorting;
    let sortedIndex = this._storage.insertion.sortedIndex;
    let j = 0;

    if (isSorting) {
      for (j; j < sortedIndex; j++) {
        const front = collection[j].value;
        const rear = collection[j + 1].value;

        if (front > rear) {
          this._storage.insertion.changedIndex = j;
          [collection[j], collection[j + 1]] = [collection[j + 1], collection[j]];
          callback("changed", "insertion", j);
          return;
        }
      }
    }

    if (!isSorting) {
      for (sortedIndex; sortedIndex < collection.length - 1; sortedIndex++) {
        const front = collection[sortedIndex].value;
        const rear = collection[sortedIndex + 1].value;

        if (front > rear) {
          this._storage.insertion.isSorting = true;
          this._storage.insertion.sortedIndex = sortedIndex + 1;
          this._storage.insertion.changedIndex = sortedIndex;
          [collection[sortedIndex], collection[sortedIndex + 1]] = [collection[sortedIndex + 1], collection[sortedIndex]];
          callback("changed", "insertion", sortedIndex);
          return;
        }
      }
    }

    if (this._storage.insertion.sortedIndex === j) {
      callback("semifinished", "insertion", this._storage.insertion.changedIndex);
      this._storage.insertion.isSorting = false;
      return;
    }

    callback("finished", "insertion", 0);
  }
}