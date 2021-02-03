import { BubbleController } from '../controlles/control';

export function BubbleModel(input) {
  this._sort = input;
  this._controller = new BubbleController();
}

BubbleModel.prototype.execute = async function() {
  let sorting = this._sort;

  for (let i = 0; i < sorting.length -1; i++) {
    for (let j = 0; j < sorting.length -i -1; j++) {
      if (sorting[j] > sorting[j + 1]) {
        let temp = sorting[j];
        sorting[j] = sorting[j + 1];
        sorting[j + 1] = temp;
        
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, 2000)
        );
        
        await this._controller.startSwap(j, j + 1);
        console.log(sorting);
        //this._controller.paintBox(j, j + 1, i);
      } else {
        
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, 1000)
        );
      }

    }

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    })
  }
};


// execute 실행결과를 바로 swap으로 보내지 말고, 결과값들을 모아서 control로 보냄
// control이 받은 결과를 비동기로 view의 이동작업을 실행하여 하나씩 이동되게 만들어 보자.