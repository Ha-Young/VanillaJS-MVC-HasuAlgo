import { delay, swap } from './utils/commonUtils';
import { sortType, uiState } from './constants/constants';

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

  handleAddingSortState = (state) => {
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
      case sortType.BUBBLE_SORT: {
        this.bubbleSort();
        break;
      }
      case sortType.QUICK_SORT: {
        this.quickSort();
        break;
      }
      default: {
        console.warn('Please check sort type');
      }
    }
  }

  bubbleSort = () => {
    const nodeList = this.model.lists;
    this.handleAddingSortState([uiState.START_SORT]);

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = 0; j < nodeList.length - i - 1; j++) {
        this.handleAddingSortState([uiState.ON_LIGHT_NODE, j]);
        this.handleAddingSortState([uiState.ON_LIGHT_NODE, j + 1]);

        if (nodeList[j] > nodeList[j + 1]) {
          swap(nodeList, j, j + 1);

          this.handleAddingSortState([uiState.CHANGE_NODES, j, j + 1]);
        }

        if ((j + 1) === nodeList.length - i - 1) {
          this.handleAddingSortState([uiState.CHECK_SORTED_NODES, j + 1]);
        }

        this.handleAddingSortState([uiState.OFF_LIGHT_NODE, j]);
      }
    }

    this.handleAddingSortState([uiState.FINISH_ALL_SORT]);
    this.onUpdateTotalStates(this.model.sortStates);
  }

  quickSort = async () => {
    const ASYNC_DELAY_SECONDS = 100;

    const partition = async (arr, left, right) => {
      const middle = Math.floor((left + right) / 2);
      const pivot = arr[middle];

      this.handleAddingSortState([uiState.ON_LIGHT_NODE, middle]);

      while (left <= right) {
        while (arr[left] < pivot) {
          this.handleAddingSortState([uiState.ON_LIGHT_NODE, left]);
          this.handleAddingSortState([uiState.OFF_LIGHT_NODE, left]);

          left++;
        }

        while (arr[right] > pivot) {
          this.handleAddingSortState([uiState.ON_LIGHT_NODE, right]);
          this.handleAddingSortState([uiState.OFF_LIGHT_NODE, right]);

          right--;
        }

        await delay(ASYNC_DELAY_SECONDS);

        if (left <= right) {
          if (left !== right) {
            swap(arr, left, right);
            this.handleAddingSortState([uiState.CHANGE_NODES, left, right]);
          }

          left++;
          right--;
        }
      }

      this.handleAddingSortState([uiState.OFF_LIGHT_NODE, middle]);

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

    this.handleAddingSortState([uiState.START_SORT]);

    await recurseQuickSort(this.model.lists, 0, this.model.lists.length - 1);

    this.handleAddingSortState([uiState.FINISH_ALL_SORT]);
    this.onUpdateTotalStates(this.model.sortStates);
  }
}
