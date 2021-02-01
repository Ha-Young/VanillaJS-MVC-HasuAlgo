// export const sortingForm = document.querySelector(".sorting__form");
// export const sortingIimput = document.querySelector(".sorting__input");
// export const numberList = document.querySelector(".sorting__nuber");

function View() {
  this.sortForm = document.querySelector(".sorting__form");
  this.sortInput = document.querySelector(".sorting__input");
  this.sortNumbers = document.querySelector(".sorting__number");
  this.sortButton = document.querySelector(".sortButton");
  this.sortDisplay = document.querySelector(".display-container");
}

View.prototype.submitNumber = function (sortList) {
  this.sortNumbers.textContent = sortList;
  this.sortInput.value = "";
}

export const newView = new View();
