
// 데이터의 모양, 제약, 저장
let storage = {};

// observing them about their current state
function model() {
  this.getData = function (data) {
    storage['bubble'] = data.split(',').map(elem => parseInt(elem, 10));
    validateNumbers();
    return storage['bubble'];
  };

  return this;
}

// validation

function validateNumbers() {
  console.log(storage['bubble']);

}

const dataModel = new model();

export default dataModel;