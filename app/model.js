import { countBy } from "lodash";

export default function Model() {
  this.storage = [];
};

Model.prototype.loadDataFromController = function (data) { // this = model
  this.storage = data;
  console.log(data)
}

// Model.prototype.validateData = function (data) {
//   const validRe = /\[[\d\s]+\]/g;

//   if (!validRe.test(data)) {
//     alert('[숫자 숫자 숫자] 형식으로 입력해주세요!');
//   }

//   return true;
// }

// Model.prototype.manipulate = function (data) {
//   const spliltedData = data.match(/[\d]+/g);
//   const manipulatedData = spliltedData.map(item => parseInt(item, 10));

//   return manipulatedData;
// }

// Model.prototype.sort = async function () {
//   let sortCount = 0;
//   const data = this.storage;
//   if (data[0] > data[1]) {
//     const temp = data[1];
//     data[1] =  data[0];
//     data[0] = temp;
//   }

//   const promise = new Promise((resolve, result) => {
//     setTimeout(() => {
//       resolve(data);
//     }, 3000);
//   });

//   const result = await promise;
//   console.log('promise 종료')
//   console.log(promise)
//   console.log(result);
//   return result;
// }