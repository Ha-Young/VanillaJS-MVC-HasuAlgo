// Load application styles
import '../assets/styles/index.less';
import { BubbleModel } from '../app/models/model';

const form = document.querySelector('form');
const userChoose = document.querySelector('.user-choose');
const visual = document.querySelector('.visual');
const btn = document.querySelector('.numbers');


function init() {
  btn.addEventListener('click', function () {
    console.log(userChoose.value)

  });
}

init();
