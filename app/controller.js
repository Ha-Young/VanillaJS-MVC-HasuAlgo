export default function Controller(model, view) {
  this.model = model;
  this.view = view;
};

Controller.prototype.addEvent = function () {
  this.view.addControllerEvent('.play-button', 'click', this.runAnimation.bind(this));
}

Controller.prototype.runAnimation = function () {
  const inputData = this.getDatafromView('.input-data-box', 'value');
  const sortOption = {
    bubble: this.getDatafromView('[value="bubble-sort"]', 'checked'),
    quick: this.getDatafromView('[value="quick-sort"]', 'checked'),
  };
  const processdData = this.processDataFromView(inputData);
  this.sendDataToModel(processdData, sortOption);
  this.initializeView(this.model.storage);
  this.updateView(this.model.storage);
}

Controller.prototype.processDataFromView = function (data) {
  return data.match(/[\d]+/g).map(item => parseInt(item, 10));
}

Controller.prototype.sendDataToModel = function (...data) {
  this.model.loadDataFromController(...data);
}

Controller.prototype.getDatafromView = function (target, property) {
  return this.view.sendDataToController(target, property);
}

Controller.prototype.initializeView = function (data) {
  this.view.initialRender(data.sortData);
}

Controller.prototype.updateView = async function (data) {
  this.sort(data);
}

Controller.prototype.sort = function (data) {
  if (!data.sortOption.bubble && !data.sortOption.quick) {
    alert('Sorting 종류를 체크하세요!');
  }

  if (data.sortOption.bubble) {
    this.bubbleSort(data.sortData);
  }

  if (data.sortOption.quick) {
    this.quickSort(data.sortData, 0, data.sortData.length - 1);
  }
}

Controller.prototype.bubbleSort = async function (data) {
  const delayTime = 500;

  for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < data.length; i++) {
      if(data[i] > data[i + 1]) {
        const temp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = temp;
      }

      const wait = this.delayAndRender({
        sortData: data,
        leftElement: i,
        rightElement: i + 1,
      }, delayTime);

      wait.then(this.view.render);
      await wait;
    }
  }
}

Controller.prototype.quickSort = async function (data, left, right) {
  const index = await this.partition(data, left, right);

  if (index - 1 > left) {
    this.quickSort(data, left, index - 1);
  }

  if (index < right) {
    this.quickSort(data, index, right);
  }

  return data;
}

Controller.prototype.partition = async function (data, left, right) {
  const delayTime = 500;
  let pivotIndex;
  let pivot;
  let _left = left;
  let _right = right;

  pivotIndex = Math.floor((_left + _right) / 2);
  pivot = data[pivotIndex];

  while (_left <= _right) {
    if (_left + 1 >= _right) {
      _left = left;
      _right = right;
    }

    while (data[_left] < pivot) {
      _left++;
    }

    while (data[_right] > pivot) {
      _right--;
    }

    if (_left <= _right) {
      let temp;
      temp = data[_left];
      data[_left] = data[_right];
      data[_right] = temp;

      const wait = this.delayAndRender({
        sortData: data,
        leftElement: _left,
        rightElement: _right,
        pivotIndex: pivotIndex
      }, delayTime);

      wait.then(this.view.render);
      await wait;

      _left++;
      _right--;
    }
  }

  return _left;
}

Controller.prototype.delayAndRender = function (data, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), time);
  });
}
