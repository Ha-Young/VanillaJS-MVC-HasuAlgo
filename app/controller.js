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
    this.view.hideForm();

    try {
      this.model.setData(input.value);
    } catch (err) {
      alert(err);
      this.view.showForm();
    }

    this.model.handleSort(dropList.value, 
      (result) => {
        this.view.showInitial(result);
      },
      (index) => {
        this.view.showSwap(index);
      },
      (index) => {
        this.view.paintSorted(index);
      }
    );
  });
}

export {Controller};
