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
  console.log('node', nodeGroup[left], nodeGroup[right]);
  leftNode.style.transform = `translateX(${50 * (right - left)}px)`; // classList추가
  rightNode.style.transform = `translateX(-${50 * (right - left)}px)`;

  await delay(100 * (right - left) * 6); // magic number

  leftNode.classList.remove('transition-effect');
  rightNode.classList.remove('transition-effect');

  leftNode.style.transform = 'none';
  rightNode.style.transform = 'none';

  nodeGroup[left].after(nodeGroup[right]);
  nodeGroup[right].after(nodeGroup[left]); // bubble용
  
  await delay(100 * (right - left) * 6);
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


////////////////////////////////////////////////////
const partition = function(arr, left, right) {
  const pivot = left;
  // 불켜져야함
  let low = left + 1;
  let high = right;
  
  while (low <= high) {
    while (arr[low] <= arr[pivot] && low <= right) {
      //low에 불켰다 꺼지기
      this.onUpdateState(['onLighthNode', low]);
      low++;
      this.onUpdateState(['offLightNode', low]);
    }
    
    while (arr[high] >= arr[pivot] && high >= (left + 1)) {
      //high에 불켰다가 꺼지기
      this.onUpdateState(['onLighthNode', high]);
      high--;
      this.onUpdateState(['offLightNode', high]);
    }
    
    if (low <= high) {
      swap(arr, low, high); // 불켜지기
      this.onUpdateState(['swapNodes', low, high]);
    }
  }
  
  swap(arr, pivot, high); // 블켜지기
  this.onUpdateState(['swapNodes', low, high]);
  
  return high;
}


const quickSort = function(arr, left, right) {
  const mid = partition(arr, left, right);
  
  if (left < mid) {
    quickSort(arr, left, mid - 1)
  }

  if (right > mid) {
    quickSort(arr, mid + 1, right);
  }
  
  return arr;
}

