import { delay, swap } from './utils/sortUtils';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindInputNode(this.handleAddList);
    this.model.bindNodeListDisplayed(this.onDisplayNodeList);
    this.view.bindStartSort(this.quickSort); // 아직 구현 전..
    this.model.bindState(this.onUpdateState);
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

  onUpdateState(state) {
    this.view.render(state);
  }

  startSort(sortType) {
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
    this.onUpdateState(['startSort']); // 굳이 어레이로 보내줘야 할 필요 없음.. 그래도 임시로 놔두기..

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = 0; j < nodeList.length - i - 1; j++) {
        await delay(500);
        this.onUpdateState(['onLighthNode', j]); // 수정
        this.onUpdateState(['onLighthNode', j + 1]); // 수정
        await delay(500);

        if (nodeList[j] > nodeList[j + 1]) {
          swap(nodeList, j, j + 1);

          await delay(500);
          this.onUpdateState(['swapNodes', j, j + 1]);
          await delay(500);
        }

        if ((j + 1) === nodeList.length - i - 1) {
          await delay(500);
          this.onUpdateState(['checkSortedNode', j + 1]);
        }

        this.onUpdateState(['offLightNode', j]);
        await delay(500);
      }
    }

    this.onUpdateState(['finishAllSort']);
  }

  quickSort = () => {
    const recursiveQuickSort = async (arr, left, right) => {
      this.handleAddState(['startSort'])
      const mid = Math.floor((left + right) / 2);
      let low = left;
      let high = right;
      
      while (low <= high) {
        while (arr[low] < arr[mid]) {
          low++;
        }
        
        while(arr[high] > arr[mid]) {
          high--;
        }
        
        if (low <= high) {
          swap(arr, low, high);

          await delay(2000);
          this.onUpdateState(['swapNodes', low, high]);
          await delay(2000);

          low++;
          high--;
        }
      }
      
      if (left < high) {
        console.log('25');
        console.log(arr[mid]);
        console.log(arr);
        //await delay(2000);
        recursiveQuickSort(arr, left, high);
        //await delay(2000);
      }
      
      if (low < right) {
        console.log('26');
        console.log(arr[mid]);
        console.log(arr);
        //await delay(2000);
        recursiveQuickSort(arr, low, right);
        //await delay(2000);
      }
      this.handleAddState(['finishAllSort']);
      return arr;
    }

    recursiveQuickSort(this.model.lists, 0, this.model.lists.length - 1);
    console.log(this.model.lists);
    console.log('end');
  }
}
