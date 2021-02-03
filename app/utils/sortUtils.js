export const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};

// 파일 이름 바꾸기

export function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
}

export async function swapNode(left, right) { //visualize.. sortutil에서 분리..
  const nodeGroup = document.querySelectorAll('.content-field-node');
  const leftNode = nodeGroup[left];
  const rightNode = nodeGroup[right];

  leftNode.style.transform = `translateX(${50 * (right - left)}px)`; // classList추가
  rightNode.style.transform = `translateX(-${50 * (right - left)}px)`;

  await delay(400); // magic number

  leftNode.classList.remove('transition-effect');
  rightNode.classList.remove('transition-effect');

  leftNode.style.transform = 'none';
  rightNode.style.transform = 'none';

  nodeGroup[right].after(nodeGroup[left]);

  await delay(400);
}

export async function onHighlightNode(left, right) {
  const nodeGroup = document.querySelectorAll('.content-field-node');
  const leftNode = nodeGroup[left];
  const rightNode = nodeGroup[right];

  leftNode.classList.add('transition-effect');
  rightNode.classList.add('transition-effect');

  await delay(400);

  leftNode.style.backgroundColor = 'skyblue';
  rightNode.style.backgroundColor = 'skyblue';

  await delay(400);
}

export async function offHighlightNode(left, color) {
  const nodeGroup = document.querySelectorAll('.content-field-node');
  const leftNode = nodeGroup[left];

  leftNode.classList.add('transition-effect');
  await delay(400);

  leftNode.style.backgroundColor = color;
  await delay(400);

  leftNode.classList.remove('transition-effect');
}

export async function onHighlightAllNodes() {
  const nodeGroup = document.querySelectorAll('.content-field-node');

  for (const node of nodeGroup) {
    await delay(200);

    node.classList.add('transition-effect');
    node.style.backgroundColor = 'pink';
    
    await delay(200);
  }
}
