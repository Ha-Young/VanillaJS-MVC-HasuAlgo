/*

  View는 오로지 html Rendering에만 집중한다.

*/

import leftArrow from './../../assets/images/leftArrow.png';

const contentDiv = document.querySelector('.content');
const graphPannelDiv = document.querySelector("#graphPannel");

export function bufferRender () {
  graphPannelDiv.innerHTML = '';
  const graphPannelBufferDiv = document.createElement("div");

  const arrowDivTag = document.createElement("div");
  arrowDivTag.setAttribute('class', 'backwardArrow');
  arrowDivTag.style.display = 'none';
  arrowDivTag.addEventListener('click', backToInputPage);
  
  const arrowImageTag = document.createElement("img");
  arrowImageTag.setAttribute('class', 'leftArrow');
  arrowImageTag.setAttribute('src', leftArrow);
  arrowDivTag.appendChild(arrowImageTag);
  graphPannelBufferDiv.appendChild(arrowDivTag);

  graphPannelBufferDiv.setAttribute('class', 'graphPannel--buffer');
  graphPannelBufferDiv.style.height = '30%';
  graphPannelDiv.appendChild(graphPannelBufferDiv);
}

export function renderNumber (numRecords) {
  const value = numRecords.value;
  const index = numRecords.index;
  const cordinateX = numRecords.cordinateX;
  const cordinateY = numRecords.cordinateY;
  const height = numRecords.height;

  const graphPannelDiv = document.querySelector("#graphPannel");
  const oneNumberDiv = document.createElement("div");
  oneNumberDiv.setAttribute('class', 'numberOuter');
  oneNumberDiv.setAttribute('id', `bar${index}`);
  const oneNumberInnerDiv = document.createElement("div");
  oneNumberInnerDiv.setAttribute('class', 'numberInner');

  oneNumberInnerDiv.innerHTML = value;
  oneNumberInnerDiv.style.height = `${height}px`;
  oneNumberInnerDiv.style.marginTop = `${300 - (20*value)}px`;
  
  oneNumberDiv.style.transform = `translate(${cordinateX}px, ${cordinateY}px)`;
  
  oneNumberDiv.appendChild(oneNumberInnerDiv);
  graphPannelDiv.appendChild(oneNumberDiv);
}

export function beforeSorting (targetObj, cordinateY, timing, whichJump) {
  return new Promise((resolve, reject) => {
    targetObj.cordinateY = cordinateY;
    const targetBar = document.querySelector(`#bar${targetObj.index}`);
    const targetBarInnderDiv = targetBar.childNodes[0];
    targetBar.focus();
    targetBar.style.transform = `translate(${targetObj.cordinateX}px, ${targetObj.cordinateY}px)`;
    if (whichJump === 'last') {
      targetBarInnderDiv.style.animation = "lastJump .8s";
    } else {
      targetBarInnderDiv.style.animation = "jump 1.5s";
    }
    
    targetBarInnderDiv.style.backgroundColor = "#ac1717";
    setTimeout(() => {
      resolve();
    }, timing);
  });
}

export function moveBar (targetObj, cordinateX, cordinateY) {
  return new Promise((resolve, reject) => {
    targetObj.cordinateY = cordinateY;
    const targetBar = document.querySelector(`#bar${targetObj.index}`);
    const targetBarInnderDiv = targetBar.childNodes[0];
    targetBar.focus();
    targetBar.style.transform = `translate(${targetObj.cordinateX}px, ${targetObj.cordinateY}px)`;
    if (cordinateY > 0) {
      targetBarInnderDiv.style.height = '30px';
    } else {
      console.log('is come????', targetObj.height);
      targetBarInnderDiv.style.height = `${targetObj.height}px`;
      targetBarInnderDiv.style.backgroundColor = '#1b58b2';
    }
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export function moveBarNoWait (targetId, cordinateX, cordinateY) {
  return new Promise((resolve, reject) => {
    const targetBar = document.querySelector(`#bar${targetId}`);
    targetBar.focus();
    targetBar.style.transform = `translate(${cordinateX}px, ${cordinateY}px)`;
    resolve();
  });
}

export function exchange (pivotObj, anotherObj) {
  return new Promise((resolve, reject) => {
    console.log("exchanging");
    const temp = pivotObj.cordinateX;
    pivotObj.cordinateX = anotherObj.cordinateX;
    anotherObj.cordinateX = temp;

    moveBarNoWait(pivotObj.index, pivotObj.cordinateX, pivotObj.cordinateY);
    moveBarNoWait(anotherObj.index, anotherObj.cordinateX, anotherObj.cordinateY);

    const targetBar1 = document.getElementById(`bar${pivotObj.index}`);
    const targetBar2 = document.getElementById(`bar${anotherObj.index}`);
    setTimeout(() => {
      const temp = pivotObj.index;
      pivotObj.index = anotherObj.index;
      anotherObj.index = temp;
      targetBar1.removeAttribute("id");
      targetBar2.removeAttribute("id");
      targetBar1.setAttribute('id', `bar${pivotObj.index}`);
      targetBar2.setAttribute('id', `bar${anotherObj.index}`);
      resolve();
    }, 1000);
  })
}

async function backToInputPage () {
  await new Promise((resolve, reject) => {
    graphPannelDiv.style.opacity = 0;
      setTimeout(() => {
        graphPannelDiv.style.display = 'none';
        contentDiv.style.display = 'flex';
        contentDiv.style.opacity = 1;
      }, 1000);
  })
}
