import { swapNode, onHighlightNode, offHighlightNode, onHighlightAllNodes, delay } from './utils/sortUtils';

export class View {
  constructor() {
    this.form = document.querySelector('form');
    this.input = document.querySelector('input');
    this.selector = document.querySelector('select');
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

  displayNodes(nodeLists) {
    const DEFAULT_HEIGHTS = 4.5;

    for (let i = 0; i < nodeLists.length; i++) {
      const nodeChild = document.createElement('div'); // 이제 차일드 아니어도 됨
      const nodeValue = document.createElement('div');

      nodeChild.classList.add('content-field-node');
      nodeValue.classList.add('content-filed-node-value');
      nodeChild.style.height = `${DEFAULT_HEIGHTS * nodeLists[i]}px`;
      nodeValue.textContent = `${nodeLists[i]}`

      this.table.appendChild(nodeChild);
      nodeChild.appendChild(nodeValue);
    }
  }

  bindInputNode(handler) { // eventlistener 다 remove해주기.. 근데 그럼 유명함수로 만들어야하는데... 그럼 디스바인딩해줘야하는데... // if flag거는건 어때..?
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      if (!this.nodeList) {
        // ui작업
        throw new Error('Please enter numbers');
      }

      const listArray = this.nodeList.split(',').map(item => Number(item));
      const isNumbers = listArray.every(item => {
        return typeof item === 'number' && !isNaN(item);
      });
      const isRanged = listArray.every(item => item > 0 && item < 100);
      
      if (listArray.length < 5 || listArray.length > 10) {
        // ui 작업
        throw new Error('please enter number 5 to 10');
      }

      if (!isNumbers) { // nan
        throw new Error('please enter only number');
      }

      if (!isRanged) {
        throw new Error('please enter number in 50 to 100');
      }

      // 수치값 밸리데이션.. else if로 묶어주는게 가독성이 나을지도 100 이상 입력 못하게
      handler(listArray);
      this.resetInput();
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

    const viewCommands = { // 매개변수 이름, 받는 타입 다시 설정해주기
      startSort: function() {
        //onHighlightAllNodes();
      },
      onLighthNode: function(args) { //  네이밍 다시..
        onHighlightNode(args[0], args[1]);
      },
      swapNodes: function(args) {
        swapNode(args[0], args[1]);
      },
      offLightNode: function(args) {
        offHighlightNode(args[0], 'pink'); // 네이밍 다시
      },
      checkSortedNode: function(args) {
        offHighlightNode(args[0], '#FCE2E6'); // 컬러 테마 다시 뽑아넣기
      },
      finishAllSort: function() {
        onHighlightAllNodes();
      },
    };

    viewCommands[state](args);
  }
}
