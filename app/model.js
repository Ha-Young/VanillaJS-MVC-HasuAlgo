import MYAPP from './myapp';

export default class Model {
  constructor() {
    this.storage = [];
    this.sortedGraphStorage = [];
  }

  get() {
    return this.storage;
  }

  getValue(index) {
    return this.storage[index];
  }

  swap(left, right) {
    const graphTable = MYAPP.table.graph;
    graphTable.insertBefore(right, left);
  }

  set(string) {
    const splitted = string.split(',');
    for (const elem of splitted) {
      this.storage.push(Number(elem));
    }
  }

  swapIndex(leftValue, RightValue) {
    const temps = this.storage[leftValue];
    this.storage[leftValue] = this.storage[RightValue];
    this.storage[RightValue] = temps;
  }

  setSortedGraph(sortedGraph) {
    this.sortedGraphStorage.push(sortedGraph);
  }

  getSortedGraph() {
    return this.sortedGraphStorage;
  }
}
