export function BubbleModel() {
  this.sort = [...arguments];
}

BubbleModel.prototype.execute = function() {
  let sorting = this.sort;
  let temp = null;
  
  if (sorting[i] > sorting[i + 1]) {
    temp = sorting[i];
    sorting[i] = sorting[i + 1];
    sorting[i + 1] = temp;
    
    return [i, i + 1, true];
  };
}

BubbleModel.prototype.getRemain = function() {
  return this.sort;
}

const test = new BubbleModel(1, 2, 3); 

console.log(test.sort);
console.log(test.getRemain());
