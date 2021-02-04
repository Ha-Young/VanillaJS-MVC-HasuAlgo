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
  await delay(1000);
  const nodeGroup = document.querySelectorAll('.content-field-node');
  // const leftNode = nodeGroup[left];
  // const rightNode = nodeGroup[right];
  console.log(left, right);
  console.log(nodeGroup[left].textContent, nodeGroup[right].textContent);
  // leftNode.style.transform = `translateX(${50 * (right - left)}px)`; // classList추가
  // rightNode.style.transform = `translateX(-${50 * (right - left)}px)`;

  // await delay(100 * (right - left) * 4); // magic number

  // leftNode.classList.remove('transition-effect');
  // rightNode.classList.remove('transition-effect');

  // leftNode.style.transform = 'none';
  // rightNode.style.transform = 'none';
  await delay(100 * (right - left) * 4) // await

  console.log('swap', nodeGroup[left], nodeGroup[right]);
  nodeGroup[left].after(nodeGroup[right]);
  nodeGroup[right].after(nodeGroup[left]); // bubble용

  await delay(100 * (right - left) * 4);
}

export async function onHighlightNode(index) {
  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect');
  await delay(400);

  indexNode.style.backgroundColor = 'skyblue';
  await delay(400);
}

export async function offHighlightNode(index, color) {
  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect');
  await delay(400);

  indexNode.style.backgroundColor = color;
  await delay(400);

  indexNode.classList.remove('transition-effect');
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

