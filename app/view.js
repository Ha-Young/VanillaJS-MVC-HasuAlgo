const result = document.querySelector(".content h3");
const content = document.querySelector(".content");


// let template = `<div class="content">
// <input type="text" name="numbers" class="inputNumbers">
// <input type="button" value="send" class="button">
// ​<h3></h3>
// <h1>Visualize Sorting Algorithms</h1>
// <p>README.md를 읽어보고 과제를 시작하세요.</p>
// </div>`;

function viewer() {
  this.render = function(data) {
    content.innerHTML = `<div class="content">
    <input type="text" name="numbers" class="inputNumbers">
    <input type="button" value="send" class="button">
    ​<h3>${data}</h3>
    <h1>Visualize Sorting Algorithms</h1>
    <p>README.md를 읽어보고 과제를 시작하세요.</p>
    </div>`;
  }

  return this;
}


function paintH3(renderedData) {
  result.textContent = renderedData;
}

const view = new viewer();
export {view};
