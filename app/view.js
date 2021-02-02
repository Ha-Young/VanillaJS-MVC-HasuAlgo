
function View (template) {

}

View.prototype.showResult = function (result, index) {
  const visualization = document.querySelector(".visualization");
  const container = document.createElement("div");

  container.classList.add("container");
  visualization.innerHTML = " ";

  for (let i = 0; i < result.length; i++) {
    const bar = document.createElement("div");

    bar.classList.add("divBar");
    bar.style.height = ((result[i] * 30) + "px");
    bar.innerText = result[i];

    if (i === index || i === index + 1) {
      bar.style.backgroundColor = "#2BAE66";
    }

    container.appendChild(bar);   
  }  

  visualization.appendChild(container);
}

export {View};
