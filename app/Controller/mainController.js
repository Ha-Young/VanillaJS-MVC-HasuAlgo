import {bufferRender, renderNumber, finishMove, shadowBlink, showErrorMessage, errorDivToggle, initGraphPannel} from '../View/view';
import numModel from '../Model/model';
import insertionSort from './insertSort/insertSortController';
import quickSort from './quickSort/quickSortController';

const submitButton = document.querySelector("#submitButton");
const textBox = document.querySelector('#textBox');
const mainTitle = document.querySelector('.mainTitle--h1');
let numbersObjArray = [];

submitButton.addEventListener('click', buttonClickEvent);
async function buttonClickEvent () {
  const blank = " ";
  const comma = ",";
  numbersObjArray = [];
  initGraphPannel();
  // err handling
  if (mainTitle.innerText === 'Sorting' || !mainTitle.innerText) {
    showErrorMessage('Please choose the sorting you want!');
    return;
  }

  const textBoxString = textBox.value.trim();
  // err handling
  if (!textBoxString) {
    showErrorMessage('Please input numbers~');
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
    showErrorMessage('Sorry! You only can input the Number lower than 20');
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
  
  errorDivToggle(true);
  await shadowBlink(mainTitle.innerText);
  if (mainTitle.innerText === 'Insertion Sort') {
    const insertionResult = await insertionSort(numbersObjArray);
    finishMove(insertionResult);
  } else {
    const quickResult = await quickSort(numbersObjArray);
    finishMove(quickResult);
  }

  textBox.value = '';
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
  this.style.transform = `translate(0px, -10px)`;
  this.style.fontSize = '50px'
  this.style.textShadow = '1px 1px 5px #343a40';
}

mainTitle.addEventListener('mouseout', mainTitleMouseOutHandler);

function mainTitleMouseOutHandler () {
  this.style.transform = `translate(0px, 0px)`;
  this.style.fontSize = ''
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