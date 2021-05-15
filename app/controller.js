// ================================
// START YOUR Controller HERE
// ================================

import model from "./model";
import view from "./view";

// TODO: Try optimizing bubble sort
function bubbleSort(items) {
  const length = items.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (items[j] > items[j + 1]) {
        const tmp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = tmp;
      }
    }
  }
}

// NOTE: You can delete this (and related code)
const today = new Date();
view.showMessage(today);
