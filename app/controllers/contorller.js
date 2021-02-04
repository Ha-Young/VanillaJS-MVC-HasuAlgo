export const Controller = function(model, view, bubbleController) {
  this.$userInput = document.querySelector('.user-input');
  this.$start = document.querySelector('.start');
  this.$random = document.querySelector('.random');
  this.$delete = document.querySelector('.delete');
  this.$clear = document.querySelector('.clear');

  this.model = model;
  this.view = view;
  this.sort = bubbleController.sort.bind(this);
}

Controller.prototype.create = function(e) {
  const value = this.$userInput.value;

  if (e.key === 'Enter' && value !== '') {
    if (this.model.size() > 9) {
      alert("10개 이상의 수는 비교 할 수 없습니다..")
      this.$userInput.value = '';

      return;
    }

    if (!this.filterType(value)) {
      alert('숫자만 입력 가능합니다!');
      this.$userInput.value = '';

      return;
    }

    const refineValue = Number(value);

    this.model.create(refineValue);
    this.view.create(refineValue, this.model.size());
    this.$userInput.value = '';
  }
};

Controller.prototype.filterType = function(input) {
  let filtering = [...input];
  let isNumber = true;
  
  filtering.forEach(n => {
    if (isNaN(parseInt(n))) {
      isNumber = false;
    }
  });
  
  return isNumber;
};

Controller.prototype.delete = function() {
  if (!this.model.size()) {
    this.$userInput.value = '';
    
    return;
  }

  this.model.delete();
  this.view.delete();
};

Controller.prototype.clear = function() {
  this.view.clear(this.model.size());
  this.model.clear();
  this.$userInput.value = '';
};

Controller.prototype.start = function() {
  if (this.model.size() < 5) {
    alert("정렬할 수를 5개 이상 만들어주세요! (10개는 넘으면 안돼요;;)");
    
    return;
  }
  
  this.model.save();
  this.sort();
};

Controller.prototype.random = function() {
  this.clear();

  function makeRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const randomRange = makeRandomNumber(5, 11);

  for (let i = 0; i < randomRange; i++) {
    const randomNumber = makeRandomNumber(1, 16);

    this.model.create(randomNumber);
    this.view.create(randomNumber, this.model.size());
  }
};

Controller.prototype.events = function() {
  this.$userInput.addEventListener('keyup', this.create.bind(this));
  this.$random.addEventListener('click', this.random.bind(this));
  this.$delete.addEventListener('click', this.delete.bind(this));
  this.$start.addEventListener('click', this.start.bind(this));
  this.$clear.addEventListener('click', this.clear.bind(this));
};
