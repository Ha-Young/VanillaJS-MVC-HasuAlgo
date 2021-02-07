import delay from "../model-functions/delay";

const moveCounts = {};

export default async function divideCloudsInCanvas(left, right) {
  const DELAY_TIME = 700;
  await delay(DELAY_TIME);

  left.forEach(item => {
    let eachLeftItem = document.querySelector(`[data-value="${item}"]`);

    if (!moveCounts[item]) {
      moveCounts[item] = {x: 1, y: 1};
    } else {
      moveCounts[item].x += 1;
      moveCounts[item].y += 1;
    }

    const positionX = moveCounts[item].x;
    const positionY = moveCounts[item].y;

    eachLeftItem.style.transform = `translate(-${positionX + 10}px, ${positionY * 70}px)`;
  });
  
  right.forEach(item => {
    let eachRightItem = document.querySelector(`[data-value="${item}"]`);

    if (!moveCounts[item]) {
      moveCounts[item] = {x: 1, y: 1};
    } else {
      moveCounts[item].x += 1;
      moveCounts[item].y += 1;
    }

    const positionX = moveCounts[item].x;
    const positionY = moveCounts[item].y;

    eachRightItem.style.transform = `translate(${positionX + 10}px, ${positionY * 70}px)`;
  });
}
