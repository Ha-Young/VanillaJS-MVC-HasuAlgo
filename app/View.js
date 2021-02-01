function View() {
  this.sortForm = document.querySelector(".sorting__form");
  this.sortInput = document.querySelector(".sorting__input");
  this.sortNumbers = document.querySelector(".sorting__number");
  this.sortButton = document.querySelector(".sortButton");
  this.sortDisplay = document.querySelector(".display-container");
}

View.prototype.printNumbers = function (sortList) {
  this.sortNumbers.textContent = sortList.join(", ");
  this.sortInput.value = "";
};

View.prototype.createNumbers = function (sortList) {
};

export const newView = new View();
