/*

  Model은 단순히 자료구조이다. 사용자가 입력받은 자료를 받아 저장하는 역할

  sorting하기 편하게 구조를 짜야한다....

*/



export default function () {
  const model = {};
  model.numberArray = [];

  model.getArray = function () {
    return model.numberArray;
  }

  model.setValue = function (value) {
    model.numberArray.push(value);
  }

  
}