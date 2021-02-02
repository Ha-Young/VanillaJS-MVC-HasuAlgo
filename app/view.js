function createBlock(sortList) {
  const sortBox = document.getElementById('sortBox');
  let LOCATION_X = -50;

  for (let i = 0; i < sortList.length; i++) {
    const block = document.createElement('div');
    const label = document.createElement('b');

    LOCATION_X += 50;
    block.classList.add('block');
    block.style.height = `${sortList[i] * 5 + 10}px`;
    block.style.transform = `translateX(${LOCATION_X}px)`;

    label.textContent = `${sortList[i]}`;
    label.style.height = `${sortList[i] * 5 + 10}px`
    
    block.appendChild(label);
    sortBox.appendChild(block);
  }
}

function swapElement(smallValue, largeValue) {
  const smallValueStyle = window.getComputedStyle(smallValue);
  const largeValueStyle = window.getComputedStyle(largeValue);
  
  const smallValueLocation = smallValueStyle.getPropertyValue('transform');
  const largeValueLocation = largeValueStyle.getPropertyValue('transform');
  
  smallValue.style.transform = largeValueLocation;
  largeValue.style.transform = smallValueLocation;
}

export { createBlock, swapElement };
