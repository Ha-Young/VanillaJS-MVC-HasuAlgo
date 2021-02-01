/*

  View는 오로지 html Rendering에만 집중한다.

*/

export default function renderNumber (number, index) {
  const graphPannelDiv = document.querySelector("#graphPannel");
  const oneNumberDiv = document.createElement("div");
  oneNumberDiv.setAttribute('class', 'numberOuter');
  const oneNumberInnerDiv = document.createElement("div");
  oneNumberInnerDiv.setAttribute('class', 'numberInner')

  oneNumberInnerDiv.innerHTML = number;
  oneNumberInnerDiv.style.height = `${(30*number)}px`;
  
  const num = Math.floor(1000/number);
  console.log(num)
  oneNumberDiv.style.transform = `translate(${num}px, 0px)`
  oneNumberDiv.addEventListener('click', function () {
    oneNumberDiv.style.transform = "translate(0px, 350px)"
  })
  
  oneNumberDiv.appendChild(oneNumberInnerDiv);
  graphPannelDiv.appendChild(oneNumberDiv);
}