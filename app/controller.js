function Controller(model, view) {
  this.model = model;
  this.view = view;
}

Controller.prototype.getData = function () {
  const form = document.querySelector("form");
  const input = form.querySelector("input");
  const dropList = form.querySelector(".sortType");

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
      },
      () => {
        this.view.showForm();
      },
      () => {
        this.view.hideForm();
      }
      );
  });
}

export {Controller};
