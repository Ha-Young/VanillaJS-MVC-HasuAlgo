
function View (template) {
  this._COLOR = "#2BAE66";
  this._HEIGHT_ADJUST = 25;
  this._VISUALIZATION = document.querySelector(".visualization");
  this._CONTAINER = document.querySelector(".container");
}

View.prototype.showInitial = function (result) {
  this._CONTAINER.classList.add("container");
  this._VISUALIZATION.innerHTML = " ";

  for (let i = 0; i < result.length; i++) {
    const bar = document.createElement("div");

    bar.classList.add("divBar");
    bar.style.height = ((result[i] * this._HEIGHT_ADJUST) + "px");
    bar.innerText = result[i];

    this._CONTAINER.appendChild(bar);   
  }  

  this._VISUALIZATION.appendChild(this._CONTAINER);
}

View.prototype.showSwap = function (index) {
  const greater = this._CONTAINER.childNodes[index + 1];
  const smaller = this._CONTAINER.childNodes[index + 2];

  const smallerValue = parseInt(smaller.innerText);
  const greaterValue = parseInt(greater.innerText);

  greater.style.height = ((smallerValue * this._HEIGHT_ADJUST) + "px");
  greater.innerText = smallerValue;
  smaller.style.height = ((greaterValue * this._HEIGHT_ADJUST) + "px");
  smaller.innerText = greaterValue;
}

View.prototype.paintSorted = function (index) {
  const done = this._CONTAINER.childNodes[index + 1];
  done.style.backgroundColor = "gray";
}

export {View};
