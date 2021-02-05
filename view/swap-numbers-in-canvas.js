export default function swapNumbersInCanvas(first, second, index) {
  let firstAll = Array.from(document.querySelectorAll(`[data-value="${first}"]`)); 
  let secondAll = Array.from(document.querySelectorAll(`[data-value="${second}"]`));

  const firstNode = firstAll.find(eachNode => {
    return Number(eachNode.style.order) === index + 1;
  });
 
  const secondNode = secondAll.find(eachNode => {
    return Number(eachNode.style.order) === index + 2;
  });

  let firstOrder = firstNode.style.order;
  let secondOrder = secondNode.style.order;

  secondNode.style.order = firstOrder;
  firstNode.style.order = secondOrder;
}
