export default function Controller(model, view) {
  this.model = model;
  this.view = view;
};

// controller event 등록 in View, this = controller
Controller.prototype.addEvent = function () {
  this.view.addControllerEvent('.run-button', 'click', this.runAnimation.bind(this)); // selector, handle function
}


// controller event handler function
// run 버튼을 누르면, 데이터 가져오고 읽고 수정하고 애니메이션 그림
Controller.prototype.runAnimation = function () { // this = controller (bind)
  const inputData = this.getDatafromView('.input-data', 'value'); //view에서 입력 데이터 가져오기
  const manipulatedData = this.manipulateDataFromView(inputData); //view에서 받은 데이터 검증 및 가공
  this.sendDataToModel(manipulatedData);  
  console.log(this.model.storage)                        // 가공한 입력데이터를 Model Storage에 넣음
  this.initializeView(this.model.storage);
  this.updateView();
}

//Model 관련 메소드
//view를 통해 받은 데이터를 가공 검증
Controller.prototype.manipulateDataFromView = function (data) {
  const validRe = /\[[\d\s]+\]/g;

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
Controller.prototype.updateView = async function () {
  this.sort()
}

//<----3S------>view <---- view3s ---->
//                   <---- CSS 3s----->

Controller.prototype.sort = async function () {
  const data = this.model.storage;
  let j = 0;
  
  while (j < data.length) {
    for (let i = 0; i < data.length; i++) {
      if(data[i] > data[i + 1]) {
        const temp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = temp;
      }
      let delayTime = i === 0 ? 2000 : 2000;
      const delay = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data);
        }, delayTime);
      });
      
      delay.then(this.view.render);
      await delay;
    }
    j++
  }  
}

// {
// console.log(i)
//   if(data[i] > data[i + 1]) {
//     const temp = data[i];
//     data[i] = data[i + 1];
//     data[i + 1] = temp;
//   }
//   let delayTime = i === 0 ? 10000 : 10000;
//   const delay = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('sort')
//       console.log(data)
//       resolve(data);
//     }, delayTime);
//   });
  
//   await delay; // await까지 기다림

//   delay.then(this.view.render); //비동기 코드므로, 아래 동기 코드들이 먼저 실행됨

// }

// {
// console.log(i)
//   if(data[i] > data[i + 1]) {
//     const temp = data[i];
//     data[i] = data[i + 1];
//     data[i + 1] = temp;
//   }
//   let delayTime = i === 0 ? 10000 : 10000;
//   const delay = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('sort')
//       console.log(data)
//       resolve(data);
//     }, delayTime);
//   });
  
//   await delay;

//   delay.then(this.view.render);

// }