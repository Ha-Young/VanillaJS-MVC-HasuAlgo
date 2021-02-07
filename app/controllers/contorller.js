export const Controller = function(model, view, bubbleController) {
  this.$changeBubble = view.$changeBubble;
  this.$changeMerge = view.$changeMerge;
  this.$userInput = view.$userInput;
  this.$start = view.$start;
  this.$random = view.$random;
  this.$delete = view.$delete;
  this.$clear = view.$clear;

  this.model = model;
  this.view = view;
  this.sort = bubbleController.sort.bind(this);
}

Controller.prototype.create = function(e) {
  const value = this.$userInput.value;

  if (e.key === 'Enter' && value !== '') {
    if (this.model.size() >= 10) {
      alert("10개 이상의 수는 비교 할 수 없습니다..")
      this.$userInput.value = '';

      return;
    }

    if (!this.checkType(value)) {
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

Controller.prototype.checkType = function(input) {
  const filtering = [...input];
  console.log(filtering);
  let isNumber = true;
  
  filtering.forEach(n => {
    if (isNaN(parseInt(n))) {
      isNumber = false;
    }
  });
  
  return isNumber;
};

Controller.prototype.delete = function() {
  if (this.model.size() === 0) {
    this.$userInput.value = '';
    
    return;
  }

  this.model.delete();
  this.view.delete(this.model.size());
};

Controller.prototype.clear = function() {
  this.view.clear(this.model.size());
  this.model.clear();
  this.$userInput.value = '';
};

Controller.prototype.start = function() {
  if (5 > this.model.size()) {
    alert("정렬할 수를 5개 이상 만들어주세요! (10개는 넘으면 안돼요;;)");
    
    return;
  }
  
  this.model.save();
  this.sort();
};

Controller.prototype.makeRandom = function() {
  this.clear();

  function makeRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const randomRange = makeRandomNumber(5, 11);

  for (let i = 0; i < randomRange; i++) {
    const randomNumber = makeRandomNumber(1, 21);

    this.model.create(randomNumber);
    this.view.create(randomNumber, this.model.size());
  }
};

Controller.prototype.changeBubble = function() {
    this.view.changeBubble();
    this.clear();
  };

Controller.prototype.changeMerge = function() {
  this.view.changeMerge();
  this.clear();
};
  
Controller.prototype.events = function() {
  this.$changeBubble.addEventListener('click', this.changeBubble.bind(this));
  this.$changeMerge.addEventListener('click', this.changeMerge.bind(this));
  this.$userInput.addEventListener('keyup', this.create.bind(this));
  this.$random.addEventListener('click', this.makeRandom.bind(this));
  this.$delete.addEventListener('click', this.delete.bind(this));
  this.$start.addEventListener('click', this.start.bind(this));
  this.$clear.addEventListener('click', this.clear.bind(this));
};
