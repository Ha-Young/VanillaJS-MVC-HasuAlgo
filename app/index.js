// Load application styles
import '../assets/styles/index.less';
import Bubble from './model/bubbleSort.js';
import model from './model/model.js';
import {view} from './view.js';

// ================================
// START YOUR APP HERE
// ================================

// should know about the existence of Models in order to observe them,
// but don’t directly communicate with them.
// View's main tasks are to render provided HTML template
// with corrected data from the model.

// 6,2,8,4,11,30,1,99,5

const button = document.querySelector(".button");
const inputNumbers = document.querySelector(".inputNumbers");
const content = document.querySelector(".content");


function numberSubmit(event) {
  event.preventDefault();
  const result = model.getData(inputNumbers.value);
  sortStart(result);
}

// number - model에 보내서 validate

// bubble 시작
let isSwitched = false;

function sortStart(data) {
  newTemplate(data);

  bubble(data);
}

function bubble(numList) {
  for (let i = 1; i < numList.length; i++) {
    if (numList[i - 1] > numList[i]) {
      isSwitched = true;
      [numList[i - 1], numList[i]] = [numList[i], numList[i - 1]];
      // debugger;
      // content.innerHTML = newTemplate(numList);
      // await displayNumbers(numList);
      // console.log('hi')
      newTemplate(numList);
    }
  }

  if (isSwitched) {
    isSwitched = false;
    bubble(numList);
  }

  newTemplate(numList);

  // displayNumbers(numList);
}



// 변화가 일어나면 view render
function displayNumbers(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve(newTemplate(data)), 1500);
  });
}

function newTemplate(data) {
  content.innerHTML = `<div class="content">
  <input type="text" name="numbers" class="inputNumbers">
  <input type="button" value="send" class="button">
  ​<h3>${data}</h3>
  <h1>Visualize Sorting Algorithms</h1>
  <p>README.md를 읽어보고 과제를 시작하세요.</p>
  </div>`;
}


function init() {
  button.addEventListener('click', numberSubmit);
}

init();

export {numberSubmit};
