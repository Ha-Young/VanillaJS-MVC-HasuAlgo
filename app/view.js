export default function View() {
  this.$selectSortType = document.querySelector(".select-sort-type");
  this.$mainForm = document.querySelector(".main-form")
  this.$mainInput = document.querySelector(".main-input");
  this.$mainInputSubmitButton = document.querySelector(".main-input-submit");
  this.$viewPortBox = document.querySelector(".view-port-box");
  this.$viewPort = document.querySelector(".view-port");
}

View.prototype.activateEvent = function (eventTarget, event, handler) {
  switch (eventTarget) {
    case "mainInput":
      this.$mainInput.addEventListener(event, handler);
      break;
    case "mainForm":
      this.$mainForm.addEventListener(event, handler);
      break;
    default:
      break;
  }
}