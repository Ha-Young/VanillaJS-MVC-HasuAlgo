import { BubbleModel } from '../models/model';
import { BubbleView } from '../views/view';

export const BubbleController = function() {
  this.$userInput = document.querySelector('.user-value');
  this.$start = document.querySelector('.start');
  this.$delete = document.querySelector('.delete');
  this.$reset = document.querySelector('.reset');
  this.bubbleView = new BubbleView();
  this.test = [];
}

BubbleController.prototype.addItem = function(e) {
  let value = this.$userInput.value;

  if (e.key === 'Enter' && value !== '') {
    if (this.test.length > 9) {
      alert("10개 이상의 수는 비교 할 수 없습니다..")

      this.$userInput.value = '';

      return;
    }

    if (!this.filterType(value)) {
      alert('숫자만 입력 가능합니다!');
      this.$userInput.value = '';

      return;
    }

    this.test.push(value);

    this.$userInput.value = '';
    
    this.bubbleView.addItem(value);
  }
}

BubbleController.prototype.filterType = function(input) {
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
  if (!this.test.length) {
    this.$userInput.value = '';
    return;
  }
  
  this.test.pop();
  this.bubbleView.deleteItem();
}

BubbleController.prototype.resetItem = function() {
  const leng = this.test.length;
  
  for (let i = 0; i < leng; i++) {
    this.test.pop();
  }

  this.$userInput.value = '';
  this.bubbleView.resetItem(leng);
}

BubbleController.prototype.startSort = function() {
  if (!this.test.length) {
    this.$userInput.value = '';

    return;
  }

  if (this.test.length < 5) {
    alert("정렬할 수를 5개 이상 만들어주세요! (10개는 넘으면 안돼요;;)");

    return;
  }

  const refineValue = this.test.map(n => {
    return Number(n);
  });
  
  const bubbleModel = new BubbleModel(refineValue);
  bubbleModel.execute();
}

BubbleController.prototype.startSwap = async function(a, b) {
  await this.bubbleView.swap(a, b);
}

BubbleController.prototype.paintBox = function(a, b, n) {
  this.bubbleView.paint(a, b, n);
}

BubbleController.prototype.init = function() {
  this.$userInput.addEventListener('keyup', this.addItem.bind(this));
  this.$delete.addEventListener('click', this.deleteItem.bind(this));
  this.$start.addEventListener('click', this.startSort.bind(this));
  this.$reset.addEventListener('click', this.resetItem.bind(this));
}
