
function View (template) {

}

View.prototype.render = function () {
  const content = document.querySelector(".content");

}

View.prototype.showResult = function (result, index) {
  const frame = document.querySelector(".visualization");
  const container = document.createElement("div");
  container.classList.add("container");
  frame.innerHTML = " ";

  for (let i = 0; i < result.length; i++) {
    const bar = document.createElement("div");

    bar.classList.add("divBar");
    bar.style.height = ((result[i] * 20) + "px");
    bar.innerText = result[i];

    if (i === index || i === index + 1) {
      bar.style.backgroundColor = "#2BAE66";
    }
    container.appendChild(bar);   
  }  

  frame.appendChild(container);
}

export {View};


// content.innerHTML = '<h1>Visualize Sorting Algorithms</h1>'
//     +  '<div class="visualization"></div>'
//     +  '<input type="text">'
//     +  '<label for="sortingtype"></label>'
//     +  '<select name="sortingtype">'
//       +  '<option value="bubbleSort">Bubble Sort</option>'
//       +   '<option value="selectionSort">Selection Sort</option>'
//       +   '<option value="quickSort">Quick Sort</option>'
//       +  '<option value="mergeSort">Merge Sort</option>'
//     +  '</select>'  
//     +  '<button>시작</button>'
//     +  '<p class="test">TEST</p>';
