import MYAPP from './myapp';

export default class Model {
  constructor() {
    const _userInputData = [];
    const _sortedGraphStorage = [];

    this.set = string => {
      const splitted = string.split(',');
      for (const elem of splitted) {
        _userInputData.push(Number(elem));
      }
      this.checkInput();
    };

    this.get = () => _userInputData;

    this.getValue = index => _userInputData[index];

    this.checkInput = () => {
      if (!_userInputData.every(elem => elem < 100)) {
        throw console.log('number is too high');
      }
      if (_userInputData.length > 8) {
        throw console.log('too many numbers');
      }
    };

    this.swapIndex = (leftValue, RightValue) => {
      const temps = _userInputData[leftValue];
      _userInputData[leftValue] = _userInputData[RightValue];
      _userInputData[RightValue] = temps;
    };

    this.setSortedGraph = sortedGraph => {
      _sortedGraphStorage.push(sortedGraph);
    };

    this.getSortedGraph = () => _sortedGraphStorage;
  }

  swap(left, right) {
    const graphTable = MYAPP.table.graph;
    graphTable.insertBefore(right, left);
  }

}
