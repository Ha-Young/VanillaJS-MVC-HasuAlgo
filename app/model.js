export class Model {
  constructor() {
    this.lists = [];
    this.sortStates = [];
  }

  addNewNodes(lists) {
    this.onDisplayNodeList(lists);
  }

  addList(lists) {
    this.lists = [...this.lists, ...lists];

    if (this.lists.length > 10) {
      throw Error('Input Numbers exceed 10');
    }

    this.addNewNodes(this.lists);
  }

  addState(state) {
    this.sortStates.push(state);
  }

  bindDisplayNodeList(callback) {
    this.onDisplayNodeList = callback;
  }

  bindUpdateTotalStates(callback) {
    this.onUpdateTotalStates = callback;
  }

  pushNewStates(state) {
    this.onUpdateState(state);
  }
}
