import MYAPP from './myapp';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.selectedType = null;
  }

  run() {
    let isStartBtnClicked = false;
    this.checkSortType();
    MYAPP.button.start.addEventListener('click', async () => {
      const isUserSelectType = this.selectedType;
      const isUserPutValue = MYAPP.table.input.value;
      const localStorage = this.model.get();

      if (isStartBtnClicked) {
        this.view.renderErrorMsg('Already clicked!');
        throw new Error('Already clicked!');
      }

      if (!isUserSelectType) {
        this.view.renderErrorMsg('Select sort type first!');
        throw new Error('Select sort type first');
      }

      if (!isUserPutValue) {
        this.view.renderErrorMsg('Please insert value!');
        throw new Error('Please insert value');
      }

      if (this.checkSortType() === 'BUBBLE') {
        this.init();
        this.bubbleSort();
      }

      if (this.checkSortType() === 'QUICK') {
        this.init();
        await this.quickSort(localStorage);
        this.view.renderAllColor(MYAPP.table.graph);
      }

      isStartBtnClicked = true;
    });
  }

  checkSortType() {
    MYAPP.button.bubbleSort.addEventListener('click', () => {
      this.selectedType = 'BUBBLE';
      this.view.changeButtonState(this.selectedType);
    });

    MYAPP.button.quickSort.addEventListener('click', () => {
      this.selectedType = 'QUICK';
      this.view.changeButtonState(this.selectedType);
    });

    return this.selectedType;
  }

  init() {
    const userInputValue = MYAPP.table.input.value;
    const localStorage = this.model.get();

    this.model.set(userInputValue);
    this.view.renderGraphs(localStorage);
  }

  async bubbleSort() {
    const graphTable = MYAPP.table.graph;
    const graph = MYAPP.table.graph.children;
    const numberGraphs = MYAPP.table.graph.children.length;
    const localStorage = this.model.get();

    for (let i = 0; i < numberGraphs; i++) {
      const outerLoopEnd = numberGraphs - 1;
      for (let j = 0; j < numberGraphs - 1 - i; j++) {
        const left = graph[j];
        const right = graph[j + 1];
        const leftValue = Number(left.dataset.id);
        const rightValue = Number(right.dataset.id);
        const sortedGraphs = this.model.getSortedGraph();
        const innerLoopEnd = numberGraphs - 2 - i;

        this.view.clearAllColor(graphTable);
        this.view.renderCurrentColor(left, right);
        await this.wait(800);

        if (leftValue > rightValue) {
          this.view.renderSwapAnimation(left, right);
          await this.wait(1000);
          this.model.swapIndex(j, j + 1);
          this.view.renderGraphs(localStorage, sortedGraphs);
        }

        if (j === innerLoopEnd) {
          const sortedGraph = graph[numberGraphs - i - 1];
          const sortedGraphValue = Number(sortedGraph.dataset.id);

          this.model.setSortedGraph(sortedGraphValue);
          this.view.renderGraphs(localStorage, sortedGraphs);
        }
      }
      if (i === outerLoopEnd) {
        this.view.renderFirstGraphColor(graph);
      }
    }
  }

  async quickSort(array, left = 0, right = this.model.get().length - 1) {
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
    console.log(`array: ${array}, left: ${left}, leftValue: ${array[left]}, pivot: ${pivot}, right:${right},rightValue: ${array[right]}`)
    while (left <= right) { //left 포인터가 right를 넘는 순간 left 포인터를 리턴
      while (array[left] < pivot) {  // 왼쪽에 있는 숫자들 중에서 pivot보다 큰 숫자 찾을때까지
        left++;
      }
      while (array[right] > pivot) {  // 오른쪽에 있는 숫자들 중에서 pivot보다 작은 숫자 찾을때까지
        right--;
      }
      if (left <= right) {  // 왼쪽 오른쪽 바꿈
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
