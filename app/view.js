export class View {
  constructor() {
    this.form = document.querySelector('form');
    this.input = document.querySelector('input');
    this.startButton = document.querySelector('.content-startButton');
    this.table = document.querySelector('.content-field');
    // sort 선택 버튼 추가, 그래서 startbutton에 같이 날리기
  }

  get nodeList() { // node 이름 혼용 고쳐주기
    return this.input.value;
  }

  resetInput() {
    this.input.value = '';
  }

  displayNodes(nodeLists) { // validation 어디서 해줘야 할 지 찾아보기..
    if (nodeLists.length === 0) {
      const warningMessage = document.createElement('p');
      warningMessage.textContent = 'Put some numbers';
      this.table.appendChild(warningMessage);

      return;
    }

    for (const nodeValue of nodeLists) {
      const nodeParent = document.createElement('div');
      const nodeChild = document.createElement('div');
      nodeParent.className = `${nodeValue}`; // classList로 수정해주기

      this.table.appendChild(nodeParent);
      nodeParent.appendChild(nodeChild);
    }
  }

  bindInputNode(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (this.nodeList) {
        handler(this.nodeList);
        this.resetInput();
      }
    });
  }

  bindStartSort(handler) {
    this.startButton.addEventListener('click', () => {
      //validator ... nodeListlength === 0, sort 선택 안됐을때
      handler(); // SORT TYPE도 같이 알려주기
    });
  }

  render(targetNode, ...args) {
    const viewsCommands = {
      startSorting: function() {},
      checkNodes: function() {},
      swapNodes: function() {},
      finishSorting: function() {},
    };
  }
}
