function swap(arr, left, right) {
  const temp = arr[left];
  
  arr[left] = arr[right];
  arr[right] = temp;
}

function partition(arr, left, right) {
  const pivot = left;
  
  let low = left + 1;
  let high = right;
  
  while (low <= high) {
    while (arr[low] <= arr[pivot] && low <= right) {
      low++;
    }
    
    while (arr[high] >= arr[pivot] && high >= (left + 1)) {
      high--;
    }
    
    if (low <= high) {
      swap(arr, low, high);
    }
  }
  
  swap(arr, pivot, high);
  
  return high;
}


export function quickSort(arr, left, right) {
  const mid = partition(arr, left, right);
  
  if (left < mid) {
    quickSort(arr, left, mid - 1)
  }

  if (right > mid) {
    quickSort(arr, mid + 1, right);
  }
  
  return arr;
}
