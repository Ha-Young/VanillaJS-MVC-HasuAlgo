import View from "../view.js";

export default function QuickView() {
  this.$graphs = document.querySelector(".graphs");
  this.$messageContainer = document.querySelector(".message-container");
  this.$message = document.querySelector(".message");
  this.$motion = document.querySelector(".motion");
  this.$inputBox = document.querySelector(".input-box");
  this.$excuteButton = document.querySelector(".excute-button");
  this.$menuOptions = document.querySelector(".menu-options");
  this.$bubbleRadio = document.querySelector("#bubble");
  this.$quickRadio = document.querySelector("#quick");
  this.$graphContainer = document.querySelector(".graph-container");
}

QuickView.prototype = Object.create(View.prototype);
QuickView.prototype.constructor = QuickView;

QuickView.prototype.showPivot = function (index) {
  this.$graphs.children[index].classList.add("pivot");
};

QuickView.prototype.swap = function (left, right) {
  const distance = right - left;

  this.$graphs.children[left].style.transform = `translateX(${distance * 30}px) rotate(0.5turn)`;
  this.$graphs.children[right].style.transform = `translateX(-${distance * 30}px) rotate(-0.5turn)`;
};
