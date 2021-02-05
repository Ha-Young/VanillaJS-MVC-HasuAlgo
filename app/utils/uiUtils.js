import { delay } from './commonUtils';

export const swapNodes = async (nodeGroup, left, right) => {
  await delay(500);

  const leftNode = nodeGroup[left];
  const rightNode = nodeGroup[right];

  const leftNodeHeight = leftNode.style.height;
  const leftNodeValue = leftNode.textContent;
  
  leftNode.classList.add('transition-effect');
  rightNode.classList.add('transition-effect');
  
  rightNode.style.transform = `translateX(-${50 * (right - left)}px)`;
  leftNode.style.transform = `translateX(${50 * (right - left)}px)`;
  
  await delay(100 * (right - left) * 4); // magic number

  leftNode.classList.remove('transition-effect');
  rightNode.classList.remove('transition-effect');

  leftNode.style.transform = 'none';
  rightNode.style.transform = 'none';

  leftNode.style.height = rightNode.style.height;
  rightNode.style.height = leftNodeHeight;

  leftNode.textContent = rightNode.textContent;
  rightNode.textContent = leftNodeValue;

  await delay(100 * (right - left) * 4);
}

export const onHighlightNode = async (index, color = '#CEECF2') => {
  await delay(500);

  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect');
  await delay();

  indexNode.style.backgroundColor = color;
  await delay();

  indexNode.classList.remove('transition-effect');
  await delay();
}

export const offHighlightNode = async (index, color = '#FBBABA') => {
  await delay(500);

  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect');
  await delay();

  indexNode.style.backgroundColor = color;
  await delay();

  indexNode.classList.remove('transition-effect');
  await delay();
}

export const onHighlightAllNodes = async (color = '#FBBABA') => {
  const nodeGroup = document.querySelectorAll('.content-field-node');

  for (const node of nodeGroup) {
    await delay();

    node.classList.add('transition-effect');
    node.style.backgroundColor = color;

    await delay();
  }
}