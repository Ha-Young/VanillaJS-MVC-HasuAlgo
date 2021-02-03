export default class Model {
  constructor() {
    this._storage = {};
    this._temp = {};
  }

  saveData(callback) {
    const hasUserSort = !!this._temp.userSort || !!this._storage.userSort;
    if (!hasUserSort) {
      alert("select Sort!");
      return;
    }
    this._storage.userInputs = [];
    const userInputs = this._storage.userInputs;
    const datum = this._temp.userInputs.split(",");
    let count = 0;
    for (const data of datum) {
      if ( typeof +data === "number" && data !== "") {
        userInputs.push({
          index: count,
          value: +data,
        });
        count++;
      }
    }

    if (5 <= count && count <= 10) {
      this._storage.userSort = this._temp.userSort;
      delete this._temp.userSort;
      callback(this._storage.userSort, userInputs);
      return;
    }
    delete this._storage.userInputs;
    alert("Suitalbe Length!");
  }

  _sort(sortType, callback) {
    switch (sortType) {
      case "bubble":
        if (this._storage.changedIndex === undefined) {
          this._storage.changedIndex = 0;
        }
        const userInputs = this._storage.userInputs;
        let i = this._storage.changedIndex;
        for (i; i < userInputs.length; i++) {
          this._storage.changedIndex = i;
          const front = userInputs[i];
          const rear = userInputs[i + 1];
          const hasRear = !!rear;
          if (hasRear && front.value > rear.value) {
            [userInputs[i], userInputs[i + 1]] = [rear, front];
            callback(sortType, i);
            return;
          }
        }
    }
  }

  clearData(callback) {
    delete this._storage.userInputs;
    callback();
  }


}