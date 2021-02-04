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

    try {
      this.model.setData(input.value);
    } catch (err) {
      alert(err);
      this.view.showForm();
    }

    this.model.handleSort(dropList.value, 
      () => {
        this.view.initializeContainer();
      },
      (result) => {
        this.view.showInitial(result);
      },
      (index1, index2) => {
        this.view.showSwap(index1, index2);
      },
      (type, ...index) => {
        this.view.paintBar(type, ...index);
      },
      (index1, index2) => {
        this.view.pointBars(index1, index2);
      }
    );
  });
}

export {Controller};
