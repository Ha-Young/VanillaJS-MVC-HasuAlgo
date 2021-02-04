function createModel() {
  const storage = [];
  const sortedStorage = [];

  return {
    addList: function (list) {
      storage.push(list);
    },

    removeList: function () {
      sortedStorage.pop();
    },

    sendStorage: function () {
      return storage;
    },

    sendSortedStorage: function () {
      return sortedStorage;
    }
  }
}

const model = createModel();

export {model};