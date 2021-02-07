import MYAPP from './myapp';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.selectedType = null;
  }

  run() {
    MYAPP.button.start.addEventListener('click', function onclickStart() {
      this.init();
      this.handleValidationError();
      this.runSelectedSort();

      MYAPP.button.start.removeEventListener('click', onclickStart);
    }.bind(this));

    MYAPP.table.button.addEventListener('click', function onclickButton(e) {
      this.selectedType = e.target.textContent.toUpperCase();
      this.view.changeButtonState(this.selectedType);

      MYAPP.table.button.removeEventListener('click', onclickButton);
    }.bind(this));
  }

  handleValidationError() {
    const isUserSelectType = this.selectedType;
    const isUserPutValue = MYAPP.table.input.value;
    const maxNumberLengthLimit = 11;
    const maxNumberLImit = 100;
    const isNumbersValidate = this.model.storage.every(elem => elem < maxNumberLImit);

    if (this.isStartBtnClicked) {
      this.view.renderErrorMsg('Already clicked!');
    }
    if (!isUserSelectType) {
      this.view.renderErrorMsg('Select sort type first!');
    }
    if (!isUserPutValue) {
      this.view.renderErrorMsg('Please insert value!');
    }
    if (!isNumbersValidate) {
      this.view.renderErrorMsg('number is too high');
    }
    if (this.model.storage.length > maxNumberLengthLimit) {
      this.view.renderErrorMsg('too many numbers');
    }
  }

  init() {
    const userInputValue = MYAPP.table.input.value;
    const modelStorage = this.model.get();

    if (!userInputValue) {
      return;
    }

    this.model.set(userInputValue);
    this.view.renderGraphs(modelStorage);
  }

  async runSelectedSort() {
    if (this.selectedType === 'BUBBLE') {
      this.bubbleSort();
    }

    if (this.selectedType === 'QUICK') {
      await this.quickSort();
      this.view.renderAllColor(MYAPP.table.graph);
    }
  }

  async bubbleSort() {
    const graphTable = MYAPP.table.graph;
    const graph = MYAPP.table.graph.children;
    const graphTableLength = MYAPP.table.graph.children.length;
    const modelStorage = this.model.get();

    for (let i = 0; i < graphTableLength; i++) {
      const outerLoopEnd = graphTableLength - 1;
      for (let j = 0; j < graphTableLength - 1 - i; j++) {
        const left = graph[j];
        const right = graph[j + 1];
        const leftValue = Number(left.dataset.id);
        const rightValue = Number(right.dataset.id);
        const sortedGraphs = this.model.getSortedGraph();
        const innerLoopEnd = graphTableLength - 2 - i;

        this.view.clearAllColor(graphTable);
        this.view.renderCurrentColor(left, right);
        await this.wait(800);

        if (leftValue > rightValue) {
          this.view.renderSwapAnimation(left, right);
          await this.wait(1000);
          this.model.swapIndex(j, j + 1);
          this.view.renderGraphs(modelStorage, sortedGraphs);
        }

        if (j === innerLoopEnd) {
          const sortedGraph = graph[graphTableLength - i - 1];
          const sortedGraphValue = Number(sortedGraph.dataset.id);

          this.model.setSortedGraph(sortedGraphValue);
          this.view.renderGraphs(modelStorage, sortedGraphs);
        }
      }
      if (i === outerLoopEnd) {
        this.view.renderFirstGraphColor(graph);
      }
    }
  }

  async quickSort(array = this.model.get(), left = 0, right = this.model.get().length - 1) {
    const localStorage = this.model.get();
    const mid = Math.floor((left + right) / 2);
    const pivot = localStorage[mid];

    if (left >= right) {
      return;
    }

    const dividedArr = await this.divide(localStorage, left, right, pivot, mid);
    await this.quickSort(array, left, dividedArr - 1); // left
    await this.quickSort(array, dividedArr, right);

    return array;
  }

  async divide(array, left, right, pivot, mid) {
    const graph = MYAPP.table.graph.children;
    const graphTable = MYAPP.table.graph;

    this.view.clearAllColor(graphTable);
    while (left <= right) {
      while (array[left] < pivot) {
        left++;
      }
      while (array[right] > pivot) {
        right--;
      }
      if (left <= right) {
        this.view.renderPivotColor(graph[mid]);
        this.view.renderCurrentColor(graph[left], graph[right]);
        await this.wait(1000);
        this.view.renderSwapAnimation(graph[left], graph[right]);
        await this.wait(1000);
        this.model.swapIndex(left, right);
        this.view.renderGraphs(array);
        left++;
        right--;
      }
    }
    return left;
  }

  wait(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
