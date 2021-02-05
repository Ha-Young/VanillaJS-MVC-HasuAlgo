export default function swapNumbersInCanvas(first, second, index) {
  let nodesOfFirstValue = Array.from(document.querySelectorAll(`[data-value="${first}"]`)); 
  let nodesOfSecondValue = Array.from(document.querySelectorAll(`[data-value="${second}"]`));

  const firstNode = nodesOfFirstValue.find(eachNode => {
    return Number(eachNode.style.order) === index + 1;
  });
 
  const secondNode = nodesOfSecondValue.find(eachNode => {
    return Number(eachNode.style.order) === index + 2;
  });

  let firstOrder = firstNode.style.order;
  let secondOrder = secondNode.style.order;

  secondNode.style.order = firstOrder;
  firstNode.style.order = secondOrder;
}
