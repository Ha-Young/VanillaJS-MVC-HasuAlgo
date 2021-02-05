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

export async function swapNode(nodeGroup, left, right) { //visualize.. sortutil에서 분리..
  await delay(1000);

  const leftNode = nodeGroup[left];
  const rightNode = nodeGroup[right];

  const leftNodeHeight = leftNode.style.height;
  const leftNodeValue = leftNode.textContent;
  
  leftNode.classList.add('transition-effect-moderate');
  rightNode.classList.add('transition-effect-moderate');
  
  rightNode.style.transform = `translateX(-${50 * (right - left)}px)`;
  leftNode.style.transform = `translateX(${50 * (right - left)}px)`; // classList추가
  
  await delay(100 * (right - left) * 4); // magic number

  leftNode.classList.remove('transition-effect-moderate');
  rightNode.classList.remove('transition-effect-moderate');

  leftNode.style.transform = 'none';
  rightNode.style.transform = 'none';

  leftNode.style.height = nodeGroup[right].style.height;
  rightNode.style.height = leftNodeHeight;

  leftNode.textContent = nodeGroup[right].textContent;
  rightNode.textContent = leftNodeValue;

  await delay(100 * (right - left) * 4);
}

export async function onHighlightNode(index, color = 'skyblue') {
  await delay(500);

  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect-fast');
  await delay(400);

  indexNode.style.backgroundColor = color; // color로 바꿔주기
  await delay(400);

  indexNode.classList.remove('transition-effect-fast');
  await delay(400);
}

export async function offHighlightNode(index, color) {
  await delay(500);

  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect-fast');
  await delay(400);

  indexNode.style.backgroundColor = color;
  await delay(400);

  indexNode.classList.remove('transition-effect-fast');
  await delay(500);
}

export async function onHighlightAllNodes() {
  const nodeGroup = document.querySelectorAll('.content-field-node');

  for (const node of nodeGroup) {
    await delay(200);

    node.classList.add('transition-effect-fast');
    node.style.backgroundColor = 'pink';

    await delay(200);
  }
}

