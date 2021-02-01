import { BubbleModel } from '../models/model';

const form = document.querySelector('form');
const userValue = document.querySelector('.user-choose');
const visual = document.querySelector('.visual');
const btn = document.querySelector('.numbers');


function passUserValue() {
  let refineValue = [...userValue.value].map(n => {
    return Number(n);
  });
  
  const bubble = new BubbleModel(refineValue);
  bubble.execute()
}

function init() {
  btn.addEventListener('click', passUserValue);
}

init();
