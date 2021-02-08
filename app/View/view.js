import {sortType} from '../public/constants';

// FIX ME : 쓸데없는 접미사 지우기
const $contentDiv = document.querySelector('#content');
const $graphPannelDiv = document.querySelector("#graphPannel");
const $graphCanvas = document.querySelector('.graphPannel--canvas');
const $shadowDiv = document.querySelector('.shadow');
const $shadowTitleSpan = document.querySelector('.shadowTitle');
const $errorMessageDiv = document.querySelector('.errorMessageDiv');
const $backWardArrow = document.querySelector('.backwardArrow');

// FIX ME : 어차피 동적인 파트도 아니니 만들었다 다시하기 보단 만들어놓고 숨기고 드러내는 처리로 수정 -> done
export function addEventToBackArrow() {
  $backWardArrow.addEventListener('click', backToInputPage);
}

async function backToInputPage() {
  $graphPannelDiv.style.opacity = 0;
  await wait(1000);
  $graphPannelDiv.style.display = 'none';
  $contentDiv.style.display = 'flex';
  $contentDiv.style.opacity = 1;
}

export function renderNumber(numRecords) {
  const value = numRecords.value;
  const index = numRecords.index;
  const cordinateX = numRecords.cordinateX;
  const cordinateY = numRecords.cordinateY;
  const height = numRecords.height;

  const oneNumberDiv = document.createElement("div");
  oneNumberDiv.setAttribute('class', 'numberOuter');
  // FIX ME : 동적인 값 저장에는 id보단 data attribute
  oneNumberDiv.setAttribute('id', `bar${index}`);
  const oneNumberInnerDiv = document.createElement("div");
  oneNumberInnerDiv.setAttribute('class', 'numberInner');

  oneNumberInnerDiv.innerHTML = value;
  oneNumberInnerDiv.style.height = `${height}px`;
  oneNumberInnerDiv.style.marginTop = `${300 - (20*value)}px`;
  
  oneNumberDiv.style.transform = `translate(${cordinateX}px, ${cordinateY}px)`;
  
  oneNumberDiv.appendChild(oneNumberInnerDiv);
  $graphCanvas.append(oneNumberDiv);
}

export async function beforeSorting(targetObj, cordinateY, timing, whichJump) {
  const $targetBar = document.querySelector(`#bar${targetObj.index}`);
  const targetBarInnderDiv = $targetBar.childNodes[0];

  targetObj.cordinateY = cordinateY;
  $targetBar.focus();
  $targetBar.style.transform = `translate(${targetObj.cordinateX}px, ${targetObj.cordinateY}px)`;
  if (whichJump === 'last') {
    targetBarInnderDiv.style.animation = "lastJump .8s";
  } else {
    targetBarInnderDiv.style.animation = "jump 1.5s";
  }
  
  // FIX ME : 하드코딩된 컬러 변수화
  targetBarInnderDiv.style.backgroundColor = "#ac1717";
  await wait(timing);
}

// FIX ME : 동기처리와 비동기처리는 나눠놓는것이 좋다.
export async function moveBar(targetObj, cordinateX, cordinateY, isShrink = true) {
  const $targetBar = document.querySelector(`#bar${targetObj.index}`);
  const targetBarInnderDiv = $targetBar.childNodes[0];
  
  targetObj.cordinateY = cordinateY;
  $targetBar.focus();
  $targetBar.style.transform = `translate(${targetObj.cordinateX}px, ${targetObj.cordinateY}px)`;
  targetBarInnderDiv.style.backgroundColor = '#1b58b2';
  if (isShrink) {
    shirinkBar(targetObj, targetBarInnderDiv, cordinateY);
  }

  await wait(1000);
}

function shirinkBar(targetObj, targetBarInnderDiv, cordinateY) {
  if (cordinateY > 0) {
    targetBarInnderDiv.style.height = '30px';
  } else {
    targetBarInnderDiv.style.height = `${targetObj.height}px`;
  }
}

export async function exchange(pivotObj, anotherObj) {
  const tempX = pivotObj.cordinateX;
  pivotObj.cordinateX = anotherObj.cordinateX;
  anotherObj.cordinateX = tempX;
  
  moveBarNoWait(pivotObj.index, pivotObj.cordinateX, pivotObj.cordinateY);
  moveBarNoWait(anotherObj.index, anotherObj.cordinateX, anotherObj.cordinateY);
  
  const $targetBar1 = document.getElementById(`bar${pivotObj.index}`);
  const $targetBar2 = document.getElementById(`bar${anotherObj.index}`);
  
  await wait(1000);
  
  const tempIndex = pivotObj.index;
  pivotObj.index = anotherObj.index;
  anotherObj.index = tempIndex;
  $targetBar1.removeAttribute("id");
  $targetBar2.removeAttribute("id");
  $targetBar1.setAttribute('id', `bar${pivotObj.index}`);
  $targetBar2.setAttribute('id', `bar${anotherObj.index}`);
}

export function moveBarNoWait(targetId, cordinateX, cordinateY) {
  const $targetBar = document.querySelector(`#bar${targetId}`);
  $targetBar.focus();
  $targetBar.style.transform = `translate(${cordinateX}px, ${cordinateY}px)`;
}

export async function shadowBlink(shadowText) {
  $contentDiv.style.opacity = 0;
  $shadowTitleSpan.style.innerText = '';
  await wait(1000);
  $contentDiv.style.display = 'none';
  $graphPannelDiv.style.display = 'inline-block';
  $graphPannelDiv.style.opacity = 1;
  $shadowDiv.style.display = 'flex';
  await wait(1000);
  $shadowTitleSpan.innerText = shadowText;
  await wait(3000);
  $shadowTitleSpan.innerText = '';
  $shadowDiv.style.display = 'none';
}

export async function finishMove(resultArray) {
  const $backArrowSpan = document.querySelector('.backwardArrow');
  for (let numberObj of resultArray) {
    await beforeSorting(numberObj, 0, 300, 'last');
  }
  $backArrowSpan.style.display = 'inline-block';
  await wait(2000);
}

export function showErrorMessage (errorMsg) {
  // FIX ME : textContent를 이용
  $errorMessageDiv.innerHTML = errorMsg;
}

export function errorDivToggle (isDisplayed) {
  $errorMessageDiv.innerHTML = '';
  if (isDisplayed) {
    $errorMessageDiv.style.display = 'none';
    return;
  }
  $errorMessageDiv.style.display = 'block';
}

export function initGraphPannel() {
  // FIX ME : 콤마 통일 => done
  $graphCanvas.innerHTML = '';
}

export function mainTitleHoverHandler () {
  this.style.transform = 'translate(0px, -10px)';
  this.style.fontSize = '50px';
  this.style.textShadow = '1px 1px 5px #343a40';
}

export function mainTitleMouseOutHandler () {
  this.style.transform = `translate(0px, 0px)`;
  this.style.fontSize = ''
  this.style.textShadow = '0px 0px 0px white';
}

export function mainTitleToggleHandler () {
  if (this.innerText !== sortType.insertion) {
    this.innerText = sortType.insertion;
  } else {
    this.innerText = sortType.quick;
  }
}

// FIX ME : wait -> delay
export function wait(second) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, second);
  })
}