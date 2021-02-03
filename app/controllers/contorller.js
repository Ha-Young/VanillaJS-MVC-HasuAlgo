export const Controller = function(model, view) {
  this.$userInput = document.querySelector('.user-input');
  this.$start = document.querySelector('.start');
  this.$delete = document.querySelector('.delete');
  this.$clear = document.quertSelector('.clear');
  this.$reset = document.querySelector('.reset');

  this.model = model;
  this.view = view;
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
  this.model.clear();
  this.view.clear(this.model.size());
  this.$userInput.value = '';
};

Controller.prototype.start = function() {
  if (this.model.size() < 5) {
    alert("정렬할 수를 5개 이상 만들어주세요! (10개는 넘으면 안돼요;;)");
    
    return;
  }
  
  this.sort();
};

Controller.prototype.restart = function() {
  this.model.set(this.model.getSave());
  this.view.set(this.model.size(), this.model.get()); // view에 this.model.get()으로 받은 배열대로 div생성하는 set메서드 추가

  this.sort();
};
// start를 하면 new로 생성한 controller에 prototype으로 bubbleSort 메서드를 아래와 같이 추가해주면 실행 가능한가?
Controller.prototype.sort = async function() {
  this.model.save();

  const sorting = this.model.get();
  const delay = new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 500)
  );

  for (let i = 0; i < this.model.size() -1; i++) {
    for (let j = 0; j < this.model.size() -i -1; j++) {
      if (sorting[j] > sorting[j + 1]) {
        let temp = sorting[j];
        sorting[j] = sorting[j + 1];
        sorting[j + 1] = temp;

        await delay;
        await this.view.swap(j, j + 1);

        return;
      }

      await delay;
    }

    await delay;
  }
};

Controller.prototype.events = function() {
  this.$userInput.addEventListener('keyup', this.create.bind(this));
  this.$delete.addEventListener('click', this.delete.bind(this));
  this.$start.addEventListener('click', this.start.bind(this));
  this.$reset.addEventListener('click', this.reset.bind(this));
  this.$clear.addEventListener('click', this.clear.bind(this));
};
