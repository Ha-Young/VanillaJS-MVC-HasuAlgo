// Load application styles
import '../assets/styles/index.less';

const $userInputBtn = document.querySelector('.user-input-btn');
const $userInputTable = document.querySelector('.user-input-table');
const $graphTable = document.querySelector('.article');

console.log($userInputBtn);
$userInputBtn.addEventListener('click', ev => {
  console.log($userInputTable.value);
});

class Model {
  constructor() {
    this.userInputData = [];
  }

  set(value) {
    return this.userInputData.push(value);
  }

  get(value) {
    return this.userInputData.indexOf(value);
  }
}

class View {
  createGraph(graphValue) {
    $graphTable.innerHTML = `<div class="graph-item"></div>`;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());

const modelTest = new Model();
console.log(modelTest);
modelTest.set('4');