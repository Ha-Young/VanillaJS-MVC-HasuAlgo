export const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};

// 파일 이름 바꾸기

export async function delay(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
}

export function swapNode(left, right) { // promise 넣어주기
  const field  = document.querySelector('.content');
  const nodeGroup = document.querySelectorAll('.content-field-node-parent');
  const leftNode = nodeGroup[left];
  const rightNode = nodeGroup[right];

  const style1 = window.getComputedStyle(leftNode);
  const style2 = window.getComputedStyle(rightNode);

  const transform1 = style1.getPropertyValue('transform');
  const transform2 = style2.getPropertyValue('transform');

  leftNode.style.transform = transform2;
  rightNode.style.transform = transform1;

  await delay(1000);

  field.insertBefore(rightNode, leftNode);
}
