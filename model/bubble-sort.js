async function doTransition(first, second, index) {
  let firstAll = Array.from(document.querySelectorAll(`[data-value="${first}"]`)); 
  let secondAll = Array.from(document.querySelectorAll(`[data-value="${second}"]`));

  if (firstAll.length > 1) {
    firstAll = firstAll.filter(e => {
      return Number(e.style.order) === index + 1;
    });
  }

  if (secondAll.length > 1) {
    secondAll = secondAll.filter(e => {
      return Number(e.style.order) === index + 2;
    });
  }

  let firstElm = firstAll[0];
  let secondElm = secondAll[0];

  let firstOffset = firstElm.offsetLeft;
  let secondOffset = secondElm.offsetLeft;

  let xGap = (secondOffset - firstOffset);

  firstElm.style.transform = `translateX(${xGap}px)`;

  secondElm.style.transform = `translateX(-${xGap}px)`;
}

function swap(first, second) {
  const temp = first;
  first = second;
  second = temp;

  return { first, second };
}

function swapCanvas(first, second, index) {
  let firstAll = Array.from(document.querySelectorAll(`[data-value="${first}"]`)); 
  let secondAll = Array.from(document.querySelectorAll(`[data-value="${second}"]`));

  if (firstAll.length > 1) {
    firstAll = firstAll.filter(e => {
      return Number(e.style.order) === index + 1;
    });
  }

  if (secondAll.length > 1) {
    secondAll = secondAll.filter(e => {
      return Number(e.style.order) === index + 2;
    });
  }

  let firstElm = firstAll[0];
  let secondElm = secondAll[0];

  let firstOrder = firstElm.style.order;
  let secondOrder = secondElm.style.order;

  secondElm.style.order = firstOrder;
  firstElm.style.order = secondOrder;
}

export default async function bubbleSort(canvas, numbers, boxes) {
  const unSorted = numbers;
  let isSorted = false;

  for (let i = 0; i < unSorted.length; i++) {
    if (isSorted) {
      break;
    }
    
    let beforeLoop = Array.from(unSorted);

    for (let j = 0; j < unSorted.length - 1; j++) {
      if (unSorted[j] > unSorted[j + 1]) {
        let { first, second } = swap(unSorted[j], unSorted[j + 1]);
        swapCanvas(unSorted[j], unSorted[j + 1], j);
        await waitFor(600);

        unSorted[j] = first;
        unSorted[j + 1] = second;
      }
    }
    
    isSorted = JSON.stringify(beforeLoop) === JSON.stringify(unSorted);
  }
}
