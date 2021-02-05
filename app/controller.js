import { delay, swap } from './utils/commonUtils';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.bindUpdateTotalStates(this.onUpdateTotalStates);
    this.model.bindDisplayNodeList(this.onDisplayNodeList);
    this.view.bindStartSort(this.handleStartSort);
    this.view.bindInputNumbers(this.handleAddNumberList);
  }

  handleAddNumberList = (numberLists) => {
    this.model.addList(numberLists);
  }

  handleAddState = (state) => {
    this.model.addState(state);
  }

  onDisplayNodeList = (nodes) => {
    this.view.displayNodes(nodes);
  }

  onUpdateTotalStates = async (states) => {
    for (let i = 0; i < states.length; i++) {
      if (!states[i]) {
        throw new Error ('States have error!');
      }

      await this.view.render(states[i]);
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
    }
  }

  bubbleSort = () => {
    const nodeList = this.model.lists;
    this.handleAddState(['startSort']);

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = 0; j < nodeList.length - i - 1; j++) {
        this.handleAddState(['onLightNode', j]);
        this.handleAddState(['onLightNode', j + 1]);

        if (nodeList[j] > nodeList[j + 1]) {
          swap(nodeList, j, j + 1);

          this.handleAddState(['changeNodes', j, j + 1]);
        }

        if ((j + 1) === nodeList.length - i - 1) {
          this.handleAddState(['checkSortedNode', j + 1]);
        }

        this.handleAddState(['offLightNode', j]);
      }
    }

    this.handleAddState(['finishAllSort']);
    this.onUpdateTotalStates(this.model.sortStates);
  }

  quickSort = async () => {
    const ASYNC_DELAY_SECONDS = 100;

    const partition = async (arr, left, right) => {
      const middle = Math.floor((left + right) / 2);
      const pivot = arr[middle];

      this.handleAddState(['onLightNode', middle]);

      while (left <= right) {
        while (arr[left] < pivot) {
          this.handleAddState(['onLightNode', left]);
          this.handleAddState(['offLightNode', left]);

          left++;
        }

        while (arr[right] > pivot) {
          this.handleAddState(['onLightNode', right]);
          this.handleAddState(['offLightNode', right]);

          right--;
        }

        await delay(ASYNC_DELAY_SECONDS);

        if (left <= right) {
          if (left !== right) {
            swap(arr, left, right);
            this.handleAddState(['changeNodes', left, right]);
          }

          left++;
          this.handleAddState(['onLightNode', left]);
          this.handleAddState(['offLightNode', left]);

          right--;
          this.handleAddState(['onLightNode', right]);
          this.handleAddState(['offLightNode', right]);
        }
      }

      this.handleAddState(['offLightNode', middle]);

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

    this.handleAddState(['startSort']);

    await recurseQuickSort(this.model.lists, 0, this.model.lists.length - 1);

    this.handleAddState(['finishAllSort']);
    this.onUpdateTotalStates(this.model.sortStates);
  }
}
