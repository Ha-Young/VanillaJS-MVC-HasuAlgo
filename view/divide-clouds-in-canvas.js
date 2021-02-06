import delay from "../model/delay";

const offsets = {};

export default async function divideCloudsInCanvas(left, right) {
  await delay(700);

  left.forEach(item => {
    let eachLeftItem = document.querySelector(`[data-value="${item}"]`);

    if (!offsets[item]) {
      offsets[item] = {x: 1, y: 1};
    } else {
      offsets[item].x += 1;
      offsets[item].y += 1;
    }

    const posX = offsets[item].x;
    const posY = offsets[item].y;

    eachLeftItem.style.transform = `translate(-${posX+10}px, ${posY * 70}px)`;
  });
  
  right.forEach(item => {
    let eachRightItem = document.querySelector(`[data-value="${item}"]`);

    if (!offsets[item]) {
      offsets[item] = {x: 1, y: 1};
    } else {
      offsets[item].x += 1;
      offsets[item].y += 1;
    }

    const posX = offsets[item].x;
    const posY = offsets[item].y;

    eachRightItem.style.transform = `translate(${posX + 10}px, ${posY * 70}px)`;
  });
}