// import {Model} from '../app/model';
// import {View} from '../app/view';

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

    this.model.handleSort(dropList.value, (result, index) => {
        this.view.showResult(result, index);
    });
  });
}

export {Controller};
