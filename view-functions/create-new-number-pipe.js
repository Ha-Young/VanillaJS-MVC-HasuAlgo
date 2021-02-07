export default function createNewNumberPipe(numbers) {
  const { sortingBoard } = this;
  
  numbers.forEach((inputValue, index) => {
    const newNumberPipe = document.createElement("div");
    const HEIGHT_LIMIT = 500;
    const HEIGHT_MIN = 30;
    const height = inputValue * 5 + HEIGHT_MIN;

    newNumberPipe.style.order = index + 1;
    newNumberPipe.style.height = `${(height < HEIGHT_LIMIT) ? height : HEIGHT_LIMIT}px`;
    newNumberPipe.classList.add("pipe");
    
    const numberTextBox = document.createElement("div");
    
    numberTextBox.textContent = inputValue;
    numberTextBox.classList.add("numberTextBox");
    
    newNumberPipe.appendChild(numberTextBox);
    sortingBoard.appendChild(newNumberPipe);
    newNumberPipe.dataset.value = inputValue;
  });
}
