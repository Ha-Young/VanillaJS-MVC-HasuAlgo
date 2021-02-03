import { BubbleController } from '../controllers/bubbleController';

export function BubbleModel(input) {
  this._sort = input;
  this._controller = new BubbleController();
}

BubbleModel.prototype.execute = async function() {
  const sorting = this._sort;

  for (let i = 0; i < sorting.length -1; i++) {
    for (let j = 0; j < sorting.length -i -1; j++) {
      if (sorting[j] > sorting[j + 1]) {
        let temp = sorting[j];
        sorting[j] = sorting[j + 1];
        sorting[j + 1] = temp;
        
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, 500)
        );
        
        await this._controller.startSwap(j, j + 1);
      } else {
        
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, 200)
        );
      }
    }

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 200);
    })
  }
};
