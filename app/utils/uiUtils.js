import { delay } from './commonUtils';
import { colorChart } from '../constants/themeColor';

const INCREASED_UI_SECONDS = 500;

export const swapNodes = async (nodeGroup, left, right) => {
  await delay(INCREASED_UI_SECONDS);

  const NODE_GAP = 50;

  const UI_DEFAULT_SECONDS = 100;
  const UI_DELAY_CONSTANT = 4;

  const leftNode = nodeGroup[left];
  const rightNode = nodeGroup[right];

  const leftNodeHeight = leftNode.style.height;
  const leftNodeValue = leftNode.textContent;
  
  leftNode.classList.add('transition-effect');
  rightNode.classList.add('transition-effect');
  
  rightNode.style.transform = `translateX(-${NODE_GAP * (right - left)}px)`;
  leftNode.style.transform = `translateX(${NODE_GAP * (right - left)}px)`;
  
  await delay(UI_DEFAULT_SECONDS * (right - left) * UI_DELAY_CONSTANT);

  leftNode.classList.remove('transition-effect');
  rightNode.classList.remove('transition-effect');

  leftNode.style.transform = 'none';
  rightNode.style.transform = 'none';

  leftNode.style.height = rightNode.style.height;
  rightNode.style.height = leftNodeHeight;

  leftNode.textContent = rightNode.textContent;
  rightNode.textContent = leftNodeValue;

  await delay(UI_DEFAULT_SECONDS * (right - left) * UI_DELAY_CONSTANT);
}

export const onHighlightNode = async (index, color = colorChart.SKY_BLUE) => {
  await delay(INCREASED_UI_SECONDS);

  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect');
  await delay();

  indexNode.style.backgroundColor = color;
  await delay();

  indexNode.classList.remove('transition-effect');
  await delay();
}

export const offHighlightNode = async (index, color = colorChart.PINK) => {
  await delay(INCREASED_UI_SECONDS);

  const nodeGroup = document.querySelectorAll('.content-field-node');
  const indexNode = nodeGroup[index];

  indexNode.classList.add('transition-effect');
  await delay();

  indexNode.style.backgroundColor = color;
  await delay();

  indexNode.classList.remove('transition-effect');
  await delay();
}

export const onHighlightAllNodes = async (color = colorChart.PINK) => {
  const nodeGroup = document.querySelectorAll('.content-field-node');

  for (const node of nodeGroup) {
    await delay();

    node.classList.add('transition-effect');
    node.style.backgroundColor = color;

    await delay();
  }
}