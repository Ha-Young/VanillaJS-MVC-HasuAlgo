import {bufferRender, renderNumber, beforeSorting, wait, finishMove} from '../View/view';
import initGraphPannel from '../View/initGraphPannel';
import numModel from '../Model/model';

import insertionSort from './insertSort/insertSortController';
import quickSort from './quickSort/quickSortController';

// TODO : (선택...) 각 막대에 뛸때 땀 추가
// TODO : 글씨체 바꾸기
// TODO : css정리

// TODO : DOM selector 들은 모두 전역변수로
// TODO : DOM selector 변수 명 앞에 $표시 붙이고 나머지들 수정
const submitButton = document.querySelector("#submitButton");
const textBox = document.querySelector('#textBox');
const contentDiv = document.querySelector('.content');
const graphPannelDiv = document.querySelector('.graphPannel');
const $errorMessageDiv = document.querySelector('.errorMessageDiv');
const mainTitle = document.querySelector('.mainTitle--h1');
const shadowDiv = document.querySelector('.shadow');
const shadowTitleSpan = document.querySelector('.shadowTitle');
let numbersObjArray = [];

submitButton.addEventListener('click', buttonClickEvent);
async function buttonClickEvent () {
  const blank = " ";
  const comma = ",";
  numbersObjArray = [];
  graphPannelDiv.innerHTML = "";
  $errorMessageDiv.style.display = 'block';

  // err handling
  if (mainTitle.innerText === 'Sorting' || !mainTitle.innerText) {
    $errorMessageDiv.innerHTML = 'Please choose the sorting you want!';
    return;
  }

  const textBoxString = textBox.value.trim();
  // err handling
  if (!textBoxString) {
    console.error('No text!!');
    $errorMessageDiv.innerHTML = 'Please input numbers~';
    return;
  }

  let numbersArray;
  if (textBoxString.includes(comma)) {
    numbersArray = splitString(textBoxString, comma);
  } else if (textBoxString.includes(blank)) {
    numbersArray = splitString(textBoxString, blank);
  } else {
    numbersArray = splitString(textBoxString, '');
  }

  // err hanling
  if (numbersArray === -1) {
    $errorMessageDiv.innerHTML = 'Sorry! You only can input the Number lower than 20';
    return;
  }
  
  const oneSectionPx = Number.parseInt(Math.round(950 / (numbersArray.length - 1)));
  bufferRender();

  numbersArray.forEach((el, index) => {
    const cordinateX = oneSectionPx * index;
    const cordinateY = 0;
    const heightVal = (20*el);
    const newNumObj = new numModel(el, index, cordinateX, cordinateY, heightVal);
    numbersObjArray.push(newNumObj);
    renderNumber(newNumObj.getNumRecords());
  });
  
  $errorMessageDiv.innerHTML = '';
  $errorMessageDiv.style.display = 'none';

  // TODO : view에 묶어놓기
  contentDiv.style.opacity = 0;
  shadowTitleSpan.style.innerText = '';
  await wait(1000);
  contentDiv.style.display = 'none';
  graphPannelDiv.style.display = 'inline-block';
  graphPannelDiv.style.opacity = 1;
  shadowDiv.style.display = 'flex';
  await wait(1000);
  shadowTitleSpan.innerText = mainTitle.innerText;
  await wait(3000);
  shadowTitleSpan.innerText = '';
  shadowDiv.style.display = 'none';

  if (mainTitle.innerText === 'Insertion Sort') {
    const insertionResult = await insertionSort(numbersObjArray);
    finishMove(insertionResult);
  } else {
    const quickResult = await quickSort(numbersObjArray);
    finishMove(quickResult);
  }
}

function splitString (textBoxString, seperator) {
  const splitedArray = textBoxString.split(seperator);
  const returnArray = [];
  for (let word of splitedArray) {
    word = word.replace(/[\s]/g, '').trim();
    word = Number.parseInt(word);
    if(Number.isNaN(word) || word > 20) {
      return -1;
    }

    if (word !== '') {
      returnArray.push(word);
    }
  }

  return returnArray;
}

mainTitle.addEventListener('mouseover', mainTitleHoverHandler);

function mainTitleHoverHandler () {
  this.style.transform = `translate(px, -30px)`;
  this.style.textShadow = '1px 1px 2px #343a40';
}

mainTitle.addEventListener('mouseout', mainTitleMouseOutHandler);

function mainTitleMouseOutHandler () {
  this.style.transform = `translate(0px, 0px)`;
  this.style.textShadow = '0px 0px 0px white';
}


mainTitle.addEventListener('click', mainTitleToggleHandler);

function mainTitleToggleHandler () {
  if (this.innerText !== 'Insertion Sort') {
    this.innerText = 'Insertion Sort';
  } else {
    this.innerText = 'Quick Sort';
  }
}