function Controller(model, view) {
  this.model = model;
  this.view = view;
}

Controller.prototype.getData = function () {
  const form = document.querySelector("form");
  const input = form.querySelector("input");
  const dropList = form.querySelector(".sortType");

  input.addEventListener("keyup", (event) => {
    console.log(event.key);
    this.model.validateCode(event.key,
      () => {
        this.view.addComma();
      },
      (result) => {
        this.view.removeInvalidCharacter(result);
      });
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    this.model.setData(input.value);

    this.model.handleSort(dropList.value, 
      (result) => {
        this.view.showInitial(result);
      },
      (index) => {
        this.view.showSwap(index);
      },
      (index) => {
        this.view.paintSorted(index);
      });
  });
}

export {Controller};
