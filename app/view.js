
function View (template) {

}

View.prototype.render = function () {
    const content = document.querySelector(".content");
    
}

View.prototype.showResult = function (result) {
  const div = document.querySelector(".visualization");
  console.log(result);
  let resultString = "";
  for (let i = 0; i < result.length; i++) {
      resultString += result[i] + "  ";
  }    
  div.innerHTML = resultString;
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
