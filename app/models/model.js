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


// 일단 초기값으로 시각화하기.
// 스왑될시 애니메이션으로 움직임 반영하기.
