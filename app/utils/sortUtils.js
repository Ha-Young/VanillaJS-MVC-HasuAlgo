export const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};
