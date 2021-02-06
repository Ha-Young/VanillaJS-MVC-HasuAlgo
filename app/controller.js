import {swapView} from "./view";

export function changeStringToNumbers (string) {
    const numbers = string.split(",").map(function(element) {
      return parseInt(element);
    });

    return numbers;
}

export function checkNumber (numbers) {
  return numbers.every(function (element) {
    return typeof element === "number" && !Number.isNaN(element);
  });
}

export async function bubbleSort(numbers) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1 - i; j++) {
      if (numbers[j] > numbers[j + 1]) {

        let frontValue = numbers[j];
        let backValue = numbers[j + 1];

        numbers[j] = numbers[j + 1];
        numbers[j + 1] = frontValue;

        await swapView(j, frontValue, backValue);
      }
    }
  }
}
