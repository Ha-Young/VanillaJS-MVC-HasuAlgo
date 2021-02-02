import { BubbleView } from '../views/view';

export function BubbleModel(input) {
  this._view = new BubbleView();
  this._sort = input;
}

BubbleModel.prototype.execute = function() {
  let sorting = this._sort;
  for (let i = 0; i < sorting.length -1; i++) {
    for (let j = 0; j < sorting.length -i -1; j++) {
      if (sorting[j] > sorting[j + 1]) {
        let temp = sorting[j];
        sorting[j] = sorting[j + 1];
        sorting[j + 1] = temp;

        this._view.swap(j, j + 1);
      };
      this._view.stay();
    }
  }
}

BubbleModel.prototype.changeBlock = function() {
  
}

BubbleModel.prototype.stayBlock = function() {

}


// execute 실행결과를 바로 swap으로 보내지 말고, 결과값들을 모아서 control로 보냄
// control이 받은 결과를 비동기로 view의 이동작업을 실행하여 하나씩 이동되게 만들어 보자.