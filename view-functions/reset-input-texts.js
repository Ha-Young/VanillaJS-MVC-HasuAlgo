export default function resetInputTexts() {
  const { numberInput, wholeNumberInput } = this;
  numberInput.value = "";
  numberInput.placeholder = "";
  wholeNumberInput.value = "";
}
