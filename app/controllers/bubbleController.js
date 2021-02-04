export const BubbleController = function() {
}

BubbleController.prototype.sort = async function() {
  this.model.save();
  
  const sorting = this.model.get();
    
  for (let i = 0; i < this.model.size() -1; i++) {
    for (let j = 0; j < this.model.size() -i -1; j++) {
      if (sorting[j] > sorting[j + 1]) {
        let temp = sorting[j];
        sorting[j] = sorting[j + 1];
        sorting[j + 1] = temp;
          
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, 800)
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

    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
  }
};
