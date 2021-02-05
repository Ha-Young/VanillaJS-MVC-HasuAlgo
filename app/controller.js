export default function Controller(model, view) {
  this.model = model;
  this.view = view;
};

Controller.prototype.addEvent = function () {
  this.view.addControllerEvent('.play-button', 'click', this.runAnimation.bind(this));
}

Controller.prototype.runAnimation = function () {
  const inputData = this.getDatafromView('.input-data-box', 'value');
  const radioButtonData = {
    bubble: this.getDatafromView('[value="bubble-sort"]', 'checked'),
    quick: this.getDatafromView('[value="quick-sort"]', 'checked'),
  };
  const manipulatedData = this.manipulateDataFromView(inputData);
  this.sendDataToModel(manipulatedData, radioButtonData);
  this.initializeView(this.model.storage);
  this.updateView(this.model.storage);
}

Controller.prototype.manipulateDataFromView = function (data) {
  const validRe = /[\d\s]+/g;

  if (!validRe.test(data)) {
    alert('숫자 숫자 숫자 형식으로 입력해주세요!');
  }

  const spliltedData = data.match(/[\d]+/g);
  const manipulatedData = spliltedData.map(item => parseInt(item, 10));

  return manipulatedData;
}

Controller.prototype.sendDataToModel = function (...data) {
  this.model.loadDataFromController(...data);
}

Controller.prototype.getDatafromView = function (target, property) {
  return this.view.sendDataToController(target, property);
}

Controller.prototype.initializeView = function (data) {
  this.view.initialRender(data);
}

Controller.prototype.updateView = async function (data) {
  this.sort(data)
}

Controller.prototype.sort = function (data) {
  if (!data.radioButtonData.bubble && !data.radioButtonData.quick) {
    alert('Sorting 종류를 체크하세요!');
  }

  if (data.radioButtonData.bubble) {
    this.bubbleSort(data.manipulatedData);
  }

  if (data.radioButtonData.quick) {
    this.quickSort(data.manipulatedData, 0, data.manipulatedData.length - 1);
  }
}

Controller.prototype.bubbleSort = async function (data) {
  const manipulatedData = data.data;
  const delayTime = 1000;
  let sortCount = 0;
  let j = 0;

  while (j < data.length) {
    for (let i = 0; i < data.length; i++) {
      sortCount++;

      if(data[i] > data[i + 1]) {
        const temp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = temp;
      }

      const leftElement = i;
      const rightElement = i + 1;
      const sortData = {data, leftElement, rightElement, sortCount};
      const delay = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(sortData)
          resolve(sortData);
        }, delayTime);
      });

      delay.then(this.view.render);
      await delay;
    }

    j++;
  }
}

Controller.prototype.quickSort = async function (data, left, right) {
  const index = await this.partition(data, left, right);

  if (index - 1 > left) {
    this.quickSort(data, left, index - 1);
  }

  const delay = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  await delay

  if (index < right) {
    this.quickSort(data, index, right);
  }

  return data;
}


Controller.prototype.partition = async function (data, left, right) {
  let _left = left;
  let _right = right;
  const pivotIndex = Math.floor((_left + _right) / 2);
  const pivot = data[Math.floor((_left + _right) / 2)];
  console.log('pivot:' + pivot)
  let sortCount = 0;

  while (_left <= _right) {
    let temp;

    if (_left + 1 >= _right) {
      _left = left;
      _right = right;
    }

    while (data[_left] < pivot) {
      _left++;
    }
    console.log('_left:' + _left)
    while (data[_right] > pivot) {
      _right--;
    }

    if (_left <= _right) {
      temp = data[_left];
      data[_left] = data[_right];
      data[_right] = temp;


      const delayTime = 1000;
      sortCount++;
      const leftElement = _left;
      const rightElement = _right;
      const sortData = {data, leftElement, rightElement, sortCount, pivotIndex};
      console.log(leftElement, rightElement)
      const delay = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(sortData);
        }, delayTime);
      });

      delay.then(this.view.render);
      await delay;
      _left++;
      _right--;
    }
  }

  return _left;
}