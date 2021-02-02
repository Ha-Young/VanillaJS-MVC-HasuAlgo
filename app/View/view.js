/*

  View는 오로지 html Rendering에만 집중한다.

*/

export function renderNumber (numRecords) {
  const value = numRecords.value;
  const index = numRecords.index;
  const cordinateX = numRecords.cordinateX;
  const cordinateY = numRecords.cordinateY;

  const graphPannelDiv = document.querySelector("#graphPannel");
  const oneNumberDiv = document.createElement("div");
  oneNumberDiv.setAttribute('class', 'numberOuter');
  oneNumberDiv.setAttribute('id', `bar${index}`);
  const oneNumberInnerDiv = document.createElement("div");
  oneNumberInnerDiv.setAttribute('class', 'numberInner')

  oneNumberInnerDiv.innerHTML = value;
  oneNumberInnerDiv.style.height = `${(30*value)}px`;
  oneNumberInnerDiv.style.marginTop = `${300 - (30*value)}px`;
  
  oneNumberDiv.style.transform = `translate(${cordinateX}px, ${cordinateY}px)`;
  oneNumberDiv.addEventListener('transitionend', function () {

  });
  
  oneNumberDiv.appendChild(oneNumberInnerDiv);
  graphPannelDiv.appendChild(oneNumberDiv);
}

export function beforeSorting (targetObj, cordinateX, cordinateY) {
  return new Promise((resolve, reject) => {
    targetObj.cordinateY = cordinateY;
    const targetBar = document.querySelector(`#bar${targetObj.index}`);
    targetBar.focus();
    targetBar.style.transform = `translate(${targetObj.cordinateX}px, ${targetObj.cordinateY}px)`;
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

export function moveBar (targetObj, cordinateX, cordinateY) {
  return new Promise((resolve, reject) => {
    targetObj.cordinateY = cordinateY;
    const targetBar = document.querySelector(`#bar${targetObj.index}`);
    targetBar.focus();
    targetBar.style.transform = `translate(${targetObj.cordinateX}px, ${targetObj.cordinateY}px)`;
    setTimeout(() => {
      resolve();
    }, 2000);
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

    console.log("Y = ",pivotObj.cordinateY)

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
    }, 2000);
  })
}