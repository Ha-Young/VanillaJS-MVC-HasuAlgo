function createModel() {

  return {
    storage: [],
    sortedStorage: [],

    addList: function (list) {
      model.storage.push(list);
    },

    removeList: function () {
      model.sortedStorage.pop();
    }
  }
}

const model = createModel();

export {model};