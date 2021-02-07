export function pause(pauseTime) {
  return new Promise((resolve) => setTimeout(resolve, pauseTime));
}

export function swap(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
