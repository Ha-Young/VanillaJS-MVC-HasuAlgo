export default function swapNumbersInCanvas(first, second, index) {
  let firstAll = Array.from(document.querySelectorAll(`[data-value="${first}"]`)); 
  let secondAll = Array.from(document.querySelectorAll(`[data-value="${second}"]`));
  
  let firstNode;
  let secondNode;

  firstAll.forEach(eachNode => {
    if (Number(eachNode.style.order) === index + 1) {
      firstNode = eachNode;
    }
  });

  secondAll.forEach(eachnode => {
    if (Number(eachnode.style.order) === index + 2){
      secondNode = eachnode;
    }
  });

  let firstOrder = firstNode.style.order;
  let secondOrder = secondNode.style.order;

  secondNode.style.order = firstOrder;
  firstNode.style.order = secondOrder;
}