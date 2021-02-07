export const BubbleController = function() {
}

BubbleController.prototype.sort = async function() {
  const sorting = this.model.get();
  const leng = this.model.size();
  const SWAP_DELAY = 200;
  const LOOP_DELAY = 1000;
    
  for (let i = 0; i < leng -1; i++) {
    for (let j = 0; j < leng -i -1; j++) {
      if (sorting[j] > sorting[j + 1]) {
        let temp = sorting[j];
        sorting[j] = sorting[j + 1];
        sorting[j + 1] = temp;
        
        this.model.update(i + j, sorting);

        await new Promise(resolve =>
          setTimeout(resolve, SWAP_DELAY)
        );
        
        await this.view.swap(j, j + 1, false);
        
      } else {
        await this.view.swap(j, j + 1, true);
        
        await new Promise(resolve =>
          setTimeout(resolve, SWAP_DELAY)
        );
        
      }
    }
    this.view.paintDone(i);
    
    await new Promise(resolve =>
      setTimeout(resolve, LOOP_DELAY)
    );

    if (i === leng -2) {
      this.view.paintDone(i + 1);
    }
  }
};
