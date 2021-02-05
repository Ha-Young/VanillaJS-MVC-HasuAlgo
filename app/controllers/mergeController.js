export const MergeController = function() {

}

MergeController.prototype.sort = function(array) {
  if (array.length < 2) {
    return array;
  }
  
  const mid = Math.floor(array.length / 2);
 
  const left = array.slice(0, mid);
  const right = array.slice(mid);
 
  return merge(this.sort(left), this.sort(right));
 
  function merge (left, right) {
    const resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
 
    return resultArray.concat(left.slice(leftIndex), right.slice(rightIndex));
  }
};