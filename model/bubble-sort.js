import delay from "../model/delay";
import swapPipesInCanvas from "../view/swap-pipes-in-canvas";

function swapNumbers(first, second) {
  const temp = first;
  first = second;
  second = temp;

  return { first, second };
}

export default async function bubbleSort(array) {
  const numbers = [...array];
  let isSorted = false;

  for (let i = 0; i < numbers.length; i++) {
    if (isSorted) {
      break;
    }
    
    let beforeSort = Array.from(numbers);

    for (let j = 0; j < numbers.length - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        swapPipesInCanvas(numbers[j], numbers[j + 1], j);
        
        const { first, second } = swapNumbers(numbers[j], numbers[j + 1]);
        numbers[j] = first;
        numbers[j + 1] = second;
        
        const DELAY_TIME = 700;
        await delay(DELAY_TIME);
      }
    }
    
    isSorted = JSON.stringify(beforeSort) === JSON.stringify(numbers);
  }
}
