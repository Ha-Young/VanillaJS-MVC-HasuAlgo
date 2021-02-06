import { delay, swap } from './utils/commonUtils';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.bindUpdateTotalStates(this.onUpdateTotalStates);
    this.model.bindDisplayNodeList(this.onDisplayNodeList);
    this.view.bindStartSort(this.handleStartSort);
    this.view.bindInputNumbersAndValidate(this.handleAddNumberList);
  }

  handleAddNumberList = (numberLists) => {
    this.model.addList(numberLists);
  }

  handleaddSortingState = (state) => {
    this.model.addSortingState(state);
  }

  onDisplayNodeList = (nodes) => {
    this.view.displayNodes(nodes);
  }

  onUpdateTotalStates = async (states) => {
    while ((states.length)) {
      const state = states.shift();

      if (!state) {
        throw new Error ('States have error!');
      }

      await this.view.render(state);
    }
  }

  handleStartSort = () => {
    switch (this.view.selector.value) {
      case 'bubble-sort': {
        this.bubbleSort();
        break;
      }
      case 'quick-sort': {
        this.quickSort();
        break;
      }
      default: {
        break;
      }
    }
  }

  bubbleSort = () => {
    const nodeList = this.model.lists;
    this.handleaddSortingState(['startSort']);

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = 0; j < nodeList.length - i - 1; j++) {
        this.handleaddSortingState(['onLightNode', j]);
        this.handleaddSortingState(['onLightNode', j + 1]);

        if (nodeList[j] > nodeList[j + 1]) {
          swap(nodeList, j, j + 1);

          this.handleaddSortingState(['changeNodes', j, j + 1]);
        }

        if ((j + 1) === nodeList.length - i - 1) {
          this.handleaddSortingState(['checkSortedNode', j + 1]);
        }

        this.handleaddSortingState(['offLightNode', j]);
      }
    }

    this.handleaddSortingState(['finishAllSort']);
    this.onUpdateTotalStates(this.model.sortStates);
  }

  quickSort = async () => {
    const ASYNC_DELAY_SECONDS = 100;

    const partition = async (arr, left, right) => {
      const middle = Math.floor((left + right) / 2);
      const pivot = arr[middle];

      this.handleaddSortingState(['onLightNode', middle]);

      while (left <= right) {
        while (arr[left] < pivot) {
          this.handleaddSortingState(['onLightNode', left]);
          this.handleaddSortingState(['offLightNode', left]);

          left++;
        }

        while (arr[right] > pivot) {
          this.handleaddSortingState(['onLightNode', right]);
          this.handleaddSortingState(['offLightNode', right]);

          right--;
        }

        await delay(ASYNC_DELAY_SECONDS);

        if (left <= right) {
          if (left !== right) {
            swap(arr, left, right);
            this.handleaddSortingState(['changeNodes', left, right]);
          }

          left++;
          right--;
        }
      }

      this.handleaddSortingState(['offLightNode', middle]);

      return left;
    };

    const recurseQuickSort = async (arr, left, right) => {
      const pivot = await partition(arr, left, right);

      if (left < pivot - 1) {
        await recurseQuickSort(arr, left, pivot - 1);
      }

      if (right > pivot) {
        await recurseQuickSort(arr, pivot, right);
      }
      return arr;
    };

    this.handleaddSortingState(['startSort']);

    await recurseQuickSort(this.model.lists, 0, this.model.lists.length - 1);

    this.handleaddSortingState(['finishAllSort']);
    this.onUpdateTotalStates(this.model.sortStates);
  }
}
