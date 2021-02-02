export class Model {
  constructor() {
    this.lists = [];
    this.sortState = [];
  }

  addNewNodes(lists) {
    // validation
    this.onNodeListsDisplay(lists);
  }

  addNewState(state) {
    this.onUpdateState(state);
  }

  addList(lists) {
    // validation
    const listArray = lists.split(',').map(item => Number(item));

    this.lists = listArray;
    this.addNewNodes(this.lists);
  }

  addState(state) {
    this.sortState = state;
    this.addNewState(this.sortState);
  }

  bindNodeListDisplayed(callback) {
    // validation
    this.onNodeListsDisplay = callback;
  }

  bindState(callback) {
    this.onUpdateState = callback;
  }
}