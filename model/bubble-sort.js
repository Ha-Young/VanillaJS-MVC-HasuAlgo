// async function doTransition(first, second, index) {
//   let firstAll = Array.from(document.querySelectorAll(`[data-value="${first}"]`)); 
//   let secondAll = Array.from(document.querySelectorAll(`[data-value="${second}"]`));

import { delay } from "../model/delay";
import swapNumbersInCanvas from "../view/swap-numbers-in-canvas";

//   if (firstAll.length > 1) {
//     firstAll = firstAll.filter(e => {
//       return Number(e.style.order) === index + 1;
//     });
//   }

//   if (secondAll.length > 1) {
//     secondAll = secondAll.filter(e => {
//       return Number(e.style.order) === index + 2;
//     });
//   }

//   let firstElm = firstAll[0];
//   let secondElm = secondAll[0];

//   let firstOffset = firstElm.offsetLeft;
//   let secondOffset = secondElm.offsetLeft;

//   let xGap = (secondOffset - firstOffset);

//   firstElm.style.transform = `translateX(${xGap}px)`;

//   secondElm.style.transform = `translateX(-${xGap}px)`;
// }

function swapNumbers(first, second) {
  const temp = first;
  first = second;
  second = temp;

  return { first, second };
}

export default async function bubbleSort(array) {
  const numbers = array;
  let isSorted = false;

  for (let i = 0; i < numbers.length; i++) {
    if (isSorted) {
      break;
    }
    
    let beforeSort = Array.from(numbers);

    for (let j = 0; j < numbers.length - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        const { first, second } = swapNumbers(numbers[j], numbers[j + 1]);
        swapNumbersInCanvas(numbers[j], numbers[j + 1], j);
        
        numbers[j] = first;
        numbers[j + 1] = second;
        await delay(600);
      }
    }
    
    isSorted = JSON.stringify(beforeSort) === JSON.stringify(numbers);
  }
}
