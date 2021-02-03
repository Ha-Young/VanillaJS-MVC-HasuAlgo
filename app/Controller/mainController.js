/*

  Contoller의 역할

  html에서 받은 입력을 이곳에서 받아 Model에 저장,
  출력시엔 이곳에서 계산한 결과를 View에 뿌려준다.

*/

import {bufferRender, renderNumber} from '../View/view';
import initGraphPannel from '../View/initGraphPannel';
import numModel from '../Model/model';

import insertionSort from './insertSort/insertSortController';

const submitButton = document.querySelector("#submitButton");
const textBox = document.querySelector('#textBox');
const contentDiv = document.querySelector('.content');
const graphPannelDiv = document.querySelector('.graphPannel');
let numbersObjArray = [];

//submit 버튼에 이벤트 심기
submitButton.addEventListener('click', buttonClickEvent);

async function buttonClickEvent() {
  const blank = " ";
  const comma = ",";
  // init
  numbersObjArray = [];
  initGraphPannel();

  // TODO : 다 끝나고 const로 바꿔주기
  let textBoxString = textBox.value.trim();
  // err handling
  if (!textBoxString) {
    //console.error('No text!!');
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

  if (numbersArray === -1) {
    console.error('You only can input Number lower than 10');
  }

  //console.log(numbersArray);
  
  const oneSectionPx = Number.parseInt(Math.round(950 / (numbersArray.length - 1)));

  //console.log(oneSectionPx);
  bufferRender();

  // First rendering
  numbersArray.forEach((el, index) => {
    const cordinateX = oneSectionPx * index;
    const cordinateY = 0;
    const newNumObj = new numModel(el, index, cordinateX, cordinateY);
    numbersObjArray.push(newNumObj);
    renderNumber(newNumObj.getNumRecords());
  });

  const shadowDiv = document.querySelector('.shadow');

  contentDiv.style.opacity = 0;
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      contentDiv.style.display = 'none';
      graphPannelDiv.style.display = 'inline-block'
      shadowDiv.style.display = 'flex';
      setTimeout(() => {
        shadowDiv.innerText = 'insert Sort!';
        setTimeout(() => {
          shadowDiv.style.display = 'none';
          resolve();
        }, 1000);
      }, 1000);
    }, 1000);
  });

  // TODO : insert와 Quick을 구분해 시작하기
  // 우선 insert부터

  await insertionSort(numbersObjArray);

}

function splitString (textBoxString, seperator) {
  const splitedArray = textBoxString.split(seperator);
  const returnArray = [];
  for (let word of splitedArray) {
    word = word.replace(/[\s]/g, '').trim();
    word = Number.parseInt(word);
    if(Number.isNaN(word) || word > 10) {
        
      return -1;
    }

    if (word !== '') {
      returnArray.push(word);
    }
  }

  return returnArray;
}

