export class Model {
  constructor() {
    this.lists = [];
    this.sortState = []; // array 아니어도..
    this.sortType ='';
  }

  addNewNodes(lists) {
    // validation
    this.onDisplayNodeList(lists);
  }

  addNewState(state) {
    this.onUpdateState(state);
  }

  addNewSortType(type) {
    this.onUpdateSortType(type);
  }

  addList(lists) {
    this.lists = lists;
    this.addNewNodes(this.lists);
  }

  addSortType(type) {
    this.sortType = type;
    this.addNewSortType(this.sortType);
  }

  addState(state) {
    this.sortState = state;
    this.addNewState(this.sortState);
  }

  bindNodeListDisplayed(callback) {
    // validation
    this.onDisplayNodeList = callback;
  }

  bindState(callback) {
    this.onUpdateState = callback;
  }

  bindSortType(callback) {
    this.onUpdateSortType = callback;
  }
}
