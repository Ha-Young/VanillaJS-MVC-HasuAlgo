export class Model {
  constructor() {
    this.lists = [];
    this.sortState = []; // array 아니어도..
    this.sortType ='';
  }

  addNewNodes(lists) {
    this.onDisplayNodeList(lists);
  }

  pushStates(state) {
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
    this.sortState.push(state);
  }

  bindNodeListDisplayed(callback) {
    this.onDisplayNodeList = callback;
  }

  bindSortType(callback) {
    this.onUpdateSortType = callback;
  }

  bindStates(callback) {
    this.onUpdateStates = callback;
  }
}
