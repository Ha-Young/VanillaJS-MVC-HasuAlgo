import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

const $userInput = document.querySelector('.user-value');
const $start = document.querySelector('.start');
const $delete = document.querySelector('.delete');
const $reset = document.querySelector('.reset');
const bubbleView = new BubbleView();
const test = [];
const isFull = false;

export const BubbleController = function() {
  //this.$userInput = document.querySelector('.user-value');
}


BubbleController.prototype.addItem = function(e) {
  let value = $userInput.value;
  //console.log(this.$userInput, $userInput);
  if (e.key === 'Enter' && value !== '') {
    if (test.length > 9) {
      alert("10개 이상의 수는 비교 할 수 없습니다..")
      $userInput.value = '';

      return;
    }

    if (!filterType(value)) {
      alert('숫자만 입력 가능합니다!');
      $userInput.value = '';

      return;
    }

    test.push(value);
    $userInput.value = '';
    
    bubbleView.addItem(value);
  }
}

function filterType(input) {
  let filtering = [...input];
  let isNumber = true;
  
  filtering.forEach(n => {
    if (isNaN(parseInt(n))) {
      isNumber = false;
    }
  });
  
  return isNumber;
}

BubbleController.prototype.deleteItem = function() {
  if (!test.length) {
    $userInput.value = '';
    return;
  }
  
  test.pop();
  bubbleView.deleteItem();
}

BubbleController.prototype.resetItem = function() {
  const leng = test.length;
  
  for (let i = 0; i < leng; i++) {
    test.pop();
  }

  $userInput.value = '';
  bubbleView.resetItem(leng);
}

BubbleController.prototype.startSort = function() {
  if (!test.length) {
    $userInput.value = '';

    return;
  }

  if (test.length < 5) {
    alert("정렬할 수를 5개 이상 만들어주세요! (10개 넘으면 안되유..)");

    return;
  }

  const refineValue = test.map(n => {
    return Number(n);
  });
  
  const bubbleModel = new BubbleModel(refineValue);
  bubbleModel.execute();
}

BubbleController.prototype.startSwap = async function(a, b) {
  await bubbleView.swap(a, b);
}

BubbleController.prototype.paintBox = function(a, b, n) {
  bubbleView.paint(a, b, n);
}

BubbleController.prototype.init = function() {
  $userInput.addEventListener('keyup', this.addItem);
  $delete.addEventListener('click', this.deleteItem);
  $start.addEventListener('click', this.startSort);
  $reset.addEventListener('click', this.resetItem);
}
