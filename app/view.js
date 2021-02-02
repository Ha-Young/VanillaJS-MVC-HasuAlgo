import { swapNode, delay } from './utils/sortUtils';

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
    // if (nodeLists.length === 0) {
    //   console.log(24);
    //   const warningMessage = document.createElement('p');
    //   warningMessage.textContent = 'Put some numbers';
    //   this.table.appendChild(warningMessage);

    //   return;
    // }

    const DEFAULT_HEIGHTS = 2;

    for (let i = 0; i < nodeLists.length; i++) {
      const nodeParent = document.createElement('div');
      const nodeChild = document.createElement('div');

      nodeParent.classList.add('content-field-node-parent');
      nodeParent.classList.add(`${i}`);
      nodeChild.classList.add('content-field-node');
      nodeChild.style.height = `${DEFAULT_HEIGHTS * nodeLists[i]}px`;

      this.table.appendChild(nodeParent);
      nodeParent.appendChild(nodeChild);
    }
  }

  bindInputNode(handler) { // eventlistener 다 remove해주기.. 근데 그럼 유명함수로 만들어야하는데... 그럼 디스바인딩해줘야하는데... // if flag거는건 어때..?
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

  render(args) {
    const state = args.shift();

    const viewCommands = {
      startSorting: async function() {
        await delay(250);
      },
      checkNodes: async function(args) {
        await delay(250);
      },
      swapNodes: function(args) {
        swapNode(args[0], args[1]);
      },
      finishSorting: async function() {
        await delay(500);
      },
    };

    viewCommands[state](args);
  }
}
