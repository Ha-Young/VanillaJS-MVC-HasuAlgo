export default function getFilteredNumbers(view) {
  let input = view.domElements.wholeNumberInput;
  let inputNumbers = input.value.split(",").map(each => Number(each));
  let filteredNumbers = inputNumbers.filter(number => !!number);

  return filteredNumbers;
}
