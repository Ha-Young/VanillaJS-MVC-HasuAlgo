export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindInputNode(this.handleAddList);
    this.model.bindNodeListDisplayed(this.onNodeListsDisplay);
    this.view.bindStartSort(this.handleSort);
  }

  handleAddList = nodeLists => { // 코드 스타일 통일
    this.model.addList(nodeLists);
  }

  onNodeListsDisplay = nodes => {
    this.view.displayNodes(nodes);
  }

  handleSort = nodeLists => {
   this.model.bubbleSort(nodeLists);
  }
}