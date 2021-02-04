var a = [3,9,4,7,0,1,5,8,6,2];
var l = a.length;
 // middle
// 정렬과 재귀


function recurse(start, end, list) { // end = pivot - 1
  debugger;
  var pivot = Math.floor((start + end) / 2);

  while (start < end) {
    while (list[start] < list[pivot]) start++;
    while (list[end] > list[pivot]) end--;

    if (list[end] < list[pivot]) {
      swap(start, end, list);
      start++;
      end--;
    }

    if (start >= end) {
      return recurse(start, pivot - 1, list);
      return recurse(pivot, end, list);
    }
  }

  return list;
}

function swap(start, end, list) {
  [list[start], list[end]] = [list[end], list[start]];
  
}

recurse(0, a.length, a);



