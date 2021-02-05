import { delay } from './utils/commonUtils';
import { swapNodes, onHighlightNode, offHighlightNode, onHighlightAllNodes } from './utils/uiUtils';

export class View {
  constructor() {
    this.form = document.querySelector('form');
    this.input = document.querySelector('input');
    this.selector = document.querySelector('select');
    this.startButton = document.querySelector('.content-startButton');
    this.table = document.querySelector('.content-field');
    this.warningZone = document.querySelector('.content-warning');
  }

  get nodeList() { // node 이름 혼용 고쳐주기
    return this.input.value;
  }

  resetInput() {
    this.input.value = '';
  }

  bindInputNumbers(handler) { // eventlistener 다 remove해주기.. 근데 그럼 유명함수로 만들어야하는데... 그럼 디스바인딩해줘야하는데... // if flag거는건 어때..?
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!this.nodeList) {
        this.warningZone.textContent = 'Please enter numbers';
        return;
      }

      const listArray = this.nodeList.split(',').map(item => Number(item));
      const isRanged = listArray.every(item => item > 0 && item < 100);
      const isNumbers = listArray.every(item => typeof item === 'number' && !isNaN(item));

      if (listArray.length < 5 || listArray.length > 10) { // 너무 보기 싫음.. 어쩌지..?
        this.warningZone.textContent = 'Please enter number 5 to 10';
        return;
      } else if (!isRanged) {
        this.warningZone.textContent = 'Please enter number in 50 to 100';
        return;
      } else if (!isNumbers) {
        this.warningZone.textContent = 'Please enter only number';
        return;
      } 

      handler(listArray);
      this.warningZone.textContent = '';
      this.resetInput();
    });
  }

  bindStartSort(handler) {
    this.startButton.addEventListener('click', () => {
      if (this.selector.value === '') {
        this.warningZone.textContent = 'Please choose sort type';
        return;
      }

      this.warningZone.textContent = '';
      handler();
      this.startButton.classList.add('none-visible');
    });
  }

  displayNodes(nodeLists) {
    const DEFAULT_HEIGHTS = 4.5;

    for (let i = 0; i < nodeLists.length; i++) {
      const newNode = document.createElement('div');

      newNode.classList.add('content-field-node');
      newNode.style.height = `${DEFAULT_HEIGHTS * nodeLists[i]}px`;
      newNode.textContent = nodeLists[i];

      this.table.appendChild(newNode);
    }
  }

  render = async (stateInfo) => {   
    const stateType = stateInfo.shift();

    const viewCommands = {
      startSort: () => {
        //await onHighlightAllNodes();
      },
      onLightNode: (index) => {
        onHighlightNode(index[0]);
      },
      changeNodes: (index) => {
        swapNodes(this.table.children, index[0], index[1]);
      },
      offLightNode: (index) => {
        offHighlightNode(index[0]);
      },
      checkSortedNode: (index) => {
        offHighlightNode(index[0], '#FCE2E6'); // 컬러 테마 다시 뽑아넣기
      },
      finishAllSort: () => {
        onHighlightAllNodes();
      },
    };

    await delay(500);
    await viewCommands[stateType](stateInfo);
    await delay(500);
  }
}
