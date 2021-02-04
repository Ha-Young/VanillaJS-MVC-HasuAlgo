import MYAPP from "./myapp";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.selectedType = null;
    this.storage = this.model.get();
  }

  checkSortType() {
    MYAPP.button.bubbleSort.addEventListener("click", () => {
      this.selectedType = 'Bubble';
      this.view.changeButtonState(this.selectedType);
    });

    MYAPP.button.quickSort.addEventListener("click", () => {
      this.selectedType = 'Quick';
      this.view.changeButtonState(this.selectedType);
    });

    return this.selectedType;
  }

  run() {
    let isClicked = false;
    this.checkSortType();

    MYAPP.button.start.addEventListener("click", () => {
      if (!this.selectedType) {
        throw new Error('select sort type first');
      }

      if (isClicked) {
        throw new Error('already clicked!');
      }

      if (!MYAPP.table.input.value) {
        throw new Error('please insert value');
      }

      if (this.checkSortType() === 'Bubble') {
        console.log('bubble selected!');
        this.init();
        this.bubbleSort();
      }

      if (this.checkSortType() === 'Quick') {
        this.init();
        this.quickSort(this.storage);
        console.log('fucking recursion');
        //this.view.renderAllColor(MYAPP.table.graph);

      }

      isClicked = true;
    });
  }

  init() {
    const userInputValue = MYAPP.table.input.value;
    this.model.set(userInputValue);
    this.view.renderGraphs(this.storage);
  }

  async bubbleSort() {
    const numberGraphs = MYAPP.table.graph.children.length;
    const graph = MYAPP.table.graph.children;
    const graphTable = MYAPP.table.graph;

    for (let i = 0; i < numberGraphs; i++) {
      for (let j = 0; j < numberGraphs - 1 - i; j++) {
        const left = graph[j];
        const right = graph[j + 1];
        const leftValue = Number(left.dataset.id);
        const rightValue = Number(right.dataset.id);
        const sortedGraphs = this.model.getSortedGraph();

        this.view.clearAllColor(graphTable);
        await this.view.renderDefaultColor(left, right);

        if (leftValue > rightValue) {
          await this.view.renderSwapAnimation(left, right);
          this.model.swapIndex(j, j + 1);
          await this.view.renderGraphs(this.storage, sortedGraphs);
        }

        if (j === numberGraphs - 2 - i) {
          console.log(j);
          const sortedGraph = graph[numberGraphs - i - 1];
          const sortedGraphValue = Number(sortedGraph.dataset.id);
          this.model.setSortedGraph(sortedGraphValue);

          await this.view.renderGraphs(this.storage, sortedGraphs);
        }
      }

      console.log(`${i}회전한 결과는 ${this.graphTable}---------------------------`);

      if (i === numberGraphs - 1) {
        console.log('final');
        await this.view.renderFirstGraph(graph);
      }
    }
  }

  async quickSort(array, left = 0, right = this.storage.length - 1) {
    console.log('fucking recursion');
    console.log('left', left);
    const mid = Math.floor((left + right) / 2);
    const pivot = this.storage[mid];
    const graphTable = MYAPP.table.graph;
    console.log(this.view);

    if (left >= right) {
      return;
    }

    console.log('given storage to quicksort is', array);

    const dividedArr = await this.divide(this.storage, left, right, pivot, mid);
    console.log('divided = ', dividedArr);
    this.quickSort(array, left, dividedArr - 1); // left
    this.quickSort(array, dividedArr, right);

    //this.view.renderAllColor(graphTable);
    return array;
  }

  async divide(array, left, right, pivot, mid) {
    console.log('divdied!!!!!!');
    const numberGraphs = MYAPP.table.graph.children.length;
    const graph = MYAPP.table.graph.children;
    const graphTable = MYAPP.table.graph;

    this.view.clearAllColor(graphTable);

    console.log(this);
    console.log(`array: ${array}, left: ${left}, leftValue: ${array[left]}, pivot: ${pivot}, right:${right},rightValue: ${array[right]}`)
    while (left <= right) { //left 포인터가 right를 넘는 순간 left 포인터를 리턴
      while (array[left] < pivot) {  // 왼쪽에 있는 숫자들 중에서 pivot보다 큰 숫자 찾을때까지
        left++;
      }
      while (array[right] > pivot) {  // 오른쪽에 있는 숫자들 중에서 pivot보다 작은 숫자 찾을때까지
        right--;
      }
      if (left <= right) {  // 왼쪽 오른쪽 바꿈
        await this.view.renderPivotColor(graph[mid]);
        await this.view.renderDefaultColor(graph[left], graph[right]);
        await this.view.renderSwapAnimation(graph[left], graph[right]);
        this.model.swapIndex(left, right);
        await this.view.renderGraphs(array);
        left++;
        right--;
      }
    }
    return left;
  }
}
