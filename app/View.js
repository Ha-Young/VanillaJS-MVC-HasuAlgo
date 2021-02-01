function View() {
  this.sortForm = document.querySelector(".sorting__form");
  this.sortInput = document.querySelector(".sorting__input");
  this.sortNumbers = document.querySelector(".sorting__numbers");
  this.sortButton = document.querySelector(".sortButton");

  this.sortDisplay = document.querySelector(".display-container");

  this.sortLists = document.createElement("ul");
  this.sortLists.classList.add("sorting__lists");
}

View.prototype.printNumbers = function (sortList) {
  this.sortNumbers.textContent = sortList.join(", ");
  this.sortInput.value = "";
};

View.prototype.createNumbers = function (number) {
  const Number = document.createElement("li");

  Number.textContent = number;
  Number.classList.add("sorting__item");
  Number.style.height = `${number}px`;

  return Number;
}

View.prototype.printDisplay = function (sortList) {
  for (let i = 0; i < sortList.length; i++) {
    this.sortLists.appendChild(this.createNumbers(sortList[i]));
  }

  this.sortDisplay.appendChild(this.sortLists);
};

export const newView = new View();
