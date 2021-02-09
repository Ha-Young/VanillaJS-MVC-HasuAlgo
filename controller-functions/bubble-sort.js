import delay from "../model-functions/delay";

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
    
    const beforeSort = Array.from(numbers);

    for (let j = 0; j < numbers.length - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        this.view.swapPipesInCanvas(numbers[j], numbers[j + 1], j);

        const { first, second } = swapNumbers(numbers[j], numbers[j + 1]);
        numbers[j] = first;
        numbers[j + 1] = second;
        
        await delay();
      }
    }
    
    isSorted = JSON.stringify(beforeSort) === JSON.stringify(numbers);
  }
}
