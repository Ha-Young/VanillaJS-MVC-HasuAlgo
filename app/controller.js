import Model from './model.js';
import View from './view.js';

export default function Controller() {
  this.Model = new Model();
  this.View = new View();
}

Controller.prototype.clear = function () {
  const $inputCountainer = document.querySelector(".input-container");
  const $excuteButton = document.querySelector(".excute-button");
  const inputClone = $inputCountainer.cloneNode(true);
  const buttonClone = $excuteButton.cloneNode(true);

  $inputCountainer.parentNode.replaceChild(inputClone, $inputCountainer);
  $excuteButton.parentNode.replaceChild(buttonClone, $excuteButton);
};

Controller.prototype.checkInput = function (inputValue) {
  const trimed = inputValue.replace(/(\s*)/g, "");
  const splited = trimed.split(",");
  const hasFiveToTenLength = (5 <= splited.length && splited.length <= 10);
  const hasNumberOnly = !trimed.match(/[^0-9,]/g);
  const hasEmpty = splited.some((item) => item === "");
  const result = splited.map((item) => Number(item));

  return (hasEmpty || !hasNumberOnly || !hasFiveToTenLength)
    ? {isNumber: false, dataSet: null}
    : {isNumber: true, dataSet: result};
};

Controller.prototype.wait = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
};
