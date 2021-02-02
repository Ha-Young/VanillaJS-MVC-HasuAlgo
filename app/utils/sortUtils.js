export const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};

// 파일 이름 바꾸기

export function delay(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
}

export async function swapNode(left, right) { //visualize.. sortutil에서 분리..
  const nodeGroup = document.querySelectorAll('.content-field-node-parent');
  const leftNode = nodeGroup[left];
  const rightNode = nodeGroup[right];

  leftNode.classList.add('transition-effect');
  rightNode.classList.add('transition-effect');

  leftNode.style.transform = `translateX(${50 * (right - left)}px)`;
  rightNode.style.transform = `translateX(-${50 * (right - left)}px)`;

  await delay(400); // magic number

  leftNode.classList.remove('transition-effect');
  rightNode.classList.remove('transition-effect');

  leftNode.style.transform = 'none';
  rightNode.style.transform = 'none';

  nodeGroup[right].after(nodeGroup[left]);

  await delay(400);
}
