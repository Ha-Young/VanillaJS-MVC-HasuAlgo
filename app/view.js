
function View () {
  this._INPUT = document.querySelector(".numberInput");
  this._VISUALIZATION = document.querySelector(".visualization");
  this._CONTAINER = document.querySelector(".container");
  this._FORM = document.querySelector(".sortForm");
  this._INITIAL_COLOR = "#bdc3c7";
  this._PIVOT_COLOR = "#f1c40f";
  this._SORTED_COLOR = "#27ae60";
  this._HEIGHT_ADJUST = 35;
}

View.prototype.initializeContainer = function () {
  this._CONTAINER.innerHTML = " ";
}

View.prototype.showInitial = function (result) {
  for (let i = 0; i < result.length; i++) {
    const bar = document.createElement("div");

    bar.classList.add("divBar");
    bar.style.height = ((result[i] * this._HEIGHT_ADJUST) + "px");
    bar.innerText = result[i];

    this._CONTAINER.appendChild(bar);   
  }  

  this._VISUALIZATION.appendChild(this._CONTAINER);
}

View.prototype.showSwap = function (index1, index2) {
  const greater = this._CONTAINER.childNodes[index1 + 1];
  const smaller = this._CONTAINER.childNodes[index2 + 1];

  const smallerValue = parseInt(smaller.innerText);
  const greaterValue = parseInt(greater.innerText);

  greater.style.height = ((smallerValue * this._HEIGHT_ADJUST) + "px");
  greater.innerText = smallerValue;
  smaller.style.height = ((greaterValue * this._HEIGHT_ADJUST) + "px");
  smaller.innerText = greaterValue;
}

View.prototype.paintBar = function (type, ...indexList) {
  let color;

  if (type === "pivot") {
    color = this._PIVOT_COLOR;
  } else if (type === "sorted") {
    color = this._SORTED_COLOR;
  } else if (type === "initial") {
    color = this._INITIAL_COLOR;
  }

  for (let i = 0; i < indexList.length; i++) {
    const bar = this._CONTAINER.childNodes[indexList[i] + 1];
    bar.style.backgroundColor = color;
  }
}

View.prototype.pointBars = function (index1, index2) {

}

export {View};
