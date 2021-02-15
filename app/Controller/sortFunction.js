import { STATES } from "../common/constant";

export const sortList = {
  BUBBLE: function (sortList) {
    this.model.addTask(STATES.SORT_START);

    for (let i = 0, iMax = sortList.length; i < iMax; i += 1) {
      for (let j = 0, jMax = iMax - 1; j < jMax; j += 1) {
        this.model.addTask(STATES.COMPARE, j, j + 1);

        if (sortList[j] > sortList[j + 1]) {
          this.model.addTask(STATES.CHANGE, j, j + 1);

          const temp = sortList[j];
          sortList[j] = sortList[j + 1];
          sortList[j + 1] = temp;
        }
      }

    }

    this.model.addTask(STATES.SORT_END);
    console.log(this.model._taskQueue);
    console.log(sortList);
  },
  INSERT: function (sortList) {},
  MERGE: function (sortList) {},
  QUICK: function (sortList) {},
};
