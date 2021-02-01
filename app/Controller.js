
import {newModel as Model} from './Model';
import {newView as View} from './View.js';

function handleSubmit(event) {
  event.preventDefault();

  Model.getSortList(View.sortInput.value);
  View.submitNumber(Model.giveSortList());
}

function Controller() {
  View.sortForm.addEventListener("submit", handleSubmit);
}

export default Controller;
