const DEFAULT_SECONDS = 400;

export const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};

export const delay = (seconds = DEFAULT_SECONDS) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });
};
