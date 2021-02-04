/*

  Contoller의 역할

  html에서 받은 입력을 이곳에서 받아 Model에 저장,
  출력시엔 이곳에서 계산한 결과를 View에 뿌려준다.

*/

import {bufferRender, renderNumber, beforeSorting} from '../View/view';
import initGraphPannel from '../View/initGraphPannel';
import numModel from '../Model/model';

import insertionSort from './insertSort/insertSortController';
import quickSort from './quickSort/quickSortController';

const submitButton = document.querySelector("#submitButton");
const textBox = document.querySelector('#textBox');
const contentDiv = document.querySelector('.content');
const graphPannelDiv = document.querySelector('.graphPannel');
const $errorMessageDiv = document.querySelector('.errorMessageDiv');
const mainTitle = document.querySelector('.mainTitle--h1');
const shadowDiv = document.querySelector('.shadow');
const shadowTitleSpan = document.querySelector('.shadowTitle');
let numbersObjArray = [];

//submit 버튼에 이벤트 심기
submitButton.addEventListener('click', buttonClickEvent);

async function buttonClickEvent () {
  const blank = " ";
  const comma = ",";
  // init
  numbersObjArray = [];
  initGraphPannel();
  $errorMessageDiv.style.display = 'block';

  // err handling
  if (mainTitle.innerText === 'Sorting' || !mainTitle.innerText) {
    $errorMessageDiv.innerHTML = 'Please choose the sorting you want!';
    return;
  }

  // TODO : 다 끝나고 const로 바꿔주기
  let textBoxString = textBox.value.trim();
  // err handling
  if (!textBoxString) {
    console.error('No text!!');
    $errorMessageDiv.innerHTML = 'Please input numbers~';
    return;
    // test
    textBoxString = '5,3,4,1,2';
  }

  let numbersArray;
  if (textBoxString.includes(comma)) {
    //console.log('comma has!');
    numbersArray = splitString(textBoxString, comma);
  } else if (textBoxString.includes(blank)) {
    //console.log('blank has!');
    numbersArray = splitString(textBoxString, blank);
  } else {
    //console.log('none has!');
    numbersArray = splitString(textBoxString, '');
  }

  // err hanling
  if (numbersArray === -1) {
    console.error('You only can input only the Number lower than 20');
    $errorMessageDiv.innerHTML = 'Sorry! You only can input the Number lower than 20';
    return;
  }
  
  const oneSectionPx = Number.parseInt(Math.round(950 / (numbersArray.length - 1)));

  bufferRender();

  // First rendering
  numbersArray.forEach((el, index) => {
    const cordinateX = oneSectionPx * index;
    const cordinateY = 0;
    const heightVal = (20*el);
    const newNumObj = new numModel(el, index, cordinateX, cordinateY, heightVal);
    numbersObjArray.push(newNumObj);
    renderNumber(newNumObj.getNumRecords());
  });

  

  contentDiv.style.opacity = 0;
  shadowTitleSpan.style.innerText = '';
  $errorMessageDiv.innerHTML = '';
  $errorMessageDiv.style.display = 'none';
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      contentDiv.style.display = 'none';
      graphPannelDiv.style.display = 'inline-block';
      graphPannelDiv.style.opacity = 1;
      shadowDiv.style.display = 'flex';
      setTimeout(() => {
        shadowTitleSpan.innerText = mainTitle.innerText;
        setTimeout(() => {
          shadowTitleSpan.innerText = '';
          shadowDiv.style.display = 'none';
          resolve();
        }, 3000);
      }, 1000);
    }, 1000);
  });

  if (mainTitle.innerText === 'Insertion Sort') {
    await insertionSort(numbersObjArray);
  } else {
    const quickResult = await quickSort(numbersObjArray);
    const backArrowSpan = document.querySelector('.backwardArrow');
      await new Promise(async (resolve, reject) => {
        for (let numberObj of quickResult) {
          await beforeSorting(numberObj, 0, 300, 'last');
        }
        backArrowSpan.style.display = 'inline-block';
        setTimeout(() => {
          resolve();
        }, 2000);
      });
  }
  console.log('process done');
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