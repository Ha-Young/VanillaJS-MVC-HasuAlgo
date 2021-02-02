
function View (template) {
  this._COLOR = "#2BAE66";
  this._HEIGHT_ADJUST = 25;
}

View.prototype.showResult = function (result, index) {
  const visualization = document.querySelector(".visualization");
  const container = document.createElement("div");

  container.classList.add("container");
  visualization.innerHTML = " ";

  for (let i = 0; i < result.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("divBar");
    bar.style.height = ((result[i] * this._HEIGHT_ADJUST) + "px");
    bar.innerText = result[i];

    if (i === index || i === index + 1) {
      bar.style.backgroundColor = this._COLOR;
    }

    container.appendChild(bar);   
  }  

  visualization.appendChild(container);
  debugger;
}

export {View};
