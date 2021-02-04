export const BubbleController = function() {
}

BubbleController.prototype.sort = async function() {
  const sorting = this.model.get();
    
  for (let i = 0; i < this.model.size() -1; i++) {
    for (let j = 0; j < this.model.size() -i -1; j++) {
      if (sorting[j] > sorting[j + 1]) {
        let temp = sorting[j];
        sorting[j] = sorting[j + 1];
        sorting[j + 1] = temp;
        
        this.model.update(i + j, sorting);

        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, 200)
        );
        
        await this.view.swap(j, j + 1);
        
      } else {
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, 800)
        );
      }
    }
    this.view.paintDone(i);
    
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );

    if (i === this.model.size() -2) {
      this.view.paintDone(i + 1);
    }
  }
};
