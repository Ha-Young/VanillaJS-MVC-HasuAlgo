function View() {
  this.$sortForm = document.querySelector(".sorting__form");
  this.$sortInput = document.querySelector(".sorting__input");
  this.$sortNumbers = document.querySelector(".sorting__numbers");
  this.$sortButton = document.querySelector(".sortButton");

  this.$sortDisplay = document.querySelector(".display-container");

  this.$sortLists = document.createElement("ul");
  this.$sortLists.classList.add("sorting__lists");
}

View.prototype.printNumbers = function (sortList) {
  this.$sortNumbers.textContent = sortList.join(", ");
  this.$sortInput.value = "";
};

View.prototype.createNumbers = function (number) {
  const $number = document.createElement("li");

  $number.textContent = number;
  $number.classList.add("sorting__item");
  $number.style.height = `${number}px`;

  return $number;
}

View.prototype.printDisplay = function (sortList) {
  for (let i = 0; i < sortList.length; i++) {
    this.$sortLists.appendChild(this.createNumbers(sortList[i]));
  }

  this.$sortDisplay.appendChild(this.$sortLists);
};

export const newView = new View();
