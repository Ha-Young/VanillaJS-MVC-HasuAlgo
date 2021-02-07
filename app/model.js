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
      throw new Error('Input length exceeds 10');
    }

    this.addNewNodes(this.lists);
  }

  addSortingState(state) {
    this.sortStates.push(state);
  }

  bindDisplayNodeList(callback) {
    this.onDisplayNodeList = callback;
  }

  bindUpdateTotalStates(callback) {
    this.onUpdateTotalStates = callback;
  }
}
