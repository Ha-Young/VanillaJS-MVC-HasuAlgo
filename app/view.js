import { fill } from "lodash";

function View () {
  this._INPUT = document.querySelector(".numberInput");
  this._VISUALIZATION = document.querySelector(".visualization");
  this._CONTAINER = document.querySelector(".container");
  this._FORM = document.querySelector(".sortForm");

  this._INITIAL_COLOR = "#bdc3c7";
  this._PIVOT_COLOR = "#f1c40f";
  this._SORTED_COLOR = "#27ae60";
  this._SELECTED_COLOR = "purple";
  this._HEIGHT_ADJUST = 35;
}

View.prototype.initializeContainer = function () {
  this._CONTAINER.innerHTML = " ";
}

View.prototype.showInitial = function (result) {
  for (let i = 0; i < result.length; i++) {
    const bar = document.createElement("div");

    bar.classList.add("divBar");
    bar.setAttribute("id", i);
    bar.style.height = ((result[i] * this._HEIGHT_ADJUST) + "px");
    bar.innerText = result[i];

    this._CONTAINER.appendChild(bar);   
  }  

  this._VISUALIZATION.appendChild(this._CONTAINER);
}

View.prototype.showSwap = function (index1, index2) {
  const greater = document.getElementById(index1);
  const smaller = document.getElementById(index2);

  const greaterRect = greater.getBoundingClientRect();
  const smallerRect = smaller.getBoundingClientRect();
  const diff = smallerRect.x - greaterRect.x;

  const greaterStyle = window.getComputedStyle(greater);
  const smallerStyle = window.getComputedStyle(smaller);
  const greaterMatrix = new WebKitCSSMatrix(greaterStyle.transform);
  const smallerMatrix = new WebKitCSSMatrix(smallerStyle.transform);
  const greaterTranslatedX = greaterMatrix.m41;
  const smallerTranslatedX = smallerMatrix.m41;

  greater.style.transition = "transform 0.5s linear";
  smaller.style.transition = "transform 0.5s linear";

  greater.style.transform = `translateX(${greaterTranslatedX + diff}px)`;
  smaller.style.transform = `translateX(${smallerTranslatedX - diff}px)`;

  greater.setAttribute("id", index2);
  smaller.setAttribute("id", index1);
}

View.prototype.paintBar = function (type, ...indexList) {
  let color;

  if (type === "pivot") {
    color = this._PIVOT_COLOR;
  } else if (type === "sorted") {
    color = this._SORTED_COLOR;
  } else if (type === "initial") {
    color = this._INITIAL_COLOR;
  } else if (type === "selected") {
    color = this._SELECTED_COLOR;
  }

  for (let i = 0; i < indexList.length; i++) {
    const bar = document.getElementById(indexList[i]);
    bar.style.backgroundColor = color;
  }
}

export {View};
