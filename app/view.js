
function View () {
  this.$typed = document.querySelector(".typed");
  this.$contentContainer = document.querySelector(".contentContainer");
  this.$bubbleSortButton = document.querySelector(".bubbleSortButton");
  this.$errorMessage = document.querySelector(".errorMessage");
}

export const view = new View();