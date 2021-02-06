import MYAPP from "./myapp";

export default class Model {
  constructor() {
    const _localStorage = [];
    const _sortedGraphStorage = [];

    this.get = () => _localStorage;

    this.getValue = (index) => _localStorage[index];

    this.checkInput = () => {
      if (!_localStorage.every((elem) => elem < 100)) {
        throw new Error("number is too high");
      }
      if (_localStorage.length > 8) {
        throw new Error("too many numbers");
      }
    };

    this.swapIndex = (leftValue, RightValue) => {
      const temps = _localStorage[leftValue];
      _localStorage[leftValue] = _localStorage[RightValue];
      _localStorage[RightValue] = temps;
    };

    this.setSortedGraph = (sortedGraph) => {
      _sortedGraphStorage.push(sortedGraph);
    };

    this.getSortedGraph = () => _sortedGraphStorage;
  }

  swap(left, right) {
    const graphTable = MYAPP.table.graph;
    graphTable.insertBefore(right, left);
  }

  set(string) => {
    const splitted = string.split(",");
    for (const elem of splitted) {
      _localStorage.push(Number(elem));
    }
    this.checkInput();
  };
}
