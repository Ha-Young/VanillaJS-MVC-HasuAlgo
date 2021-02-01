// Load application styles
import { reject } from 'lodash';
import '../assets/styles/index.less';

const $userInputBtn = document.querySelector('.user-input-btn');
const $userInputTable = document.querySelector('.user-input-table');
const $graphTable = document.querySelector('.article');

class Model {
  constructor() {
    this.userInputData = [];
  }

  set(str) {
    const splitted = str.split(',');
    for (const elem of splitted) {
      this.userInputData.push(Number(elem));
    }
    this.checkInput();
    return this.userInputData;
  }

  checkInput() {
    if (!this.userInputData.every(elem => elem < 100)) {
      throw console.log('number is too high');
    }
    if (this.userInputData.length > 8) {
      throw console.log('too many numbers');
    }
  }

  delete() {
    this.userInputData = [];
  }

  sort(nums) {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] > nums[i + 1]) {
          let temp = nums[i];
          nums[i] = nums[i + 1];
          nums[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return nums;
  }
}

class View {
  render(valueInData) {
    $graphTable.innerHTML = null;
    for (let i = 0; i < valueInData.length; i++) {
      const graphPercent = valueInData[i];
      $graphTable.innerHTML += `<div style="width:10%; height:${graphPercent}%;" class="graph-item"></div>`;
    }
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  addOnclickHandeler() {
    let isClicked = false;
    $userInputBtn.addEventListener(('click'), () => {
      if (!isClicked && $userInputTable.value) {
        const result = this.model.set($userInputTable.value);
        this.view.render(result);
        const sorted = this.model.sort(this.model.userInputData);
        this.view.render(sorted);

        // for 문 돌려서 소트 하고 어웨잇으로 받아서 렌더링?

        isClicked = true;
      }
    });
  }
}

const app = new Controller(new Model(), new View());
app.addOnclickHandeler();

/*

1. 인풋값을 모델에 전해주고
2. 전해준 모델값을 통해서 처음에 렌더링
3. 소팅 시작
4. 소팅할때 스왑될때마다 리렌더링

*/
