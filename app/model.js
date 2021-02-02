import { swap } from './utils/sortUtils';

export class Model {
  constructor() {
    this.lists = [];
    this.sortState; // 뭔가 이상한데..
  }

  addNewNodes(lists) {
    // validation
    this.onNodeListsDisplay(lists);
  }

  addList(lists) {
    // validation
    const listArray = lists.split(',').map(item => Number(item));

    this.lists = listArray;
    this.addNewNodes(this.lists);
  }

  bubbleSort() { // 확장시 SORT로 분리, INPUT값 받아서 PARAMETER로 넣어줘서 SWITCH쓰기 //ㅇ
    // validation
    console.log('start');
    this.sortState ='start';
    console.log(this.sortState);

    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists.length - i - 1; j++) {
        console.log(`check ${j} ${j + 1}`);
        this.sortState = `check ${j}, ${j + 1}`;
        console.log(this.sortState);
        if (this.lists[j] > this.lists[j + 1]) {
          swap(this.lists, j, j + 1);
          console.log(`swap ${j, j + 1}`);
          this.sortState = `swap ${j}, ${j + 1}`;
        }
      }
    }
    console.log('finish');
    this.sortState = 'finish';
  }

  bindNodeListDisplayed(callback) {
    // validation
    this.onNodeListsDisplay = callback;
  }
}