
function View (template) {
  this._INPUT = document.querySelector(".numberInput");
  this._VISUALIZATION = document.querySelector(".visualization");
  this._CONTAINER = document.querySelector(".container");
  this._FORM = document.querySelector(".sortForm");
  this._COLOR = "#2BAE66";
  this._HEIGHT_ADJUST = 35;
}

View.prototype.showForm = function () {
  this._FORM.classList.remove("hide");
}

View.prototype.hideForm = function () {
  this._FORM.classList.add("hide");
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

View.prototype.paintSorted = function (index) {
  const done = this._CONTAINER.childNodes[index + 1];
  done.style.backgroundColor = "#78e08f";
}

export {View};
