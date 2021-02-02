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
  const inputData = this.getDatafromView('.input-data', 'value'); //입력 데이터 가져오기
  this.sendDataToModel(inputData); //입력이 올바른 형식인지 체크 -> 맞으면 숫자로 바뀐 데이터를 Model Storage에 넣음

  console.log('sort 시작')
  const sortedData = this.model.sort();
  console.log('sort 종료')
  //기다렸다가 render;
  this.view.render(sortedData)
}

// //controller를 이용해, view에서 데이터를 넣자...
// Controller.prototype.getDatafromView = function (target, property) { // this = controller
//   return this.view.sendDataToController(target, property);
// }

//controller를 이용해, view에서 데이터를 넣자...
Controller.prototype.getDatafromView = function (target, property) { // this = controller
  return this.view.sendDataToController(target, property);
}

//controller를 이용해, model에 데이터를 넣자...
Controller.prototype.sendDataToModel = function (data) {
  this.model.loadDataFromController(data);
}

//controller를 이용해, model에서 data를 sort시키자..
Controller.prototype.sortData = function (data) {
  this.model.sort(data);
}

//controller를 이용해, view를 렌더링하자..
Controller.prototype.updateView = function (data) {
  this.view.render(data);
}