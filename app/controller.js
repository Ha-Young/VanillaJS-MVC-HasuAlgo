import { delay, swap } from './utils/sortUtils';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindInputNode(this.handleAddList);
    this.model.bindNodeListDisplayed(this.onDisplayNodeList);
    this.view.bindStartSort(this.bubbleSort);
    this.model.bindState(this.onUpdateState);
  }

  handleAddList = nodeLists => { // 코드 스타일 통일
    this.model.addList(nodeLists);
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
        let x = 1;
        break;
      }
      case 'qucickSort': {
        const y = 2;
        break;
      }
      default: {
      }
    }
  }

  bubbleSort = async () => { // 확장시 SORT로 분리, INPUT값 받아서 PARAMETER로 넣어줘서 SWITCH쓰기 //
    // validation
    const nodeList = this.model.lists;

    this.onUpdateState(['startSort']); // 굳이 어레이로 보내줘야 할 필요 없음.. 그래도 임시로 놔두기..

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = 0; j < nodeList.length - i - 1; j++) {
        await delay(500);
        this.onUpdateState(['onLighthNode', j, j + 1]); // 수정
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
    console.log(nodeList);
  }
}
