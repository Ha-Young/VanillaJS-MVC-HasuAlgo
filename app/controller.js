export default function Controller(model, view) {
  this.model = model;
  this.view = view;
};

// controller event 등록 in View, this = controller
Controller.prototype.addEvent = function () {
  this.view.addControllerEvent('.play-button', 'click', this.runAnimation.bind(this)); // selector, handle function
}


// controller event handler function
// run 버튼을 누르면, 데이터 가져오고 읽고 수정하고 애니메이션 그림
Controller.prototype.runAnimation = function () { // this = controller (bind)
  const inputData = this.getDatafromView('.input-data-box', 'value'); //view에서 입력 데이터 가져오기
  const manipulatedData = this.manipulateDataFromView(inputData); //view에서 받은 데이터 검증 및 가공
  this.sendDataToModel(manipulatedData);  
  console.log(this.model.storage)                        // 가공한 입력데이터를 Model Storage에 넣음
  this.initializeView(this.model.storage);
  this.updateView(this.model.storage);
}

//Model 관련 메소드
//view를 통해 받은 데이터를 가공 검증
Controller.prototype.manipulateDataFromView = function (data) {
  const validRe = /[\d\s]+/g;

  if (!validRe.test(data)) {
    alert('[숫자 숫자 숫자] 형식으로 입력해주세요!');
  }

  const spliltedData = data.match(/[\d]+/g);
  const manipulatedData = spliltedData.map(item => parseInt(item, 10));

  return manipulatedData;
}

//controller를 이용해, 검증된 입력데이터를 model에 데이터를 넣자...
Controller.prototype.sendDataToModel = function (data) {
  this.model.loadDataFromController(data);
}

//View 관련 메소드
//controller를 이용해, view에서 데이터를 넣자...
Controller.prototype.getDatafromView = function (target, property) { // this = controller
  return this.view.sendDataToController(target, property);
}

//controller를 이용해, view를 초기화하자..
Controller.prototype.initializeView = function (data) {
  this.view.initialRender(data);
}

//controller를 이용해, view를 렌더링하자..
Controller.prototype.updateView = async function (data) {
  this.sort(data)
}

Controller.prototype.sort = async function (data) {
  const delayTime = 2000;
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

      const sortData = {data, i, sortCount};
      const delay = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(sortData);
        }, delayTime);
      });

      delay.then(this.view.render);
      await delay;
    }

    j++;
  }
}
