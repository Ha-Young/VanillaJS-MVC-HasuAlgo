import { delay, swap } from './utils/sortUtils';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindInputNode(this.handleAddList);
    this.model.bindNodeListDisplayed(this.onDisplayNodeList);
    this.view.bindStartSort(this.quickSort); // 아직 구현 전..
    this.model.bindStates(this.onUpdateStates);
    //this.model.bindState(this.onUpdateState);
  }

  handleAddList = nodeLists => { // 코드 스타일 통일
    this.model.addList(nodeLists);
  }

  handleAddState = state => { // 새로 가한 함수임.. 원래 온업데이트스테이트가 바인딩 되어있었음..
    this.model.addState(state);
  }

  onDisplayNodeList = nodes => {
    this.view.displayNodes(nodes);
  }

  onUpdateStates = async (states) => {
    for (let i = 0; i < states.length; i++) {
      await this.view.render(states[i]);
    }
  }

  handleStartSort(sortType) {
    switch (sortType) {
      case 'bubbleSort': {
        this.bubbleSort();
        break;
      }
      case 'quickSort': {
        this.quickSort();
        break;
      }
      default: {
      }
    }; // semi 붙이나 안붙이나 검색해보기
  }

  bubbleSort = async () => { // 확장시 SORT로 분리, INPUT값 받아서 PARAMETER로 넣어줘서 SWITCH쓰기 //
    const nodeList = this.model.lists;
    this.handleAddState(['startSort']);

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = 0; j < nodeList.length - i - 1; j++) {
        this.handleAddState(['onLightNode', j]);
        this.handleAddState(['onLightNode', j + 1]);

        if (nodeList[j] > nodeList[j + 1]) {
          swap(nodeList, j, j + 1);

          this.handleAddState(['swapNodes', j, j + 1]);
        }

        if ((j + 1) === nodeList.length - i - 1) {
          this.handleAddState(['checkSortedNode', j + 1]);
        }

        this.handleAddState(['offLightNode', j]);
      }
    }

    this.handleAddState(['finishAllSort']);
    this.onUpdateStates(this.model.sortState);
  }

  quickSort = async () => {
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

        await delay(100);

        if (left <= right) {
          if (left !== right) {
            swap(arr, left, right);
            this.handleAddState(['swapNodes', left, right]);
            this.handleAddState(['checkSortedNode', middle]);
          }

          left++;
          right--;
        }
      }
      return left;
    };

    const recurseQuickSort = async (arr, left, right) => {
      const pivot = await partition(arr, left, right);

      if (left < pivot - 1) {
        await recurseQuickSort(arr, left, pivot - 1)
      }

      if (right > pivot) {
        await recurseQuickSort(arr, pivot, right);
      }

      return arr;
    };

    this.handleAddState(['startSort']);
    await recurseQuickSort(this.model.lists, 0, this.model.lists.length - 1);
    this.handleAddState(['finishAllSort']);

    this.onUpdateStates(this.model.sortState);
  }
}
