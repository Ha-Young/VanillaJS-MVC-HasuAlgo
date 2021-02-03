import QuickModel from './quick.model.js';
import QuickView from './quick.view.js';

export default function QuickController() {
  this.QuickModel = new QuickModel();
  this.QuickView = new QuickView();

  const $inputCountainer = document.querySelector(".input-container");
  const $excuteButton = document.querySelector(".excute-button");

  $inputCountainer.addEventListener("submit", handleSubmit.bind(this));
  $excuteButton.addEventListener("click", handleClick.bind(this));

  function handleSubmit(event) {
    event.preventDefault();

  }

  function handleClick() {

  }
}

QuickController.prototype.clear = function () {
  const $inputCountainer = document.querySelector(".input-container");
  const $excuteButton = document.querySelector(".excute-button");
  const inputClone = $inputCountainer.cloneNode(true);
  const buttonClone = $excuteButton.cloneNode(true);

  $inputCountainer.parentNode.replaceChild(inputClone, $inputCountainer);
  $excuteButton.parentNode.replaceChild(buttonClone, $excuteButton);
};
