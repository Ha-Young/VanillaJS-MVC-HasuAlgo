function createModel() {
  let userInputList;

  return {
    storage: [],

    addList: function (list) {
      model.storage.push(list);
    },

    cacheUserInputList: function () {
      userInputList = model.storage.slice();
    },

    removeList: function () {
      model.storage.pop();
    },
  };
}

const model = createModel();

export {model};
