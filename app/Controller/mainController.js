/*

  Contoller의 역할

  html에서 받은 입력을 이곳에서 받아 Model에 저장,
  출력시엔 이곳에서 계산한 결과를 View에 뿌려준다.

*/

import view from '../View/view';

const submitButton = document.querySelector("#submitButton");
const textBox = (document.querySelector('#textBox'));

//submit 버튼에 이벤트 심기
submitButton.addEventListener('click', buttonClickEvent);

function buttonClickEvent() {
  const blank = " ";
  const comma = ",";

  const textBoxString = textBox.value.trim();
  // err handling
  if (!textBoxString) {
    console.error('No text!!');
  }

  let textArray;
  if (textBoxString.includes(comma)) {
    console.log('comma has!');
    textArray = splitString(textBoxString, comma);
  } else if (textBoxString.includes(blank)) {
    console.log('blank has!');
    textArray = splitString(textBoxString, blank);
  } else {
    console.log('none has!');
    textArray = splitString(textBoxString, '');
  }

  if (textArray === -1) {
    console.error('You only can input Number lower than 10');
  }

  console.log(textArray);

  textArray.forEach((el) => {
    view(el);
  });
  
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

