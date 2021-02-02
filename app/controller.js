import { delay, swap } from './utils/sortUtils';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindInputNode(this.handleAddList);
    this.model.bindNodeListDisplayed(this.onNodeListsDisplay);
    this.view.bindStartSort(this.bubbleSort);
    this.model.bindState(this.onUpdateState);
  }

  handleAddList = nodeLists => { // 코드 스타일 통일
    this.model.addList(nodeLists);
  }

  onNodeListsDisplay = nodes => {
    this.view.displayNodes(nodes);
  }

  onUpdateState = state => {
    this.view.render(state);
  }

  bubbleSort = async () => { // 확장시 SORT로 분리, INPUT값 받아서 PARAMETER로 넣어줘서 SWITCH쓰기 //
    // validation
    this.onUpdateState(['startSorting']); // 굳이 어레이로 보내줘야 할 필요 없음.. 그래도 임시로 놔두기..

    for (let i = 0; i < this.model.lists.length; i++) {
      for (let j = 0; j < this.model.lists.length - i - 1; j++) {
        this.onUpdateState(['checkNodes', j, j + 1]); // 수정

        if (this.model.lists[j] > this.model.lists[j + 1]) {
          swap(this.model.lists, j, j + 1);
          await delay(600);
          this.onUpdateState(['swapNodes', j, j + 1]);
          await delay(600);
        }
      }
    }

    this.onUpdateState(['finishSorting']);
    console.log(this.model.lists);
  }
}
