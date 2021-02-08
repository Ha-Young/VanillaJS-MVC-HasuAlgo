import {sortType} from '../public/constants';
import {bufferRender, renderNumber, finishMove, shadowBlink, showErrorMessage, errorDivToggle, initGraphPannel, mainTitleHoverHandler, mainTitleMouseOutHandler, mainTitleToggleHandler, addEventToBackArrow} from '../View/view';
import NumModel from '../Model/model';
import insertionSort from './insertSort/insertSortController';
import quickSort from './quickSort/quickSortController';

const submitButton = document.querySelector("#submitButton");
const textBox = document.querySelector('#textBox');
const mainTitle = document.querySelector('.mainTitle--h1');
let numbersObjArray = [];

submitButton.addEventListener('click', buttonClickEvent);
async function buttonClickEvent() {
  numbersObjArray = [];
  initGraphPannel();

  const mainTitleText = mainTitle.innerText;
  const numbersArray = checkIfValidate(mainTitleText);
  if (!numbersArray) {
    return;
  }
  
  const oneSectionPx = Number.parseInt(Math.round(950 / (numbersArray.length - 1)));
  addEventToBackArrow();
  numbersArray.forEach((el, index) => {
    const cordinateX = oneSectionPx * index;
    const cordinateY = 0;
    const heightVal = (20*el);
    const newNumObj = new NumModel(el, index, cordinateX, cordinateY, heightVal);
    numbersObjArray.push(newNumObj);
    console.log(newNumObj.getNumRecords());
    renderNumber(newNumObj.getNumRecords());
  });
  
  textBox.value = '';
  errorDivToggle(true);
  await shadowBlink(mainTitleText);
  // FIX ME : 하드코딩 변수화 => done
  // FIX ME : finishMove 중복 해결 => done
  let sortingResult;
  if (mainTitleText === sortType.insertion) {
    sortingResult = await insertionSort(numbersObjArray);
  } else {
    sortingResult = await quickSort(numbersObjArray);
  }

  finishMove(sortingResult);
}

function checkIfValidate(mainTitleText) {
  // err handling
  // FIX ME : 긴 표현이 중복 -> 변수 할당
  // FIX ME : validation 로직 함수 분리 -> done
  if (mainTitleText === 'Sorting' || !mainTitleText) {
    showErrorMessage('Please choose the sorting you want!');
    return false;
  }

  const textBoxString = textBox.value.trim();
  // err handling
  if (!textBoxString) {
    showErrorMessage('Please input numbers~');
    return false;
  }
  // FIX ME : 정규표현식 => ????
  // FIX ME : 함수분리 => done
  // FIX ME : 엣지케이스 처리 추가 => seperator를 정규표현식으로 해서 해결
  const numbersArray = splitString(textBoxString, checkSeperator(textBoxString));

  // err hanling
  // FIX ME : error를 false로 => done
  if (!numbersArray) {
    showErrorMessage('Sorry! You only can input the Number lower than 20');
    return false;
  }

  return numbersArray;
}

function checkSeperator(textBoxString) {
  const COMMA = ',';
  const BLANK = ' ';
  if (textBoxString.includes(COMMA)) {
    return /\s*,\s*/g;
  } else if (textBoxString.includes(BLANK)) {
    return /\s+/g;
  } else {
    return '';
  }
}

function splitString(textBoxString, seperator) {
  console.log(seperator);
  const splitedArray = textBoxString.split(seperator);
  console.log(splitedArray);
  const returnArray = [];
  for (let word of splitedArray) {
    const checkedWord = isWordValidate(word);
    console.log(checkedWord);
    if (!checkedWord) {
      return false;
    }

    if (checkedWord === -1) {
      continue;
    }

    returnArray.push(checkedWord);
  }

  return returnArray;
}

function isWordValidate(word) {
  const WORD_LENGTH_LIMIT = 20;
  word = word.replace(/[\s]/g, '').trim();
  word = Number.parseInt(word);
  // FIX ME : validation과 문자 나누는 역할 나누기
  // FIX ME : 하드코딩 변수화 -> done
  // ???? : if를 각각 조건으로 쪼개는게 나을까...? 아니면 최대한 짧게 하기 위해 이렇게 두는게 나을까...?
  console.log(word);
  if(Number.isNaN(word) || word > WORD_LENGTH_LIMIT) {
    return false;
  }
  if (!word) {
    return -1;
  }

  return word;
}

mainTitle.addEventListener('mouseover', mainTitleHoverHandler);

mainTitle.addEventListener('mouseout', mainTitleMouseOutHandler);

mainTitle.addEventListener('click', mainTitleToggleHandler);
