export const MergeController = function() {
}

MergeController.prototype.sort = function(array) {
  if (array.length < 2) {
    return array;
  }
  
  const mid = Math.floor(array.length / 2);
 
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  
  // left 배열, right 배열 view
  console.log('나누는 작업');

  return merge(this.sort(left), this.sort(right));
 
  function merge (left, right) {
    const resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        // 부모 배열의 첫번째로 들어가기
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
 
    return resultArray.concat(left.slice(leftIndex), right.slice(rightIndex));
  }
};